// Three individual operating contexts for the same underlying AI assistant.
// Kept in sync (by key) with frontend/src/data/roles.js, which additionally
// carries UI-only fields (icons, colors, suggestion chips).

export const ROLES = {
  authority: {
    label: "Local Authority",
    focus: "coordination, evacuation orders, and public safety",
    matchesSource: "Local Authority",
  },
  ngo: {
    label: "NGO",
    focus: "relief distribution, shelter, and medical support",
    matchesSource: "NGO Report",
  },
  team: {
    label: "Emergency Team",
    focus: "search & rescue and on-ground response",
    matchesSource: "Emergency Team",
  },
};

export function isValidRole(role) {
  return Object.prototype.hasOwnProperty.call(ROLES, role);
}
