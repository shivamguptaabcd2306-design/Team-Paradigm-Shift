import { Router } from "express";
import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";
import { ROLES, isValidRole } from "../data/roles.js";
import { validateChatBody } from "../middleware/validate.js";

const router = Router();

function buildChatSystemPrompt(roleKey, reports = []) {
  const roleInfo = ROLES[roleKey] || {
    label: "District EOC Officer",
    focus: "Golaghat district emergency response, revenue circle operations, hospitals, and emergency contacts",
  };

  const authorityPlanHint =
    roleKey === "district_magistrate" || roleKey === "subdivisional_officer"
      ? `
When the user asks for a tactical action plan, evacuation directive, or emergency-coordination directive for Golaghat district, be concise and include 2 or 3 actionable directives using this EXACT format (one proposal per line):
PROPOSAL: [Short Action Title] | Target: [Circle / Sector / River Dykes] | Priority: [Critical/High/Moderate] | Details: [Specific operational instruction]
Do not include PROPOSAL lines for general knowledge or conversational queries.`
      : "";

  return `You are GOLAGHAT FLOOD INTELLIGENCE, the official AI decision support engine inside the Golaghat District Emergency Operations Centre (DEOC) and District Disaster Management Authority (DDMA), Assam. You are currently interacting in the "${roleInfo.label}" context (focus: ${roleInfo.focus}).

CRITICAL DATA & ZERO-HALLUCINATION RULES:
1. Scope is EXCLUSIVELY Golaghat District, Assam:
   - Only cite Golaghat-specific figures (1.95 lakh people affected across 5 revenue circles: Bokakhat, Golaghat Sadar, Khumtai, Dergaon, Morangi; 9 confirmed deaths; 5,640 damaged houses; 48 active relief camps; 16,500 camp inmates; 9,800 ha submerged crop land; Dhansiri at Numaligarh 77.94m vs 77.42m danger level).
   - NEVER reuse statewide Assam numbers as Golaghat numbers.
   - For every numerical figure or statistic provided: state value, source (e.g., "DDMA Golaghat", "ASDMA Bulletin", "Central Water Commission"), snapshot date, and status.
   - If an exact figure for a sub-locality is unavailable in the official data, explicitly state: "I don't have a verified current figure for that — assessment is ongoing." NEVER invent or hallucinate statistics.
2. Hospitals & Emergency Contacts Rules:
   - When asked about hospitals in Golaghat or nearby facilities, provide the exact verified facility details from context:
     * Swahid Kushal Konwar Civil Hospital (SKKCH Golaghat): Phone 03774-280222, 250 beds (48 available), ICU/Trauma/Blood Bank.
     * Bokakhat Sub-Divisional Civil Hospital (SDCH): Phone 03776-268244, 100 beds (22 available), Maternity & Snakebite anti-venom.
     * Sarupathar CHC: Phone 03774-278233, 40 beds (12 available).
     * Dergaon Model Hospital: Phone 03776-244122, 30 beds (8 available).
     * Khumtai Model Hospital: Phone 03774-295108, 12 beds (4 available).
     * Numaligarh Refinery (NRL) Hospital: Phone 03776-265555, 50 beds (16 available).
   - When asked about Emergency Contacts & Helplines:
     * DEOC / District Control Room: 03774-280120 / Toll-Free 1077
     * State EOC (ASDMA): Toll-Free 1070
     * Police Control Room: 03774-280333 / 112
     * Emergency Ambulance (Mrityunjoy): 108
     * Fire & Emergency: 03774-280101 / 101
     * Bokakhat SDO(C) Control Room: 03776-268225
     * SDRF Golaghat: 03774-280450 / 1077
     * NDRF 1st Bn (Bokakhat): 0361-2840027 / 9435117246
     * Electricity Emergency (APDCL): 1912 / 03774-280245
     * Public Health Drinking Water (PHE): 03774-280188
     * Water Resources (WRD Dhansiri): 03774-280310
   - If a contact number is marked "Contact unavailable", state: "I don't have a verified contact number for that facility." NEVER invent or hallucinate a telephone number.
3. Natural Language Questions:
   - Provide crisp, authoritative, professional incident command answers.
   - You can answer general knowledge, medical, geographic, and conversational queries accurately and naturally.${authorityPlanHint}

OFFICIAL GOLAGHAT DISTRICT OPERATIONAL PICTURE:
${buildContextBlock(reports)}`;
}

// POST /api/chat — body: { role, messages: [{role, content}], reports: [...] }
router.post("/", validateChatBody, async (req, res) => {
  const { role, messages, reports = [] } = req.body;

  if (!isValidRole(role)) {
    return res.status(400).json({ error: `Unknown role '${role}'. Valid roles: ${Object.keys(ROLES).join(", ")}` });
  }

  const hasUserPrompt = messages.some((m) => m.role === "user" && m.content.trim());
  if (!hasUserPrompt) {
    return res.status(400).json({ error: "Body must include at least one non-empty user message." });
  }

  try {
    const sys = buildChatSystemPrompt(role, reports);
    const reply = await callGemini(sys, messages);
    res.json({ reply });
  } catch (err) {
    console.error("[/api/chat] error:", err.message);
    res.status(502).json({ error: "AI service unreachable" });
  }
});

export default router;
