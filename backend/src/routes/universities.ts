import { Router, Request, Response } from "express";
import db from "../db";
import type { University, ApiResponse, PaginationMeta } from "../types";

const router = Router();

// Row type returned from SQLite (columns use snake_case, JSON stored as TEXT)
interface UniversityRow {
  id: string;
  name: string;
  country: string;
  city: string;
  global_rank: number;
  logo_url: string | null;
  website: string;
  description: string;
  specialties: string;
  requirements: string;
  stats: string;
}

function rowToUniversity(row: UniversityRow): University {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    city: row.city,
    globalRank: row.global_rank,
    logoUrl: row.logo_url,
    website: row.website,
    description: row.description,
    specialties: JSON.parse(row.specialties),
    requirements: JSON.parse(row.requirements),
    stats: JSON.parse(row.stats),
  };
}

/**
 * GET /api/universities
 * Query params: country, specialty, search, page, limit
 */
router.get("/", (req: Request, res: Response) => {
  // Sanitize and validate query params
  const country = typeof req.query.country === "string" ? req.query.country.trim() : null;
  const specialty = typeof req.query.specialty === "string" ? req.query.specialty.trim() : null;
  const search = typeof req.query.search === "string" ? req.query.search.trim() : null;

  const rawPage = parseInt(String(req.query.page ?? "1"), 10);
  const rawLimit = parseInt(String(req.query.limit ?? "20"), 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 && rawLimit <= 100 ? rawLimit : 20;
  const offset = (page - 1) * limit;

  // Build dynamic WHERE clauses using parameterized queries only
  const conditions: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any[] = [];

  if (country) {
    conditions.push("country = ?");
    params.push(country);
  }

  if (specialty) {
    // specialties is stored as a JSON array text; use LIKE for substring match
    conditions.push("specialties LIKE ?");
    params.push(`%${specialty}%`);
  }

  if (search) {
    conditions.push("(name LIKE ? OR city LIKE ? OR country LIKE ? OR description LIKE ?)");
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM universities ${where}`);
  const countRow = countStmt.get(...params) as unknown as { total: number };
  const total = countRow.total;

  const dataStmt = db.prepare(
    `SELECT * FROM universities ${where} ORDER BY global_rank ASC LIMIT ? OFFSET ?`
  );
  const rows = dataStmt.all(...params, limit, offset) as unknown as UniversityRow[];

  const universities: University[] = rows.map(rowToUniversity);
  const pages = Math.ceil(total / limit);

  const meta: PaginationMeta = { total, page, limit, pages };
  const response: ApiResponse<University[]> = { data: universities, error: null, meta };
  res.status(200).json(response);
});

/**
 * GET /api/universities/:id
 */
router.get("/:id", (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id.trim() : "";

  if (!id) {
    const response: ApiResponse<null> = { data: null, error: "Not found", meta: null };
    return res.status(404).json(response);
  }

  const stmt = db.prepare("SELECT * FROM universities WHERE id = ?");
  const row = stmt.get(id) as unknown as UniversityRow | undefined;

  if (!row) {
    const response: ApiResponse<null> = { data: null, error: "Not found", meta: null };
    return res.status(404).json(response);
  }

  const university = rowToUniversity(row);
  const response: ApiResponse<University> = { data: university, error: null, meta: null };
  return res.status(200).json(response);
});

export default router;
