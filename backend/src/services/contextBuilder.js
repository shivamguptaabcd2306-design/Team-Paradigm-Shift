import { disasterInfo, affectedLocations, statCards, resources } from "../data/situation.js";

/**
 * Builds the plain-text situation context block passed to Claude on every
 * call so the assistant stays grounded in the current operational picture.
 * @param {Array<{source:string, location:string, time:string, message:string}>} reports
 */
export function buildContextBlock(reports) {
  return `CURRENT SITUATION DATA
Disaster: ${disasterInfo.type} | Status: ${disasterInfo.status} | Severity: ${disasterInfo.severity}
Region: ${disasterInfo.region} | Reported since: ${disasterInfo.startedAt}

Affected locations: ${affectedLocations.map((l) => `${l.name} (${l.severity}) — ${l.note}`).join("; ")}

Operational stats: ${statCards.map((s) => `${s.label}: ${s.value}`).join(", ")}

Resource availability: ${resources.map((r) => `${r.name} ${r.available}/${r.total} ${r.unit}`).join(", ")}

Incoming reports (chronological, most recent last):
${reports.map((r) => `[${r.source} — ${r.location}, ${r.time}] ${r.message}`).join("\n")}`;
}
