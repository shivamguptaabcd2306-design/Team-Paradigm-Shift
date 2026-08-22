import { useState } from "react";
import { Clock, AlertTriangle, Radio, Shield, HeartPulse, CheckCircle2, ShieldAlert, Waves } from "lucide-react";

const GOLAGHAT_FLOOD_MILESTONES = [
  {
    id: "m1",
    date: "20 Jun 2026",
    title: "Dhansiri River Inflow Surge at Nagaland Foothills",
    location: "Morangi & Sarupathar Sub-division",
    category: "Onset",
    source: "CWC Numaligarh Gauge",
    severity: "Moderate",
    description: "Heavy rainfall across Doyang and Dhansiri catchments causes initial surge. First district flood advisory issued by DDMA Golaghat.",
    icon: Waves,
    accent: "cyan",
  },
  {
    id: "m2",
    date: "26 Jun 2026",
    title: "Dhansiri Breaches Danger Mark at Numaligarh",
    location: "Numaligarh & Bokakhat Circles",
    category: "Gauge Alert",
    source: "DDMA Golaghat Daily Bulletin",
    severity: "High",
    description: "River gauge crosses 77.42m danger mark by 0.40m. 18 low-lying villages in Bokakhat inundated; first 8 relief shelters operationalized.",
    icon: AlertTriangle,
    accent: "amber",
  },
  {
    id: "m3",
    date: "04 Jul 2026",
    title: "Kaziranga NH-715 Animal Corridors Submerged",
    location: "Kohora to Bokakhat Sector (Km 92)",
    category: "Highway Hazard",
    source: "Assam Forest Dept & Golaghat District Police",
    severity: "Critical",
    description: "Floodwater overtops NH-715 at Km 92. Forest department and police enforce 30 km/h pilot vehicle convoys for wildlife crossing.",
    icon: ShieldAlert,
    accent: "rose",
  },
  {
    id: "m4",
    date: "14 Jul 2026",
    title: "Peak Flood Wave: 215 Villages Inundated Across 5 Circles",
    location: "Bokakhat, Golaghat, Khumtai, Dergaon, Morangi",
    category: "Peak Wave",
    source: "DDMA Golaghat State EOC Return",
    severity: "Critical",
    description: "Inundation expands to 1.95 lakh people. 3 NDRF teams and 6 SDRF squads deployed with 38 motorized rescue boats for evacuations.",
    icon: Shield,
    accent: "rose",
  },
  {
    id: "m5",
    date: "29 Jul 2026",
    title: "Inter-Ministerial Central Team (IMCT) Ground Audit in Golaghat",
    location: "Bokakhat, Numaligarh & Khumtai",
    category: "Central Audit",
    source: "MHA / District Administration Press Release",
    severity: "High",
    description: "Central assessment team inspects damaged embankment bundhs, submerged Sali paddy fields, and relief camp facilities in Bokakhat.",
    icon: CheckCircle2,
    accent: "cyan",
  },
  {
    id: "m6",
    date: "10 Aug 2026",
    title: "Dhansiri River Stabilizes; Bilgaon Dyke Armoring Completed",
    location: "Golaghat Town & Bilgaon (Dhansiri Right Bank)",
    category: "Engineering Defense",
    source: "Assam WRD Dhansiri Division",
    severity: "Moderate",
    description: "River levels at Numaligarh steady at 77.94m. Emergency geobag armoring completed at Bilgaon dyke. Focus shifts to camp chlorination.",
    icon: Radio,
    accent: "amber",
  },
  {
    id: "m7",
    date: "17 Aug 2026",
    title: "Chief Minister Flood Relief DBT Released to 38,500 Families",
    location: "District-wide Disbursal",
    category: "DBT Disbursal",
    source: "Chief Minister's Office, Assam / DDMA",
    severity: "Moderate",
    description: "Direct bank transfer of ₹14.80 Crore Gratuitous Relief (GR) and clothing assistance disbursed to flood-hit bank accounts.",
    icon: HeartPulse,
    accent: "emerald",
  },
  {
    id: "m8",
    date: "22 Aug 2026",
    title: "Current Operational State: Active Recovery & Medical Triage",
    location: "All 5 Revenue Circles, Golaghat",
    category: "Current State",
    source: "DDMA Golaghat Daily Flood Report",
    severity: "Critical",
    description: "1.95 lakh citizens affected; 48 active relief camps sheltering 16,500 inmates. 34 mobile medical teams active across the district.",
    icon: ShieldAlert,
    accent: "rose",
  },
];

const SEVERITY_ACCENTS = {
  rose: {
    dot: "bg-rose-500 ring-rose-500/30",
    border: "border-rose-500/40",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
  },
  amber: {
    dot: "bg-amber-500 ring-amber-500/30",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  cyan: {
    dot: "bg-cyan-500 ring-cyan-500/30",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  emerald: {
    dot: "bg-emerald-500 ring-emerald-500/30",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
};

export default function DisasterTimeline({ liveReports = [] }) {
  const [filter, setFilter] = useState("all");

  const formattedLiveReports = liveReports.map((r, index) => ({
    id: `live-${index}`,
    date: r.time || "Logged",
    title: `${r.source}: ${r.location}`,
    category: "Field Update",
    source: r.source,
    location: r.location,
    severity: "High",
    description: r.message,
    icon: Radio,
    accent: "cyan",
    isLive: true,
  }));

  const allTimelineItems = [...GOLAGHAT_FLOOD_MILESTONES, ...formattedLiveReports];

  const filteredItems = allTimelineItems.filter((item) => {
    if (filter === "all") return true;
    return (
      item.category.toLowerCase().includes(filter.toLowerCase()) ||
      item.severity.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="bg-[#0F172A]/85 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col space-y-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono">OPERATIONAL TIMELINE</h3>
            <p className="text-[11.5px] text-[#8B96AC]">Chronological operational sequence: Dhansiri surge, NH-715 overtopping, to DBT recovery</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg border transition-colors ${
              filter === "all" ? "bg-violet-500/20 text-violet-300 border-violet-500/40 font-bold" : "bg-[#090E1A] text-[#7C8AA3] border-white/5"
            }`}
          >
            All Milestones ({allTimelineItems.length})
          </button>
          <button
            onClick={() => setFilter("Critical")}
            className={`px-3 py-1 rounded-lg border transition-colors ${
              filter === "Critical" ? "bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold" : "bg-[#090E1A] text-[#7C8AA3] border-white/5"
            }`}
          >
            Critical Peaks
          </button>
          <button
            onClick={() => setFilter("DBT")}
            className={`px-3 py-1 rounded-lg border transition-colors ${
              filter === "DBT" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold" : "bg-[#090E1A] text-[#7C8AA3] border-white/5"
            }`}
          >
            DBT Relief Grants
          </button>
        </div>
      </div>

      {/* Timeline Stream Area */}
      <div className="relative pl-5 sm:pl-7 space-y-4 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 via-rose-500 to-emerald-500">
        {filteredItems.map((item) => {
          const style = SEVERITY_ACCENTS[item.accent] || SEVERITY_ACCENTS.cyan;
          const IconComponent = item.icon || Radio;

          return (
            <div key={item.id} className="relative group">
              <div
                className={`absolute -left-5 sm:-left-7 top-2 w-3.5 h-3.5 rounded-full ${style.dot} ring-4 transition-transform group-hover:scale-125`}
              />

              <div className="bg-[#090E1A]/90 border border-white/5 group-hover:border-white/15 rounded-xl p-4 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#0F172A] text-cyan-300 border border-cyan-500/20 font-bold">
                      {item.date}
                    </span>
                    <h4 className="text-[13px] font-bold text-white">{item.title}</h4>
                    {item.isLive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        DEOC LOG
                      </span>
                    )}
                  </div>

                  <span className={`text-[10.5px] font-mono px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border} font-semibold`}>
                    {item.category}
                  </span>
                </div>

                <p className="text-[12px] text-[#D5DBE8] leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between pt-1 text-[10.5px] text-[#7C8AA3] font-mono border-t border-white/5">
                  <span>Source: {item.source}</span>
                  <span className="text-[#8B96AC]">Location: {item.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
