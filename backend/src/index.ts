import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables before importing anything that uses them
dotenv.config();

import universitiesRouter from "./routes/universities";
import filtersRouter from "./routes/filters";
import healthRouter from "./routes/health";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
const allowedOrigins: (string | RegExp)[] = [
  "http://localhost:5173",
  /^https:\/\/.*\.netlify\.app$/,
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const allowed = allowedOrigins.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      );

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} not allowed`));
      }
    },
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Body parsing
// ---------------------------------------------------------------------------
app.use(express.json());

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
// Mount individual route modules here.
// To add a future /api/ai endpoint, simply create src/routes/ai.ts
// and add: app.use("/api/ai", aiRouter);
app.use("/api/universities", universitiesRouter);
app.use("/api/filters", filtersRouter);
app.use("/api/health", healthRouter);

// ---------------------------------------------------------------------------
// 404 handler for unknown routes
// ---------------------------------------------------------------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json({ data: null, error: "Route not found", meta: null });
});

// ---------------------------------------------------------------------------
// Global error handler
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Log the full error internally but never expose internals to the client
  console.error("[error]", err.message);
  res.status(500).json({ data: null, error: "Internal server error", meta: null });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[server] University Aggregator API running on http://localhost:${PORT}`);
});

export default app;
