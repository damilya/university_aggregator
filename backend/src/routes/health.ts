import { Router, Request, Response } from "express";
import type { ApiResponse } from "../types";

const router = Router();

/**
 * GET /api/health
 */
router.get("/", (_req: Request, res: Response) => {
  const response: ApiResponse<{ status: string }> = {
    data: { status: "ok" },
    error: null,
    meta: null,
  };
  res.status(200).json(response);
});

export default router;
