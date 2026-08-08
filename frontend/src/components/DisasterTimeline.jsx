import { useState } from "react";
import { Clock, AlertTriangle, Radio, Shield, HeartPulse, CheckCircle2, Filter, Layers } from "lucide-react";

const MAJOR_MILESTONES = [
  {
    id: "m1",
    time: "06:42 IST",
    title: "Flash Flood Inundation Warning",
    category: "Alert",
    source: "Flood Control & Local Authority",
    location: "Sector 4 Disaster Area",
    severity: "Critical",
    description: "Embankment overflow at Sector 4. Localized disaster protocol activated for immediate single-zone response.",
    icon: AlertTriangle,
    accent: "rose",
  },
  {
    id: "m2",
    time: "07:10 IST",
    title: "Embankment Water Breach",
    category: "Sensor",
    source: "Sector 4 Water Gauge",
    location: "Sector 4 — Riverside Colony",
    severity: "Critical",
    description: "Water level crossed +1.5m danger mark. Main access road into Riverside Colony inundated.",
    icon: Radio,
    accent: "rose",
  },
  {
    id: "m3",
    time: "07:22 IST",
    title: "Emergency Rescue Dispatch",
    category: "Rescue",
    source: "Emergency Helpline",
    location: "Sector 4 — Main Market Road",
    severity: "High",
    description: "Citizen distress call received. Family stranded on balcony; rescue boat deployed.",
    icon: Shield,
    accent: "amber",
  },
  {
    id: "m4",
    time: "07:35 IST",
    title: "Power Grid Isolated & Boat Launch",
    category: "Rescue",
    source: "Emergency Response Command",
    location: "Sector 4 — East Power Grid & Riverside",
    severity: "High",
    description: "Electrical grid safely de-energized. 2 rescue boats operating in Riverside Colony.",
    icon: CheckCircle2,
    accent: "cyan",
  },
  {
    id: "m5",
    time: "08:05 IST",
    title: "Primary Relief Shelter Operational",
    category: "Relief",
    source: "NGO Coordinator Network",
    location: "Sector 4 — Primary Shelter Ground",
    severity: "Moderate",
    description: "Relief camp opened with 300-bed capacity. First aid, clean water, and meal packages distributed.",
    icon: HeartPulse,
    accent: "emerald",
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

  // Merge live incoming reports into timeline stream if available
  const formattedLiveReports = liveReports.map((r, index) => ({
    id: `live-${index}`,
    time: r.time || "Live",
    title: `${r.source}: ${r.location}`,
    category: r.source.toLowerCase().includes("ngo") ? "Relief" : r.source.toLowerCase().includes("emergency") ? "Rescue" : "Alert",
    source: r.source,
    location: r.location,
    severity: "High",
    description: r.message,
    icon: Radio,
    accent: r.source.toLowerCase().includes("citizen") ? "amber" : "cyan",
    isLive: true,
  }));

  const allTimelineItems = [...MAJOR_MILESTONES, ...formattedLiveReports];

  const filteredItems = allTimelineItems.filter((item) => {
    if (filter === "all") return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-4 sm:p-5 flex flex-col space-y-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1B2434]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <Clock className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#E7ECF5]">Disaster Escalation & Event Timeline</h3>
            <p className="text-[11.5px] text-[#7C8AA3]">Chronological operational sequence & incoming updates</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11.5px]">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-md border transition-colors ${
              filter === "all" ? "bg-violet-500/10 text-violet-300 border-violet-500/40 font-medium" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            All Events ({allTimelineItems.length})
          </button>
          <button
            onClick={() => setFilter("Alert")}
            className={`px-2.5 py-1 rounded-md border transition-colors ${
              filter === "Alert" ? "bg-rose-500/10 text-rose-300 border-rose-500/40 font-medium" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            Alerts & Sensors
          </button>
          <button
            onClick={() => setFilter("Rescue")}
            className={`px-2.5 py-1 rounded-md border transition-colors ${
              filter === "Rescue" ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40 font-medium" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            Rescue Ops
          </button>
          <button
            onClick={() => setFilter("Relief")}
            className={`px-2.5 py-1 rounded-md border transition-colors ${
              filter === "Relief" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40 font-medium" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            Relief & Supplies
          </button>
        </div>
      </div>

      {/* Timeline Stream Area */}
      <div className="relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-rose-500 before:via-violet-500 before:to-cyan-500">
        {filteredItems.map((item) => {
          const style = SEVERITY_ACCENTS[item.accent] || SEVERITY_ACCENTS.cyan;
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-4 sm:-left-6 top-1.5 w-3.5 h-3.5 rounded-full ${style.dot} ring-4 transition-transform group-hover:scale-125`}
              />

              {/* Event Card */}
              <div className="bg-[#0D1420] border border-[#1B2434] group-hover:border-[#3A4560] rounded-xl p-3.5 transition-all space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111826] text-[#B7C0D1] border border-[#1B2434]">
                      {item.time}
                    </span>
                    <h4 className="text-[13px] font-semibold text-[#E7ECF5]">{item.title}</h4>
                    {item.isLive && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        LIVE FEED
                      </span>
                    )}
                  </div>

                  <span className={`text-[10.5px] font-mono px-2 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
                    {item.category}
                  </span>
                </div>

                <p className="text-[12.5px] text-[#B7C0D1] leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-[#7C8AA3] border-t border-[#1B2434]/60">
                  <span>Source: {item.source}</span>
                  <span className="font-mono text-[#8B96AC]">Location: {item.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
