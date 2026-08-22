import { TrendingUp, TrendingDown, Minus, ShieldCheck, Clock, FileCheck } from "lucide-react";
import { ACCENT_STYLES, ICON_MAP } from "../data/styles.js";

export default function StatCard({
  icon = "Activity",
  label,
  value,
  unit,
  delta,
  goodDirection,
  accent = "cyan",
  source,
  date,
  status,
}) {
  const a = ACCENT_STYLES[accent] || ACCENT_STYLES.cyan;
  const Icon = ICON_MAP[icon] || ICON_MAP.Activity;

  const isNumericDelta = typeof delta === "number";
  const isGood = isNumericDelta && ((delta >= 0 && goodDirection === "up") || (delta <= 0 && goodDirection === "down"));
  const deltaColor = !isNumericDelta
    ? "text-cyan-300"
    : delta === 0
    ? "text-[#7C8AA3]"
    : isGood
    ? "text-emerald-400"
    : "text-rose-400";
  const DeltaIcon = !isNumericDelta ? FileCheck : delta === 0 ? Minus : delta > 0 ? TrendingUp : TrendingDown;

  const statusBg =
    status === "Confirmed"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : status === "Assessment Ongoing"
      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
      : status === "Preliminary Estimate"
      ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
      : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";

  return (
    <div className="relative bg-[#0F172A]/85 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-200 shadow-xl flex flex-col justify-between group">
      <div className={`absolute top-0 left-0 right-0 h-1 ${a.bar}`} />
      
      <div className="p-4 space-y-3">
        {/* Top Icon & Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className={`w-9 h-9 rounded-xl ${a.chip} border border-white/10 flex items-center justify-center shrink-0 shadow-inner`}>
            <Icon className="w-4 h-4" />
          </div>

          {status && (
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border shrink-0 ${statusBg}`}>
              {status}
            </span>
          )}
        </div>

        {/* Value & Label */}
        <div>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
            {unit && <span className="text-xs text-[#8B96AC] font-mono">{unit}</span>}
          </div>
          <div className="text-xs font-semibold text-[#D5DBE8] mt-1 leading-snug">{label}</div>
        </div>

        {/* Delta / Indicator */}
        {delta !== undefined && delta !== null && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8B96AC]">
            <span className={`flex items-center gap-1 font-semibold ${deltaColor}`}>
              <DeltaIcon className="w-3 h-3" />
              {isNumericDelta ? Math.abs(delta) : delta}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Source & Date Attribution */}
      {(source || date) && (
        <div className="px-4 py-2 border-t border-white/5 bg-[#090E1A]/80 text-[10px] font-mono text-[#7C8AA3] flex items-center justify-between gap-2">
          <span className="truncate" title={source}>
            Src: {source || "ASDMA"}
          </span>
          {date && (
            <span className="shrink-0 flex items-center gap-1 text-[#8B96AC]">
              <Clock className="w-2.5 h-2.5" /> {date}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
