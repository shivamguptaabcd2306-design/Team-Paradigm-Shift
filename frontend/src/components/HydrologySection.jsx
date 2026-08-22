import { useState } from "react";
import { Activity, Droplet, TrendingUp, TrendingDown, Minus, Search, ShieldAlert, Clock, Info, Waves } from "lucide-react";

export default function HydrologySection({ riverGauges = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGauges = riverGauges.filter((g) => {
    return (
      g.river.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.circle && g.circle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const totalAboveDanger = riverGauges.filter((g) => g.status && g.status.includes("ABOVE")).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECTION HEADER */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">DHANSIRI & DOYANG RIVER MONITORING</h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
              CWC & WRD GAUGES
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] mt-1">
            Hydrological gauge observations across Golaghat district: water levels, danger marks, Highest Flood Level (HFL), and river surge trends.
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#7C8AA3] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search river or station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#090E1A] border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#E7ECF5] placeholder-[#7C8AA3] focus:outline-none focus:border-cyan-500/50 w-52 sm:w-60"
          />
        </div>
      </div>

      {/* QUICK SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-rose-500/30 shadow-lg space-y-1">
          <div className="text-[10.5px] text-rose-400 font-bold">GAUGES ABOVE DANGER MARK</div>
          <div className="text-2xl font-bold text-rose-400">{totalAboveDanger} stations</div>
          <div className="text-[10px] text-[#7C8AA3]">Numaligarh, Golaghat Town, Doyang</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 shadow-lg space-y-1">
          <div className="text-[10.5px] text-[#8B96AC]">DHANSIRI @ NUMALIGARH</div>
          <div className="text-2xl font-bold text-rose-400">77.94 m</div>
          <div className="text-[10px] text-rose-300 font-bold">+0.52 m above danger (77.42 m)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 shadow-lg space-y-1">
          <div className="text-[10.5px] text-[#8B96AC]">DHANSIRI @ GOLAGHAT TOWN</div>
          <div className="text-2xl font-bold text-amber-300">91.80 m</div>
          <div className="text-[10px] text-amber-300 font-bold">+0.30 m above danger (Falling)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 shadow-lg space-y-1">
          <div className="text-[10.5px] text-[#8B96AC]">DOYANG @ CONFLUENCE</div>
          <div className="text-2xl font-bold text-cyan-300">84.40 m</div>
          <div className="text-[10px] text-cyan-300 font-bold">+0.20 m above danger (Rising)</div>
        </div>
      </div>

      {/* HYDROLOGICAL GAUGE TELEMETRY TABLE */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#090E1A] border-b border-white/10 text-[#8B96AC] font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Station & Circle</th>
                <th className="py-3.5 px-3 font-semibold">River System</th>
                <th className="py-3.5 px-3 font-semibold text-right">Current Water Level</th>
                <th className="py-3.5 px-3 font-semibold text-right">Danger Level</th>
                <th className="py-3.5 px-3 font-semibold text-right">Highest Flood Level (HFL)</th>
                <th className="py-3.5 px-3 font-semibold text-center">Trend</th>
                <th className="py-3.5 px-3 font-semibold">Observation Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Agency & Observation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#D5DBE8]">
              {filteredGauges.map((g, idx) => {
                const isAbove = g.status && g.status.includes("ABOVE");
                const current = g.currentLevelM || g.level;
                const danger = g.dangerLevelM || g.danger;
                const hfl = g.hflM || g.hfl;
                const diff = (current - danger).toFixed(2);

                return (
                  <tr key={idx} className={`hover:bg-[#121D33] transition-colors ${isAbove ? "bg-rose-500/5" : ""}`}>
                    {/* Station & Circle */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{g.station}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">Circle: {g.circle || "Golaghat"}</div>
                    </td>

                    {/* River System */}
                    <td className="py-3.5 px-3 font-medium text-[#B7C0D1]">{g.river}</td>

                    {/* Current Level */}
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-base text-white">
                      {current?.toFixed(2)} m
                    </td>

                    {/* Danger Level */}
                    <td className="py-3.5 px-3 text-right font-mono text-[#8B96AC]">
                      {danger?.toFixed(2)} m
                    </td>

                    {/* HFL */}
                    <td className="py-3.5 px-3 text-right font-mono text-[#7C8AA3]">
                      {hfl?.toFixed(2)} m
                    </td>

                    {/* Trend */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full ${
                        g.trend?.includes("RISING")
                          ? "bg-rose-500/15 text-rose-400"
                          : g.trend?.includes("FALLING")
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-white/5 text-[#8B96AC]"
                      }`}>
                        {g.trend?.includes("RISING") ? <TrendingUp className="w-3 h-3" /> : g.trend?.includes("FALLING") ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {g.trend}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 font-mono text-xs">
                      {isAbove ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          ABOVE DANGER (+{diff}m)
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          NEAR WARNING ({diff}m)
                        </span>
                      )}
                    </td>

                    {/* Agency & Observation */}
                    <td className="py-3.5 px-4 text-right font-mono text-[11px] text-[#7C8AA3]">
                      <div>{g.lastObservation || g.lastObs}</div>
                      <div className="text-[10px] text-[#556480]">{g.agency}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#090E1A] border-t border-white/5 text-[11px] font-mono text-[#7C8AA3] flex flex-wrap items-center justify-between gap-2 px-5">
          <span>Official Gauge Network: Central Water Commission (CWC) & Assam Water Resources Dept (Dhansiri Division)</span>
          <span>Observation Timestamp: Hourly Telemetry Log (22 Aug 2026, 12:00 IST)</span>
        </div>
      </div>
    </div>
  );
}
