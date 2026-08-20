import "dotenv/config";
import express from "express";
import cors from "cors";

import situationRouter from "./routes/situation.js";
import summaryRouter from "./routes/summary.js";
import chatRouter from "./routes/chat.js";
import reportRouter from "./routes/report.js";

const app = express();

const CORS_ORIGIN = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",").map((s) => s.trim());

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

// Simple request log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
});

app.use("/api/situation", situationRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/chat", chatRouter);
app.use("/api/report", reportRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});
// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Server port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`EODSS backend listening on http://localhost:${PORT}`);

  if (!process.env.GEMINI_API_KEY) {
    console.warn(
      "WARNING: GEMINI_API_KEY is not set — /api/summary and /api/chat will fail."
    );
  }
});