const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

/** Fetches the initial mock situation data (disaster info, locations, stats, resources, reports). */
export function fetchSituation() {
  return request("/situation");
}

/** Asks the backend to generate a fresh AI situation brief for the given reports. */
export function fetchSummary(reports) {
  return request("/summary", {
    method: "POST",
    body: JSON.stringify({ reports }),
  }).then((data) => data.summary);
}

/** Sends a chat turn to the role-specific assistant and returns the reply text. */
export function sendChatMessage(role, messages, reports) {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ role, messages, reports }),
  }).then((data) => data.reply);
}
