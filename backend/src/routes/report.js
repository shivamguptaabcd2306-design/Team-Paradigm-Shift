import { Router } from "express";
import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";

const router = Router();

const REPORT_SYSTEM_PROMPT = `You are the Chief Reporting Officer at the District Emergency Operations Centre (DEOC), District Disaster Management Authority (DDMA), Golaghat, Assam.

Generate an authoritative, structured Golaghat District Flood 2026 Official Situation & Damage Assessment Report.

Structure the report with these clear sections:

1. DISTRICT EXECUTIVE SUMMARY (Golaghat overall scope: 1.95L affected, 9 confirmed casualties, 215 submerged villages across 5 circles)
2. RIVER & HYDROLOGICAL MONITORING (Dhansiri River @ Numaligarh 77.94m vs 77.42m Danger Level, Dhansiri @ Golaghat Town, Doyang @ Khumtai)
3. REVENUE CIRCLE IMPACT ASSESSMENT (Bokakhat, Golaghat Sadar, Khumtai, Dergaon, Morangi detailed analysis)
4. INFRASTRUCTURE & HOUSING LOSS (NH-715 Kaziranga corridor restriction, SH-1 Dhudar Ali, bridge damages, 5,640 damaged houses, dyke breaches)
5. AGRICULTURE & LIVESTOCK DAMAGE (9,800 ha submerged Sali paddy & tea garden lowlands, 1.15 lakh livestock affected, 24 fodder depots)
6. RELIEF & HEALTH RESPONSE (48 active relief camps, 16,500 inmates, SDRF boat fleets, 34 mobile medical teams, ₹14.8 Cr DBT financial grants)
7. PRIORITY ACTION DIRECTIVES (Bilgaon embankment geobag armoring, camp drinking water chlorination, animal corridor pilot escort)

Rules:
- Strictly use the official verified data provided in the Golaghat context.
- Cite official reporting dates and sources (DDMA Golaghat, ASDMA, CWC, WRD, PWD).
- Clearly label preliminary figures as "preliminary estimate / assessment ongoing".
- Never invent or fabricate casualties, numbers, or locations.
- Keep the language formal, operational, and suitable for District Magistrate and State Disaster Management Commissioners.
- Do not use markdown tables.`;

router.post("/", async (req, res) => {
  try {
    const { reports = [] } = req.body;
    const context = buildContextBlock(reports || []);
    const report = await callGemini(REPORT_SYSTEM_PROMPT, [
      {
        role: "user",
        content: context,
      },
    ]);
    res.json({ report });
  } catch (err) {
    console.error("[/api/report] error:", err.message);
    res.status(502).json({
      error: "AI report generation failed",
    });
  }
});

export default router;