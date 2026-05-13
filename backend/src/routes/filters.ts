import { Router, Request, Response } from "express";
import db from "../db";
import type { ApiResponse, FilterData } from "../types";

const router = Router();

/**
 * GET /api/filters
 * Returns all distinct countries and all unique specialties across universities.
 */
router.get("/", (_req: Request, res: Response) => {
  // Fetch distinct countries
  const countriesStmt = db.prepare(
    "SELECT DISTINCT country FROM universities ORDER BY country ASC"
  );
  const countryRows = countriesStmt.all() as unknown as { country: string }[];
  const countries = countryRows.map((r) => r.country);

  // Fetch all specialties JSON arrays and flatten to unique values
  const specialtiesStmt = db.prepare("SELECT specialties FROM universities");
  const specialtyRows = specialtiesStmt.all() as unknown as { specialties: string }[];

  const specialtySet = new Set<string>();
  for (const row of specialtyRows) {
    const parsed: string[] = JSON.parse(row.specialties);
    for (const s of parsed) {
      specialtySet.add(s);
    }
  }
  const specialties = Array.from(specialtySet).sort();

  const filterData: FilterData = { countries, specialties };
  const response: ApiResponse<FilterData> = { data: filterData, error: null, meta: null };
  res.status(200).json(response);
});

export default router;
