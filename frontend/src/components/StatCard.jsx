import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ACCENT_STYLES, ICON_MAP } from "../data/styles.js";

export default function StatCard({ icon, label, value, delta, goodDirection, accent }) {
  const a = ACCENT_STYLES[accent];
  const Icon = ICON_MAP[icon];
  const isGood = (delta >= 0 && goodDirection === "up") || (delta <= 0 && goodDirection === "down");
  const deltaColor = delta === 0 ? "text-[#7C8AA3]" : isGood ? "text-emerald-400" : "text-rose-400";
  const DeltaIcon = delta === 0 ? Minus : delta > 0 ? TrendingUp : TrendingDown;

  return (
    <div className="relative bg-[#0F172A]/70 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5 shadow-lg group">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${a.bar} group-hover:h-1 transition-all`} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl ${a.chip} border border-white/10 flex items-center justify-center shadow-inner`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${deltaColor}`}>
            <DeltaIcon className="w-3 h-3" />
            {Math.abs(delta)}
          </div>
        </div>
        <div className="text-2xl font-bold font-mono tracking-tight text-[#E7ECF5]">{value}</div>
        <div className="text-xs text-[#8B96AC] mt-1.5 font-medium">{label}</div>
      </div>
    </div>
  );
}
