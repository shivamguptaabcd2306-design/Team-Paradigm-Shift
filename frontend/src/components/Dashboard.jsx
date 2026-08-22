import { useState } from "react";
import {
  Users,
  Home,
  ShieldAlert,
  Building2,
  Tent,
  Route,
  Anchor,
  Wheat,
  Activity,
  CheckCircle,
  MapPin,
  RefreshCw,
  Clock,
  Sparkles,
  Layers,
  HeartPulse,
  Coins,
  Shield,
  BarChart2,
  Compass,
  PhoneCall,
} from "lucide-react";

import StatCard from "./StatCard.jsx";
import DisasterMap from "./DisasterMap.jsx";
import DistrictImpactSection from "./DistrictImpactSection.jsx";
import InfrastructureSection from "./InfrastructureSection.jsx";
import HydrologySection from "./HydrologySection.jsx";
import ReliefRecoverySection from "./ReliefRecoverySection.jsx";
import HumanImpactSection from "./HumanImpactSection.jsx";
import TelemetryAnalyticsChart from "./TelemetryAnalyticsChart.jsx";
import DisasterTimeline from "./DisasterTimeline.jsx";

export default function Dashboard({
  disasterInfo = {},
  kpiCards = [],
  circlesData = [],
  humanitarianData = {},
  housingData = {},
  infrastructureData = {},
  agricultureData = {},
  riverGaugeData = [],
  reliefOperationsData = {},
  healthServicesData = {},
  hospitalsData = [],
  emergencyContactsData = [],
  economicLossData = {},
  recoveryData = {},
  affectedLocations = [],
  resources = [],
  summary = "",
  summaryLoading = false,
  summaryError = false,
  onRefresh,
  evaluationMetrics = {},
  timelineFrames = [],
}) {
  const [subView, setSubView] = useState("circles"); // circles | roads | hydrology | relief | human | analytics | timeline

  const subViewTabs = [
    { id: "circles", label: "Local Impact (5 Circles)", icon: Building2 },
    { id: "roads", label: "Road & Infrastructure", icon: Route },
    { id: "hydrology", label: "Dhansiri River Monitoring", icon: Activity },
    { id: "relief", label: "Health & Emergency Contacts", icon: HeartPulse },
    { id: "human", label: "Demographic Audit", icon: Users },
    { id: "analytics", label: "Analytics & Loss", icon: BarChart2 },
    { id: "timeline", label: "Operational Timeline", icon: Clock },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. SITUATION OVERVIEW TITLE & METADATA BAR */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              SITUATION OVERVIEW
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              DEOC ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] font-mono mt-1">
            District Emergency Operations Centre • Dhansiri & Doyang Basin Operational Telemetry
          </p>
        </div>

        {/* REFRESH & TIMESTAMP */}
        <div className="flex items-center gap-3">
          <div className="text-right text-[11px] font-mono text-[#7C8AA3] hidden sm:block">
            <div>Last Official Return: <b className="text-white">22 Aug 2026, 14:00 IST</b></div>
            <div className="text-cyan-400">Sources: DDMA Golaghat, ASDMA, CWC, WRD, PWD</div>
          </div>

          <button
            onClick={onRefresh}
            disabled={summaryLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#E7ECF5] hover:bg-white/10 transition-colors disabled:opacity-50"
            title="Refresh AI Operational Brief"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${summaryLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Brief</span>
          </button>
        </div>
      </div>

      {/* 2. OPERATIONAL STATUS BANNER */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-[#0B1324] to-slate-950/60 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <b>Official Telemetry Grid Active:</b> 5 Revenue Circles (Bokakhat, Golaghat Sadar, Khumtai, Dergaon, Morangi) • 100% Verified District Scope
          </span>
        </div>
        <div className="text-[11px] text-[#7C8AA3] flex items-center gap-3">
          <span>● CWC Gauge: Numaligarh (<b>77.94m</b> vs Danger <b>77.42m</b>)</span>
          <span>•</span>
          <span>● 8 Hospitals Active</span>
        </div>
      </div>

      {/* 3. PROMINENT KPI CARDS (12 GOLAGHAT METRICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-3.5">
        {kpiCards.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={card.value}
            unit={card.unit}
            delta={card.delta}
            goodDirection={card.goodDirection}
            accent={card.accent}
            source={card.source}
            date={card.date}
            status={card.status}
            icon={card.icon}
          />
        ))}
      </div>

      {/* 4. LARGE OPERATIONAL MAP (CENTRAL VISUAL PROMINENCE) */}
      <div className="space-y-2">
        <DisasterMap
          title="OPERATIONAL INUNDATION & INFRASTRUCTURE MAP"
          subtitle="Golaghat District GIS: 5 Circles, Dhansiri/Doyang Rivers, CWC Gauges, NH-715 Status, Hospitals & Relief Camps"
          height="620px"
        />
      </div>

      {/* 5. AI OPERATIONAL BRIEFING */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              DEOC OPERATIONAL SITUATION SYNTHESIS
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
            AI DISTRICT BRIEF
          </span>
        </div>

        <div className="text-xs sm:text-[13px] text-[#D5DBE8] leading-relaxed font-sans">
          {summaryLoading ? (
            <div className="flex items-center gap-2 text-cyan-400 font-mono py-1">
              <Sparkles className="w-4 h-4 animate-spin" />
              Synthesizing latest verified Golaghat district flood returns...
            </div>
          ) : summaryError ? (
            <div className="text-rose-400 font-mono">
              Unable to generate AI briefing. Please check backend server.
            </div>
          ) : (
            summary ||
            "Golaghat district is currently responding to severe riverine inundation affecting 1,95,400 citizens across 215 villages in Bokakhat, Golaghat Sadar, Khumtai, Dergaon, and Morangi revenue circles. The Dhansiri river at Numaligarh is holding steady at 77.94m (+0.52m above danger level), with NH-715 overtopped at Km 92 under regulated 30 km/h pilot escort. 48 active relief shelters house 16,500 inmates with ongoing medical chlorination and ₹14.80 Cr DBT Gratuitous Relief disbursed to 38,500 families."
          )}
        </div>
      </div>

      {/* 6. SUB-VIEW NAVIGATION TAB BAR */}
      <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex gap-1.5 overflow-x-auto shadow-xl">
        {subViewTabs.map((tab) => {
          const TabIcon = tab.icon;
          const active = subView === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSubView(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                active
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                  : "bg-transparent text-[#7C8AA3] hover:text-white"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 7. DYNAMIC SUB-VIEW MODULES */}
      <div className="space-y-6">
        {subView === "circles" && <DistrictImpactSection circles={circlesData} />}
        {subView === "roads" && (
          <InfrastructureSection
            housing={housingData}
            infrastructure={infrastructureData}
            agriculture={agricultureData}
          />
        )}
        {subView === "hydrology" && <HydrologySection riverGauges={riverGaugeData} />}
        {subView === "relief" && (
          <ReliefRecoverySection
            relief={reliefOperationsData}
            health={healthServicesData}
            economic={economicLossData}
            recovery={recoveryData}
            hospitals={hospitalsData}
            emergencyContacts={emergencyContactsData}
          />
        )}
        {subView === "human" && <HumanImpactSection humanitarian={humanitarianData} />}
        {subView === "analytics" && <TelemetryAnalyticsChart />}
        {subView === "timeline" && <DisasterTimeline />}
      </div>
    </div>
  );
}
