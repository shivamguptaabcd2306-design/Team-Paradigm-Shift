// Golaghat District Flood Emergency Operations Command Roles
export const ROLES = {
  district_magistrate: {
    label: "District Magistrate & Chairman (DDMA Golaghat)",
    focus: "district-wide emergency command, SDRF/NDRF boat deployments, PWD road restorations, CWC flood gauge alerts, and financial DBT assistance",
    matchesSource: "DDMA Golaghat Control Room",
  },
  subdivisional_officer: {
    label: "Sub-Divisional Officer (Civil) — Bokakhat",
    focus: "revenue circle coordination, Kaziranga NH-715 speed regulation, breached dyke repairs, and circle-level relief camps",
    matchesSource: "SDRF Golaghat Unit 1",
  },
  relief_logistics: {
    label: "District Relief & Health Operations Officer",
    focus: "relief camp supplies, mobile medical doctor units, fodder depots, drinking water sanitation, and PMAY-G reconstruction audits",
    matchesSource: "District Health Society",
  },
};

export function isValidRole(role) {
  return Object.prototype.hasOwnProperty.call(ROLES, role);
}
