import { Home, Route, Anchor, ShieldAlert, Wheat, Building2, CheckCircle2, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function InfrastructureSection({
  housing = {},
  infrastructure = {},
  agriculture = {},
}) {
  const roads = infrastructure.roads || {};
  const bridges = infrastructure.bridges || {};
  const embankments = infrastructure.embankments || {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECTION HEADER */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">ROAD CONNECTIVITY & INFRASTRUCTURE STATUS</h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              PWD & WRD DIVISION
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] mt-1">
            Real-time highway passage intelligence, bridge crossability, river dyke armoring, housing loss, and agricultural flood damage.
          </p>
        </div>

        <div className="text-right text-[11px] font-mono text-[#7C8AA3]">
          <div>Agency: Assam PWD (Golaghat Roads) & WRD</div>
          <div className="text-cyan-400">Total Damaged Road Length: <b>126 km (32 cuts)</b></div>
        </div>
      </div>

      {/* 1. ROAD & CONNECTIVITY INTELLIGENCE (MAJOR SECTION) */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Route className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">Road & Highway Connectivity Grid</h3>
              <p className="text-[11px] text-[#8B96AC]">National Highway corridors, State Highways, and village PMGSY connectivity</p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
            {roads.totalSectionsDamaged || 32} SECTIONS AFFECTED
          </span>
        </div>

        {/* Highway Specific Cards with Status Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(roads.highways || [
            {
              name: "NH-715 (Old NH-37)",
              section: "Kohora–Bokakhat–Bagori (Kaziranga Sector)",
              status: "RESTRICTED",
              details: "Water overtopping shoulder at Km 92. Regulated 30 km/h speed pilot escort active for vehicle and wildlife safety.",
              source: "Assam Forest Dept & District Police",
            },
            {
              name: "NH-129 / NH-29",
              section: "Numaligarh–Golaghat–Dimapur Corridor",
              status: "OPEN",
              details: "Shoulder erosion repaired near Morangi; two-way commercial and emergency transit operational.",
              source: "Assam PWD NH Division",
            },
            {
              name: "SH-1 (Dhudar Ali)",
              section: "Golaghat–Khumtai–Kamargaon Link",
              status: "PARTIALLY ACCESSIBLE",
              details: "0.20m water on carriageway at Km 14 (Khumtai). Light motor vehicles and rescue convoys permitted.",
              source: "Assam PWD State Roads",
            },
            {
              name: "Bokakhat–Dhansirimukh Road",
              section: "Dhansirimukh Sector",
              status: "CLOSED",
              details: "Culvert approach washed out by backwaters. State SDRF boat ferry service stationed.",
              source: "PWD Sub-Division Bokakhat",
            },
          ]).map((rd, idx) => {
            const isClosed = rd.status === "CLOSED";
            const isRestricted = rd.status === "RESTRICTED" || rd.status === "PARTIALLY ACCESSIBLE";
            const badgeBg = isClosed
              ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
              : isRestricted
              ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
              : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";

            return (
              <div key={idx} className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-white text-sm">{rd.name}</div>
                    <div className="text-[11px] text-cyan-400 font-mono">{rd.section}</div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${badgeBg}`}>
                    {rd.status}
                  </span>
                </div>
                <p className="text-xs text-[#D5DBE8] leading-relaxed">{rd.details}</p>
                <div className="text-[10px] text-[#7C8AA3] font-mono pt-1 border-t border-white/5">
                  Source: {rd.source}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BRIDGES & DYKE BREACHES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BRIDGES */}
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Bridges & Crossings Status</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {bridges.totalDamaged || 3} BRIDGES MONITORED
            </span>
          </div>

          <div className="space-y-2.5">
            {(bridges.criticalBridges || [
              {
                name: "Dhansiri River Bridge Approach",
                location: "Numaligarh, NH-129 Link",
                status: "OPEN — RESTORED",
                details: "Geobag boulder pitching completed on western abutment by WRD.",
              },
              {
                name: "Doyang River Bridge Wing Wall",
                location: "Khumtai–Kamargaon Border",
                status: "RESTRICTED",
                details: "Single lane traffic allowed under 10 km/h load restriction.",
              },
              {
                name: "Gelabil Timber Trestle Culvert",
                location: "Dhansirimukh, Bokakhat",
                status: "CLOSED",
                details: "Temporary foot pontoon installed for pedestrian and ration transit.",
              },
            ]).map((br, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#090E1A] border border-white/5 flex items-start justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-white">{br.name}</div>
                  <div className="text-[11px] text-[#8B96AC]">{br.location}</div>
                  <div className="text-[11px] text-cyan-300 mt-1">{br.details}</div>
                </div>
                <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-right shrink-0">
                  {br.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EMBANKMENTS */}
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Embankments & River Dyke Armoring</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {embankments.totalBreaches || 4} DEFENSE ZONES
            </span>
          </div>

          <div className="space-y-2.5">
            {(embankments.notableBreaches || [
              {
                location: "Dhansiri Right Bank Dyke (Near Bilgaon)",
                river: "Dhansiri",
                circle: "Golaghat",
                status: "Active Geobag Armoring (WRD + SDRF)",
              },
              {
                location: "Gelabil Flood Protection Bundh",
                river: "Gelabil",
                circle: "Bokakhat",
                status: "Contained — 24hr Engineer Patrol",
              },
              {
                location: "Kakodonga Left Bank Ring Bundh",
                river: "Kakodonga",
                circle: "Dergaon",
                status: "Stabilized with Poly-geo Sheets",
              },
            ]).map((emb, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#090E1A] border border-white/5 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{emb.location}</span>
                  <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">{emb.river}</span>
                </div>
                <div className="text-[11px] text-[#8B96AC]">Circle: {emb.circle}</div>
                <div className="text-[11px] text-amber-300 font-mono">{emb.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HOUSING & STRUCTURAL DAMAGE (AFFECTED vs DAMAGED) */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Home className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">Housing & Structural Damage Audit</h3>
              <p className="text-[11px] text-[#8B96AC]">Revenue Circle & P&RD verified door-to-door survey (78.4% completed)</p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            {housing.status || "ASSESSMENT ONGOING"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">TOTAL HOUSES AFFECTED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              {(housing.totalHousesAffected || 5640).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">Across 215 villages</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-rose-500/20 space-y-1">
            <div className="text-[11px] font-mono text-rose-400">FULLY DAMAGED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400">
              {(housing.fullyDamaged || 880).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">PMAY-G reconstruction queue</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-amber-500/20 space-y-1">
            <div className="text-[11px] font-mono text-amber-400">PARTIALLY DAMAGED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
              {(housing.partiallyDamaged || 4760).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">Eligible for SDRF repair grant</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">ESTIMATED HOUSING LOSS</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
              ₹{housing.estimatedHousingLossCr || 38.5} Cr
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">Preliminary valuation</div>
          </div>
        </div>

        {/* Breakdown: Kutcha vs Pucca & Public Buildings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5 space-y-1.5">
            <div className="text-[#8B96AC]">STRUCTURE TYPE CLASSIFICATION:</div>
            <div className="text-white">
              Kutcha Houses: <b>{(housing.kutchaHousesAffected || 4320).toLocaleString()}</b> (76.6%) | Pucca: <b>{(housing.puccaHousesAffected || 1320).toLocaleString()}</b> (23.4%)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5 space-y-1.5">
            <div className="text-[#8B96AC]">PUBLIC INFRASTRUCTURE IMPACTED:</div>
            <div className="text-white">
              <b>{housing.publicBuildingsAffected || 28}</b> Public Buildings ({housing.schoolsAffected || 18} Schools, {housing.healthSubCentresAffected || 6} Health Sub-Centres)
            </div>
          </div>
        </div>
      </div>

      {/* 4. AGRICULTURE & LIVESTOCK LOSS */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Wheat className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">Agricultural & Livestock Damage</h3>
              <p className="text-[11px] text-[#8B96AC]">District Agriculture Office & District Veterinary Office assessments</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            {agriculture.status || "ASSESSMENT ONGOING"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">CROP AREA SUBMERGED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
              {(agriculture.cropAreaSubmergedHa || 9800).toLocaleString()} ha
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">Sali Paddy & Tea Lowlands</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">FARMERS AFFECTED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              {(agriculture.farmersAffected || 28400).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">Input subsidy requisitioned</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">LIVESTOCK AFFECTED</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400">
              {(agriculture.livestockAffectedTotal || 115000).toLocaleString()}
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">54K Big / 38K Small / 23K Poultry</div>
          </div>

          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
            <div className="text-[11px] font-mono text-[#8B96AC]">CATTLE FODDER DEPOTS</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
              {agriculture.fodderReliefDepots || 24} depots
            </div>
            <div className="text-[10px] text-[#7C8AA3] font-mono">{(agriculture.fodderDistributedQuintals || 6400).toLocaleString()} Qtl distributed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
