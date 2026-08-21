import { BarChart2, PieChart, ShieldAlert, Cpu, Users, Layers, Activity } from "lucide-react";
import { DAMAGE_STATISTICS, BUILDINGS, ROADS } from "./disasterData.js";

export default function AnalyticsPanel() {
  const stats = DAMAGE_STATISTICS;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Damage Classification & Impact Analytics</h2>
            <p className="text-xs text-[#8B96AC]">Machine-learning derived severity distributions and infrastructure loss analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#8B96AC]">
          <Cpu className="w-4 h-4 text-violet-400" /> Model Confidence: <b className="text-emerald-400 font-bold">{stats.aiAvgConfidence}</b>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-[11px] font-mono text-[#8B96AC] uppercase">Severe Structures</div>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{stats.severeBuildings} Buildings</div>
          <div className="text-[11px] text-rose-300/80 mt-1">Priority 1 Inspection</div>
        </div>

        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-[11px] font-mono text-[#8B96AC] uppercase">Blocked Arterial Roads</div>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{stats.blockedRoads} Highways</div>
          <div className="text-[11px] text-rose-300/80 mt-1">Severe Obstruction</div>
        </div>

        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-[11px] font-mono text-[#8B96AC] uppercase">Affected Population</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{stats.affectedPopulation}</div>
          <div className="text-[11px] text-cyan-300/80 mt-1">In Undated Zone</div>
        </div>

        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-[11px] font-mono text-[#8B96AC] uppercase">Total Submerged Area</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{stats.totalSubmergedArea}</div>
          <div className="text-[11px] text-emerald-300/80 mt-1">Satellite Extent</div>
        </div>
      </div>

      {/* Grid: Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Building Damage Distribution */}
        <div className="lg:col-span-6 bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider border-b border-white/5 pb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-cyan-400" /> Structural Damage Distribution
          </h3>

          <div className="space-y-3.5">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-rose-400 font-bold">Severe Damage</span>
                <span className="text-white">{stats.severeBuildings} ({Math.round((stats.severeBuildings / BUILDINGS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(stats.severeBuildings / BUILDINGS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-orange-400 font-bold">High Damage</span>
                <span className="text-white">{stats.highBuildings} ({Math.round((stats.highBuildings / BUILDINGS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(stats.highBuildings / BUILDINGS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-yellow-400 font-bold">Moderate Damage</span>
                <span className="text-white">{stats.moderateBuildings} ({Math.round((stats.moderateBuildings / BUILDINGS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(stats.moderateBuildings / BUILDINGS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-emerald-400 font-bold">Low / Operational</span>
                <span className="text-white">{stats.lowBuildings} ({Math.round((stats.lowBuildings / BUILDINGS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(stats.lowBuildings / BUILDINGS.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Road Accessibility Breakdown */}
        <div className="lg:col-span-6 bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider border-b border-white/5 pb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Road Accessibility Breakdown
          </h3>

          <div className="space-y-3.5">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-rose-400 font-bold">Blocked Passages</span>
                <span className="text-white">{stats.blockedRoads} ({Math.round((stats.blockedRoads / ROADS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(stats.blockedRoads / ROADS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-amber-400 font-bold">Partially Blocked</span>
                <span className="text-white">{stats.partiallyBlockedRoads} ({Math.round((stats.partiallyBlockedRoads / ROADS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(stats.partiallyBlockedRoads / ROADS.length) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-emerald-400 font-bold">Clear Open Passages</span>
                <span className="text-white">{stats.openRoads} ({Math.round((stats.openRoads / ROADS.length) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#060A12] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(stats.openRoads / ROADS.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
