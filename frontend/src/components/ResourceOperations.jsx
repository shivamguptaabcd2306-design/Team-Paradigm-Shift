import { useState } from "react";
import { Package, Truck, ShieldAlert, CheckCircle2, AlertTriangle, Users, MapPin, Send, Anchor, Tent, Wheat, HeartPulse } from "lucide-react";
import { GOLAGHAT_FACILITIES_GEO } from "./disasterData.js";

const GOLAGHAT_FIELD_TEAMS = [
  { id: "TEAM-GLT-01", name: "SDRF Golaghat Rescue Squad Alpha", role: "Motorized Boat Evacuation & Deep Water Rescue", members: 24, sector: "Bokakhat & Gelabil Lowlands", status: "DEPLOYED" },
  { id: "TEAM-GLT-02", name: "NDRF 1st Battalion Task Unit", role: "Flood Inundation Search & Inmate Ferrying", members: 30, sector: "Dhansirimukh & Numaligarh", status: "DEPLOYED" },
  { id: "TEAM-GLT-03", name: "Assam WRD Geobag Dyke Unit", role: "Bilgaon Embankment Armoring & Breach Sealing", members: 18, sector: "Dhansiri Right Bank (Bilgaon)", status: "ACTIVE" },
  { id: "TEAM-GLT-04", name: "District Health Society Medical Fleet 1", role: "Camp Chlorination & Waterborne Disease Triage", members: 12, sector: "Bokakhat & Khumtai Relief Shelters", status: "ACTIVE" },
  { id: "TEAM-GLT-05", name: "Assam PWD Road Restoration Crew", role: "NH-715 Shoulder Stabilization & SH-1 Clearance", members: 16, sector: "Km 92 Kaziranga & Khumtai Link", status: "DEPLOYED" },
];

export default function ResourceOperations({ resources: initialResources = [] }) {
  const [resources, setResources] = useState(
    initialResources.length > 0
      ? initialResources
      : [
          { name: "SDRF Rescue Boats", available: 38, total: 42, unit: "motorized boats", icon: "Anchor" },
          { name: "Active Relief Camps", available: 48, total: 50, unit: "shelters operational", icon: "Tent" },
          { name: "Mobile Medical Units", available: 34, total: 36, unit: "doctor teams", icon: "HeartPulse" },
          { name: "Cattle Fodder Depots", available: 24, total: 25, unit: "depot centres", icon: "Wheat" },
          { name: "Drinking Water Tankers", available: 16, total: 18, unit: "mobile tankers", icon: "Package" },
        ]
  );

  const [dispatchSuccess, setDispatchSuccess] = useState(null);

  const handleDispatch = (teamName, sector) => {
    setDispatchSuccess(`Emergency Unit [${teamName}] deployed to ${sector}!`);
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
            <h2 className="text-lg font-bold text-white uppercase">GOLAGHAT RELIEF LOGISTICS & EMERGENCY RESPONSE FLEET</h2>
            <p className="text-xs text-[#8B96AC]">District equipment stock, SDRF/NDRF company deployments, and shelter capacity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            DDMA GOLAGHAT LOGISTICS HUB
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
              Golaghat District Emergency Supplies & Equipment Availability
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
                            <AlertTriangle className="w-3 h-3" /> LOW RESERVE
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
              Major Relief Shelters & Referral Hospitals Telemetry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOLAGHAT_FACILITIES_GEO.map((hc) => (
                <div key={hc.id} className="bg-[#090E1A]/80 border border-white/5 rounded-xl p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-white truncate">{hc.name}</div>
                  <div className="text-[11px] font-mono text-cyan-400">Circle: {hc.circle}</div>
                  {hc.bedsAvailable !== undefined && (
                    <div className="text-[11px] text-[#8B96AC]">Emergency Beds: <b className="text-pink-400">{hc.bedsAvailable}</b> / {hc.bedsTotal}</div>
                  )}
                  {hc.inmates !== undefined && (
                    <div className="text-[11px] text-[#8B96AC]">Sheltered Inmates: <b className="text-emerald-400">{hc.inmates}</b> / {hc.capacity}</div>
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
                <Users className="w-4 h-4 text-cyan-400" /> Active Search & Rescue Squads
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{GOLAGHAT_FIELD_TEAMS.length} SQUADS</span>
            </div>

            <div className="space-y-3">
              {GOLAGHAT_FIELD_TEAMS.map((team) => (
                <div key={team.id} className="bg-[#090E1A]/90 border border-white/5 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{team.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      team.status === "DEPLOYED" ? "bg-rose-500/20 text-rose-400" : "bg-cyan-500/20 text-cyan-400"
                    }`}>
                      {team.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#8B96AC]">Role: <span className="text-[#E7ECF5]">{team.role}</span></div>
                  <div className="text-[11px] text-[#8B96AC]">Rescuers: <span className="text-white font-mono">{team.members} Personnel</span></div>
                  <div className="text-[11px] text-[#8B96AC] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> Operational Sector: <span className="text-cyan-300">{team.sector}</span>
                  </div>

                  <button
                    onClick={() => handleDispatch(team.name, team.sector)}
                    className="w-full mt-1 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-cyan-500/25 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> Re-assign Sector Directive
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
