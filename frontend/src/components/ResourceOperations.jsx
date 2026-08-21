import { useState } from "react";
import { Package, Truck, ShieldAlert, CheckCircle2, AlertTriangle, Users, MapPin, Plus, Send } from "lucide-react";
import { HOSPITALS_AND_CAMPS, FIELD_TEAMS } from "./disasterData.js";

export default function ResourceOperations({ resources: initialResources = [] }) {
  const [resources, setResources] = useState(
    initialResources.length > 0
      ? initialResources
      : [
          { name: "Rescue Boats", available: 18, total: 25, unit: "units", icon: "Anchor" },
          { name: "Evacuation Buses", available: 12, total: 30, unit: "vehicles", icon: "Bus" },
          { name: "Emergency Ambulances", available: 8, total: 15, unit: "units", icon: "Truck" },
          { name: "Temporary Shelter Beds", available: 2270, total: 2650, unit: "beds", icon: "Home" },
          { name: "Food & Water Rations", available: 14200, total: 20000, unit: "kits", icon: "Package" },
          { name: "Medical Kits", available: 850, total: 1500, unit: "kits", icon: "Heart" },
        ]
  );

  const [dispatchSuccess, setDispatchSuccess] = useState(null);

  const handleDispatch = (teamName, sector) => {
    setDispatchSuccess(`Emergency Unit [${teamName}] dispatched to ${sector}!`);
    setTimeout(() => setDispatchSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Package className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Resource Logistics & Field Operations</h2>
            <p className="text-xs text-[#8B96AC]">Real-time equipment inventory, field team deployment, and shelter readiness</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            LOGISTICS HUB ACTIVE
          </span>
        </div>
      </div>

      {dispatchSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {dispatchSuccess}
        </div>
      )}

      {/* Main Grid: Logistics Progress & Field Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Inventory Stock Gauges */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider border-b border-white/5 pb-3">
              Equipment & Consumables Availability Stock
            </h3>

            <div className="space-y-4">
              {resources.map((item) => {
                const pct = Math.round((item.available / item.total) * 100);
                const isLow = pct < 35;
                const barColor = isLow ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]" : pct < 65 ? "bg-amber-500" : "bg-emerald-500";

                return (
                  <div key={item.name} className="bg-[#090E1A]/80 border border-white/5 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-2">
                        {item.name}
                        {isLow && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> LOW STOCK WARNING
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[#8B96AC] font-semibold">
                        <span className={isLow ? "text-rose-400 font-bold" : "text-white"}>{item.available.toLocaleString()}</span> / {item.total.toLocaleString()} {item.unit} ({pct}%)
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-[#060A12] overflow-hidden border border-white/5">
                      <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shelters & Hospitals Capacity Summary */}
          <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider border-b border-white/5 pb-3">
              Relief Camp & Hospital Bed Capacity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOSPITALS_AND_CAMPS.map((hc) => (
                <div key={hc.id} className="bg-[#090E1A]/80 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-white truncate">{hc.name}</div>
                  <div className="text-[11px] font-mono text-cyan-400">{hc.status}</div>
                  {hc.bedsAvailable !== undefined && (
                    <div className="text-[11px] text-[#8B96AC]">Beds Available: <b className="text-white">{hc.bedsAvailable}</b> / {hc.bedsTotal}</div>
                  )}
                  {hc.shelteredPeople !== undefined && (
                    <div className="text-[11px] text-[#8B96AC]">Sheltered Citizens: <b className="text-white">{hc.shelteredPeople}</b> / {hc.maxCapacity}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Field Response Teams & Quick Dispatch */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> Active Field Response Units
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{FIELD_TEAMS.length} TEAMS</span>
            </div>

            <div className="space-y-3">
              {FIELD_TEAMS.map((team) => (
                <div key={team.id} className="bg-[#090E1A]/90 border border-white/5 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{team.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      team.status === "DEPLOYED" ? "bg-rose-500/20 text-rose-400" : team.status === "ACTIVE" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {team.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#8B96AC]">Role: <span className="text-[#E7ECF5]">{team.role}</span></div>
                  <div className="text-[11px] text-[#8B96AC]">Personnel: <span className="text-white font-mono">{team.members} Officers</span></div>
                  <div className="text-[11px] text-[#8B96AC] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> Sector: <span className="text-cyan-300">{team.sector}</span>
                  </div>

                  <button
                    onClick={() => handleDispatch(team.name, team.sector)}
                    className="w-full mt-1 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-cyan-500/25 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> Re-assign / Dispatch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
