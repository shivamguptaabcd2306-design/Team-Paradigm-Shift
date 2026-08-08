import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ACCENT_STYLES, ICON_MAP } from "../data/styles.js";

export default function StatCard({ icon, label, value, delta, goodDirection, accent }) {
  const a = ACCENT_STYLES[accent];
  const Icon = ICON_MAP[icon];
  const isGood = (delta >= 0 && goodDirection === "up") || (delta <= 0 && goodDirection === "down");
  const deltaColor = delta === 0 ? "text-[#7C8AA3]" : isGood ? "text-emerald-400" : "text-rose-400";
  const DeltaIcon = delta === 0 ? Minus : delta > 0 ? TrendingUp : TrendingDown;

  return (
    <div className="relative bg-[#111826] border border-[#1B2434] rounded-xl overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${a.bar}`} />
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className={`w-8 h-8 rounded-lg ${a.chip} flex items-center justify-center`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className={`flex items-center gap-0.5 text-[11px] font-mono ${deltaColor}`}>
            <DeltaIcon className="w-3 h-3" />
            {Math.abs(delta)}
          </div>
        </div>
        <div className="text-xl font-semibold font-mono leading-none">{value}</div>
        <div className="text-[11.5px] text-[#7C8AA3] mt-1.5">{label}</div>
      </div>
    </div>
  );
}
