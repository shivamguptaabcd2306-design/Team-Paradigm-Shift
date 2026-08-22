import { useState } from "react";
import { BarChart2, TrendingUp, Users, Waves, Home, Coins, Wheat, ShieldAlert } from "lucide-react";
import { GOLAGHAT_CIRCLES_GEO, GOLAGHAT_GAUGES_GEO } from "./disasterData.js";

export default function TelemetryAnalyticsChart() {
  const [activeTab, setActiveTab] = useState("circles"); // circles | rivers | economic

  const maxPop = Math.max(...GOLAGHAT_CIRCLES_GEO.map((c) => c.populationAffected));

  const economicCategories = [
    { category: "Infrastructure (PWD Roads & Bridges)", amountCr: 94.00, pct: 38.8, color: "bg-cyan-500", textColor: "text-cyan-400" },
    { category: "Agriculture & Standing Sali Crops", amountCr: 68.00, pct: 28.0, color: "bg-amber-500", textColor: "text-amber-400" },
    { category: "Housing & Residential Property", amountCr: 38.50, pct: 15.9, color: "bg-rose-500", textColor: "text-rose-400" },
    { category: "Public Utilities & Power Feeders", amountCr: 26.00, pct: 10.7, color: "bg-violet-500", textColor: "text-violet-400" },
    { category: "Livelihood & Livestock Loss", amountCr: 16.00, pct: 6.6, color: "bg-emerald-500", textColor: "text-emerald-400" },
  ];

  return (
    <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-6 animate-fade-in">
      {/* HEADER & TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">DISTRICT ANALYTICS & LOSS AUDIT</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                DDMA / CWC AUDIT
              </span>
            </div>
            <p className="text-xs text-[#8B96AC]">Multi-dimensional breakdown: revenue circle impact, Dhansiri/Doyang river gauges, and economic loss</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#090E1A] border border-white/10 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab("circles")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "circles" ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            Revenue Circles Population
          </button>
          <button
            onClick={() => setActiveTab("rivers")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "rivers" ? "bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            River Gauges vs Danger Mark
          </button>
          <button
            onClick={() => setActiveTab("economic")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "economic" ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            District Economic Loss
          </button>
        </div>
      </div>

      {/* TAB 1: REVENUE CIRCLES POPULATION BAR CHART */}
      {activeTab === "circles" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>REVENUE CIRCLES (POPULATION AFFECTED)</span>
            <span>Source: DDMA Golaghat Daily Control Logs</span>
          </div>

          <div className="space-y-3 pt-1">
            {GOLAGHAT_CIRCLES_GEO.map((c) => {
              const pct = (c.populationAffected / maxPop) * 100;
              const isWorst = c.severity === "Critical";

              return (
                <div key={c.circle} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isWorst ? "bg-rose-500" : "bg-orange-400"}`} />
                      {c.circle} ({c.subdivision})
                      <span className="text-[10.5px] font-mono text-[#7C8AA3]">({c.villagesAffected} villages, {c.deaths} deaths)</span>
                    </span>
                    <span className="font-mono font-bold text-cyan-300">
                      {c.populationAffected.toLocaleString()} citizens ({(c.populationAffected / 1000).toFixed(1)}K)
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[#090E1A] overflow-hidden border border-white/5 flex">
                    <div
                      className={`h-full ${isWorst ? "bg-rose-500" : "bg-cyan-500"} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RIVER LEVEL VS DANGER MARK */}
      {activeTab === "rivers" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>RIVER GAUGES: WATER LEVEL vs DANGER LEVEL (METERS)</span>
            <span>Source: Central Water Commission (CWC) & Assam WRD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {GOLAGHAT_GAUGES_GEO.map((g) => {
              const isAbove = g.level >= g.danger;
              const diff = (g.level - g.danger).toFixed(2);
              const progressPct = Math.min(100, Math.max(0, ((g.level - (g.danger - 1.5)) / 3) * 100));

              return (
                <div key={g.id} className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{g.station}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">{g.river} ({g.circle})</div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isAbove ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                      {isAbove ? `+${diff}m ABOVE` : `${diff}m BELOW`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#8B96AC]">Current: <b className="text-white">{g.level.toFixed(2)} m</b></span>
                    <span className="text-[#8B96AC]">Danger: <b className="text-amber-400">{g.danger.toFixed(2)} m</b></span>
                    <span className="text-[#7C8AA3]">HFL: {g.hfl.toFixed(2)} m</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden border border-white/5">
                    <div className={`h-full ${isAbove ? "bg-rose-500" : "bg-cyan-500"} rounded-full`} style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ECONOMIC LOSS AUDIT */}
      {activeTab === "economic" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>PRELIMINARY ESTIMATE: ₹242.50 CRORE (DISTRICT LOSS AUDIT)</span>
            <span>Source: DDMA Golaghat Assessment Cell</span>
          </div>

          <div className="space-y-3 pt-1">
            {economicCategories.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">{cat.category}</span>
                  <span className={`font-mono font-bold ${cat.textColor}`}>
                    ₹{cat.amountCr.toFixed(2)} Cr ({cat.pct}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#090E1A] overflow-hidden border border-white/5">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
