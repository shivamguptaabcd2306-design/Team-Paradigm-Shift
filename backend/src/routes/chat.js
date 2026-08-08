import { Router } from "express";
import { callGemini } from "../services/geminiService.js";
import { buildContextBlock } from "../services/contextBuilder.js";
import { ROLES, isValidRole } from "../data/roles.js";
import { validateChatBody } from "../middleware/validate.js";

const router = Router();

function buildChatSystemPrompt(roleKey, reports) {
  const roleInfo = ROLES[roleKey];

  if (roleKey === "authority") {
    return `You are the AI Emergency Operations Coordinator for the Local Authority in EODSS.

CRITICAL MANDATE:
- DO NOT ask questions or ask the user what to do. Never ask for input or clarification.
- Directly create a complete, actionable Tactical Emergency Response Plan based on the situation telemetry data below.
- State the executive plan clearly, decisively, and concisely (2-3 short bullet points/paragraphs).
- At the end of your plan, ALWAYS output 2 or 3 concrete proposed action directives for immediate operator approval or editing using this EXACT format (one proposal per line):
PROPOSAL: [Short Action Title] | Target: [Location or Unit] | Priority: [Critical/High/Moderate] | Details: [Specific operational directive]

${buildContextBlock(reports)}`;
  }

  // Standard advisory assistant for NGO and Emergency Team roles
  return `You are the AI Emergency Operations Coordinator inside EODSS talking to the ${roleInfo.label}. Focus every answer on what matters to ${roleInfo.label}: ${roleInfo.focus}.

Rules:
- Give concise, practical guidance and answers relevant to ${roleInfo.label}.
- Speak directly to this stakeholder.
- Ground every answer strictly in the situation data below.

${buildContextBlock(reports)}`;
}

// POST /api/chat — body: { role, messages: [{role, content}], reports: [...] }
router.post("/", validateChatBody, async (req, res) => {
  const { role, messages, reports } = req.body;

  if (!isValidRole(role)) {
    return res.status(400).json({ error: `Unknown role '${role}'. Valid roles: ${Object.keys(ROLES).join(", ")}` });
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
