import { Router } from "express";
import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";
import { validateSummaryBody } from "../middleware/validate.js";

const router = Router();

const SUMMARY_SYSTEM_PROMPT = `You are the situation-analysis module of an emergency operations dashboard. Write a single tight operational brief (2-3 sentences max, no headers, no bullet points) covering: what happened, current severity, and the single most urgent gap responders should know about right now. Be factual and plain, not dramatic.`;

// POST /api/summary — body: { reports: [...] }
router.post("/", validateSummaryBody, async (req, res) => {
  try {
    const { reports } = req.body;
    const text = await callGemini(SUMMARY_SYSTEM_PROMPT, [
      { role: "user", content: buildContextBlock(reports) },
    ]);
    res.json({ summary: text });
  } catch (err) {
    console.error("[/api/summary] error:", err.message);
    res.status(502).json({ error: "AI service unreachable" });
  }
});

export default router;
