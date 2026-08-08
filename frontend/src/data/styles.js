export const SEVERITY_STYLES = {
  Critical: { text: "text-rose-400", bg: "bg-rose-500/10", dot: "bg-rose-500", ring: "ring-rose-500/30", border: "border-rose-500" },
  High: { text: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-500", ring: "ring-orange-500/30", border: "border-orange-500" },
  Moderate: { text: "text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-500", ring: "ring-amber-500/30", border: "border-amber-500" },
  Low: { text: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-500", ring: "ring-emerald-500/30", border: "border-emerald-500" },
};

export const ACCENT_STYLES = {
  rose: { bar: "bg-rose-500", chip: "bg-rose-500/10 text-rose-400" },
  orange: { bar: "bg-orange-500", chip: "bg-orange-500/10 text-orange-400" },
  cyan: { bar: "bg-cyan-500", chip: "bg-cyan-500/10 text-cyan-400" },
  violet: { bar: "bg-violet-500", chip: "bg-violet-500/10 text-violet-400" },
};

export const ROLE_ACCENT = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", ring: "ring-cyan-500/30", activeBg: "bg-cyan-500/15", border: "border-cyan-500/40" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/30", activeBg: "bg-emerald-500/15", border: "border-emerald-500/40" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", ring: "ring-orange-500/30", activeBg: "bg-orange-500/15", border: "border-orange-500/40" },
};

// Maps the icon name strings that come back from the backend (see
// backend/src/data/situation.js) to the actual lucide-react components.
import { Activity, AlertTriangle, Users, Truck, Ship, HeartPulse, Droplet, Package, Home } from "lucide-react";

export const ICON_MAP = {
  Activity,
  AlertTriangle,
  Users,
  Truck,
  Ship,
  HeartPulse,
  Droplet,
  Package,
  Home,
};
