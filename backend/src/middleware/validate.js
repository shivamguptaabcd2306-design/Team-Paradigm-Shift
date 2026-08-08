function isReportsArray(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (r) =>
        r &&
        typeof r.source === "string" &&
        typeof r.location === "string" &&
        typeof r.message === "string"
    )
  );
}

export function validateSummaryBody(req, res, next) {
  const { reports } = req.body || {};
  if (!isReportsArray(reports)) {
    return res.status(400).json({ error: "Body must include a 'reports' array of {source, location, time, message}." });
  }
  next();
}

export function validateChatBody(req, res, next) {
  const { role, messages, reports } = req.body || {};
  if (typeof role !== "string") {
    return res.status(400).json({ error: "Body must include a 'role' string." });
  }
  if (!Array.isArray(messages) || messages.some((m) => !m || typeof m.content !== "string" || !["user", "assistant"].includes(m.role))) {
    return res.status(400).json({ error: "Body must include a 'messages' array of {role, content}." });
  }
  if (!isReportsArray(reports)) {
    return res.status(400).json({ error: "Body must include a 'reports' array of {source, location, time, message}." });
  }
  next();
}
