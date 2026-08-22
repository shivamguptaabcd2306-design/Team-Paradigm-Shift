import { Router } from "express";
import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";
import { validateSummaryBody } from "../middleware/validate.js";

const router = Router();

const SUMMARY_SYSTEM_PROMPT = `You are the Situation Analysis Officer at the District Emergency Operations Centre (DEOC), District Disaster Management Authority (DDMA), Golaghat, Assam.
Write a single concise, authoritative operational brief (2-3 sentences max, no headers, no bullet points) synthesizing the current Golaghat Flood 2026 state:
Include the district scale (1.95 lakh people affected across 5 revenue circles: Bokakhat, Golaghat, Khumtai, Dergaon, Morangi), worst-affected sectors (Bokakhat & Golaghat Sadar), Dhansiri river stage at Numaligarh (0.52m above danger level), Kaziranga NH-715 transit restriction, and current camp/relief operations (48 active camps, 16,500 inmates, ₹14.8 Cr DBT disbursed).
Be strictly factual and grounded in the official Golaghat data provided. Never invent or hallucinate figures.`;

// POST /api/summary — body: { reports: [...] }
router.post("/", validateSummaryBody, async (req, res) => {
  try {
    const { reports = [] } = req.body;
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
