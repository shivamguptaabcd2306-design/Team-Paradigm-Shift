import { Router } from "express";

import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";

const router = Router();

const REPORT_SYSTEM_PROMPT = `
You are the disaster-reporting module of an Emergency Operations Decision Support System.

Generate a concise but comprehensive operational disaster report from the supplied situation data.

Use these sections:

1. EXECUTIVE SUMMARY
2. CURRENT SITUATION
3. IMPACT ASSESSMENT
4. RESOURCE STATUS
5. PRIORITY ACTIONS
6. KEY RISKS

Rules:
- Use only information provided in the situation data.
- Do not invent casualties, infrastructure damage, locations or resources.
- Use clear operational language.
- Highlight critical and high-risk locations.
- Mention important telemetry values.
- Keep the report suitable for a district emergency operations centre.
- Do not use markdown tables.
`;

router.post("/", async (req, res) => {

  try {

    const { reports } = req.body;

    const context = buildContextBlock(reports || []);

    const report = await callGemini(
      REPORT_SYSTEM_PROMPT,
      [
        {
          role: "user",
          content: context,
        },
      ]
    );

    res.json({ report });

  } catch (err) {

    console.error("[/api/report] error:", err.message);

    res.status(502).json({
      error: "AI report generation failed",
    });

  }

});

export default router;