import { useState } from "react";
import { Search, ArrowUpDown, MapPin, Building2, ShieldAlert, Home, Wheat, Tent, Users, Clock, Info } from "lucide-react";
import { SEVERITY_STYLES } from "../data/styles.js";

export default function DistrictImpactSection({ circles = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("populationAffected");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const filteredCircles = circles
    .filter((c) => {
      const matchesSearch =
        c.circle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subdivision.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.criticalRivers.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.status.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity =
        severityFilter === "all" || c.severity.toLowerCase() === severityFilter.toLowerCase();
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      const valA = a[sortBy] || 0;
      const valB = b[sortBy] || 0;
      return sortOrder === "desc" ? valB - valA : valA - valB;
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECTION HEADER */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">LOCAL & REVENUE CIRCLE IMPACT</h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
              DDMA VERIFIED RETURNS
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] mt-1">
            Administrative hierarchy: Golaghat District → Sub-divisions & Revenue Circles → Submerged Villages & Relief Shelters.
          </p>
        </div>

        {/* CONTROLS: SEARCH & FILTER */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7C8AA3] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search circle, river, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#090E1A] border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#E7ECF5] placeholder-[#7C8AA3] focus:outline-none focus:border-cyan-500/50 w-52 sm:w-60"
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#090E1A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-[#E7ECF5] font-mono focus:outline-none"
          >
            <option value="all">All Severity Levels</option>
            <option value="critical">Critical Flood Zone</option>
            <option value="high">High Severity</option>
            <option value="moderate">Moderate Severity</option>
          </select>
        </div>
      </div>

      {/* SORTING SHORTCUT BAR */}
      <div className="bg-[#0F172A]/70 border border-white/5 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#8B96AC]">
          <ArrowUpDown className="w-4 h-4 text-cyan-400" />
          <span>SORT CIRCLES BY:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { key: "populationAffected", label: "Most Affected Population" },
            { key: "housesDamaged", label: "Highest House Damage" },
            { key: "villagesAffected", label: "Most Submerged Villages" },
            { key: "cropAreaHa", label: "Largest Crop Loss" },
            { key: "peopleInCamps", label: "Most Camp Inmates" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => handleSort(s.key)}
              className={`px-3 py-1 rounded-lg border text-xs transition-all ${
                sortBy === s.key
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "bg-[#090E1A] border-white/5 text-[#7C8AA3] hover:text-white"
              }`}
            >
              {s.label} {sortBy === s.key ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>
          ))}
        </div>
      </div>

      {/* REVENUE CIRCLES DETAILED TABLE */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#090E1A] border-b border-white/10 text-[#8B96AC] font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Revenue Circle & Sub-division</th>
                <th className="py-3.5 px-3 font-semibold text-right cursor-pointer" onClick={() => handleSort("populationAffected")}>
                  Population Affected {sortBy === "populationAffected" && (sortOrder === "desc" ? "↓" : "↑")}
                </th>
                <th className="py-3.5 px-3 font-semibold text-center">Deaths</th>
                <th className="py-3.5 px-3 font-semibold text-right">Villages Submerged</th>
                <th className="py-3.5 px-3 font-semibold text-right cursor-pointer" onClick={() => handleSort("housesDamaged")}>
                  Houses Damaged {sortBy === "housesDamaged" && (sortOrder === "desc" ? "↓" : "↑")}
                </th>
                <th className="py-3.5 px-3 font-semibold text-right">Crop Land (ha)</th>
                <th className="py-3.5 px-3 font-semibold text-right">Relief Camps</th>
                <th className="py-3.5 px-4 font-semibold">Critical Rivers & Situation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#D5DBE8]">
              {filteredCircles.map((c) => {
                const s = SEVERITY_STYLES[c.severity] || SEVERITY_STYLES.Moderate;
                const isWorst = c.circle === "Bokakhat" || c.circle === "Golaghat";

                return (
                  <tr key={c.circle} className={`hover:bg-[#121D33] transition-colors ${isWorst ? "bg-rose-500/5" : ""}`}>
                    {/* Circle & Subdivision */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                        <span className="font-bold text-white text-sm">{c.circle}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${s.bg} ${s.text} font-semibold border border-white/5`}>
                          {c.severity}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7C8AA3] font-mono mt-0.5">
                        Sub-division: {c.subdivision}
                      </div>
                    </td>

                    {/* Population */}
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-white text-[13px]">
                      {c.populationAffected.toLocaleString()}
                      <div className="text-[10px] text-[#7C8AA3] font-normal">{c.familiesAffected.toLocaleString()} families</div>
                    </td>

                    {/* Deaths */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {c.deaths}
                      </span>
                    </td>

                    {/* Villages */}
                    <td className="py-3.5 px-3 text-right font-mono text-white font-semibold">
                      {c.villagesAffected} villages
                    </td>

                    {/* Houses */}
                    <td className="py-3.5 px-3 text-right font-mono text-amber-300 font-semibold">
                      {c.housesDamaged.toLocaleString()}
                    </td>

                    {/* Crop Area */}
                    <td className="py-3.5 px-3 text-right font-mono text-[#B7C0D1]">
                      {c.cropAreaHa.toLocaleString()} ha
                    </td>

                    {/* Relief Camps */}
                    <td className="py-3.5 px-3 text-right font-mono">
                      <span className="text-cyan-300 font-semibold">{c.reliefCamps} camps</span>
                      <div className="text-[10px] text-[#7C8AA3]">{c.peopleInCamps.toLocaleString()} inmates</div>
                    </td>

                    {/* Rivers & Condition */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="text-cyan-400 font-medium font-mono text-[11.5px]">{c.criticalRivers}</div>
                      <div className="text-[11px] text-[#8B96AC] line-clamp-1">{c.status}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#090E1A] border-t border-white/5 text-[11px] font-mono text-[#7C8AA3] flex flex-wrap items-center justify-between gap-2 px-5">
          <span>District Administration Returns • 5 Revenue Circles Audited</span>
          <span>Source: DDMA Golaghat Daily Control Room Logs</span>
        </div>
      </div>
    </div>
  );
}
