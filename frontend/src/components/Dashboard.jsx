import { useState } from "react";
import {
  MapPin,
  Sparkles,
  RefreshCw,
  Waves,
  Package,
  Award,
  BarChart2,
  Layers,
  Activity,
  Search,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Route,
  Users,
  Play,
  CheckCircle2,
} from "lucide-react";
import StatCard from "./StatCard.jsx";
import DisasterMap from "./DisasterMap.jsx";
import DisasterTimeline from "./DisasterTimeline.jsx";
import EventReplayBar from "./EventReplayBar.jsx";
import EvaluationReportModal from "./EvaluationReportModal.jsx";
import TelemetryAnalyticsChart from "./TelemetryAnalyticsChart.jsx";
import { SEVERITY_STYLES, ICON_MAP } from "../data/styles.js";
import { DAMAGE_STATISTICS, INITIAL_ALERTS, FIELD_TEAMS } from "./disasterData.js";

export default function Dashboard({
  disasterInfo = {},
  affectedLocations = [],
  statCards = [],
  resources = [],
  summary,
  summaryLoading,
  summaryError,
  onRefresh,
  evaluationMetrics,
  timelineFrames = [],
}) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [missingDataMode, setMissingDataMode] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState("all");
  const [aiAnalysisRunning, setAiAnalysisRunning] = useState(false);
  const [aiAnalysisSuccess, setAiAnalysisSuccess] = useState(false);

  const sevStyle = SEVERITY_STYLES[disasterInfo.severity] || SEVERITY_STYLES.Critical;

  const handleRunAiAnalysis = () => {
    setAiAnalysisRunning(true);
    setAiAnalysisSuccess(false);

    setTimeout(() => {
      onRefresh();
      setAiAnalysisRunning(false);
      setAiAnalysisSuccess(true);
      setTimeout(() => setAiAnalysisSuccess(false), 4000);
    }, 2000);
  };

  const filteredLocations = affectedLocations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.note.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      selectedSeverityFilter === "all" ||
      loc.severity.toLowerCase() === selectedSeverityFilter.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  const criticalAlert = INITIAL_ALERTS.find((a) => a.severity === "CRITICAL") || INITIAL_ALERTS[0];

  return (
    <div className="space-y-6">
      {/* SIH DEMO MODE BANNER */}
      <div className="bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20 border border-cyan-500/30 rounded-2xl p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
            SIH DEMO MODE
          </span>
          <span className="text-xs text-white font-semibold">
            Assam Flood Operational Response — Live AI Prototype
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiAnalysis}
            disabled={aiAnalysisRunning}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${aiAnalysisRunning ? "animate-spin" : ""}`} />
            {aiAnalysisRunning ? "Analyzing Satellite Feed..." : "Run AI Analysis"}
          </button>
        </div>
      </div>

      {aiAnalysisSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          AI Satellite Change Detection completed! Updated building damage polygons and blocked road vectors.
        </div>
      )}

      {/* CRITICAL ALERT STRIP */}
      {criticalAlert && (
        <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-3.5 px-5 flex items-center justify-between gap-3 text-rose-300 text-xs shadow-lg animate-pulse">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold text-rose-400 font-mono">[CRITICAL ALERT]: </span>
              {criticalAlert.title} — <span className="text-white">{criticalAlert.details}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 shrink-0">
            {criticalAlert.timestamp}
          </span>
        </div>
      )}

      {/* Top View Selector Bar */}
      <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-1.5 bg-[#090E1A]/80 border border-white/5 p-1.5 rounded-xl flex-wrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "text-[#7C8AA3] hover:text-[#E7ECF5] hover:bg-white/5"
            }`}
          >
            <Activity className="w-4 h-4" /> Tactical Overview
          </button>

          <button
            onClick={() => setActiveTab("gis")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeTab === "gis"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "text-[#7C8AA3] hover:text-[#E7ECF5] hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" /> GIS Inundation Map
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "text-[#7C8AA3] hover:text-[#E7ECF5] hover:bg-white/5"
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Hydrological Telemetry
          </button>
        </div>

        {/* Post-Event Benchmark Report Modal Trigger */}
        <button
          onClick={() => setShowEvaluationModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-500/25 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <Award className="w-4 h-4 text-emerald-400" />
          Post-Event Benchmark Report
        </button>
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          {/* Hero Banner: Disaster Status + AI Situation Brief */}
          <div className={`relative overflow-hidden rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 border-l-4 ${sevStyle.border} shadow-2xl`}>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${sevStyle.bg} ring-1 ${sevStyle.ring} flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.2)]`}>
                    <Waves className={`w-6 h-6 ${sevStyle.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{disasterInfo.type}</h1>
                      <span className={`text-[11px] font-mono px-3 py-0.5 rounded-full ${sevStyle.bg} ${sevStyle.text} ring-1 ${sevStyle.ring} font-semibold uppercase tracking-wider`}>
                        {disasterInfo.severity?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#8B96AC]">
                      <span className="flex items-center gap-1 font-medium text-[#B7C0D1]">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {disasterInfo.region}
                      </span>
                      <span className="text-[#3A4560]">•</span>
                      <span className="font-mono">{disasterInfo.status}</span>
                      <span className="text-[#3A4560]">•</span>
                      <span className="font-mono">Started: {disasterInfo.startedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Situation Brief Container */}
              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="bg-[#090E1A]/90 border border-violet-500/20 rounded-xl p-4.5 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
                      <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      </div>
                      AI Situation Brief & Operational Directives
                    </div>
                    <button
                      onClick={onRefresh}
                      disabled={summaryLoading}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-[#7C8AA3] hover:text-white transition-colors disabled:opacity-50"
                      title="Refresh analysis"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${summaryLoading ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                  {summaryLoading ? (
                    <div className="space-y-2 py-1">
                      <div className="h-3.5 bg-white/5 rounded animate-pulse w-full" />
                      <div className="h-3.5 bg-white/5 rounded animate-pulse w-4/5" />
                    </div>
                  ) : summaryError ? (
                    <p className="text-xs text-[#7C8AA3]">
                      Couldn't generate the AI brief.{" "}
                      <button onClick={onRefresh} className="text-cyan-400 hover:underline">
                        Retry
                      </button>
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed text-[#D5DBE8] font-normal">{summary}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Operational Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {statCards.map((s) => (
              <StatCard key={s.key} {...s} />
            ))}
          </div>

          {/* LARGE PROMINENT LIVE GIS DISASTER MAP */}
          <DisasterMap affectedLocations={affectedLocations} missingDataMode={missingDataMode} />

          {/* Historical & Synthetic Event Replay Engine */}
          <EventReplayBar
            timelineFrames={timelineFrames}
            currentFrameIndex={currentFrameIndex}
            setCurrentFrameIndex={setCurrentFrameIndex}
            missingDataMode={missingDataMode}
            setMissingDataMode={setMissingDataMode}
            confidenceScore={disasterInfo.confidence || 94}
          />

          {/* Main Grid: Disaster Timeline & Affected Stations Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Disaster Escalation Timeline */}
            <div className="lg:col-span-7">
              <DisasterTimeline />
            </div>

            {/* Right: Affected Telemetry Stations & Field Teams */}
            <div className="lg:col-span-5 space-y-5">
              {/* Affected Telemetry Stations Summary */}
              <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4.5 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider">Telemetry Stations Grid</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                    {filteredLocations.length} ACTIVE
                  </span>
                </div>

                {/* Filter & Search Inputs */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-[#7C8AA3] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search station name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#090E1A]/90 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#E7ECF5] placeholder-[#7C8AA3] focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <select
                    value={selectedSeverityFilter}
                    onChange={(e) => setSelectedSeverityFilter(e.target.value)}
                    className="bg-[#090E1A]/90 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#7C8AA3] focus:outline-none"
                  >
                    <option value="all">All Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                  </select>
                </div>

                {/* Stations List */}
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {filteredLocations.map((loc) => {
                    const s = SEVERITY_STYLES[loc.severity] || SEVERITY_STYLES.Moderate;
                    return (
                      <div
                        key={loc.name}
                        className={`flex items-start gap-3 rounded-xl border-l-2 ${s.border} bg-[#090E1A]/80 p-3 transition-all hover:bg-[#121B2D] border border-white/5`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 justify-between">
                            <span className="text-xs font-semibold text-[#E7ECF5] truncate">{loc.name}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${s.bg} ${s.text} font-semibold`}>
                              {loc.severity}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8B96AC] mt-1 line-clamp-2">{loc.note}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resource Stock Gauges */}
              <div className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4.5 shadow-xl">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-[#E7ECF5] uppercase tracking-wider">Resource Logistics Stock</h3>
                </div>
                <div className="space-y-4">
                  {resources.map((r) => {
                    const pct = Math.round((r.available / r.total) * 100);
                    const barColor = pct < 30 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : pct < 60 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";
                    return <ResourceRow key={r.name} resource={r} pct={pct} barColor={barColor} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GIS Map Explorer */}
      {activeTab === "gis" && (
        <div className="space-y-6 animate-fade-in">
          <DisasterMap affectedLocations={affectedLocations} missingDataMode={missingDataMode} />
        </div>
      )}

      {/* TAB CONTENT: Hydrological Telemetry Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6 animate-fade-in">
          <TelemetryAnalyticsChart />
        </div>
      )}

      {/* Post-Event Evaluation Benchmark Modal */}
      <EvaluationReportModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        metrics={evaluationMetrics}
      />
    </div>
  );
}

function ResourceRow({ resource, pct, barColor }) {
  const Icon = ICON_MAP[resource.icon] || Package;
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#090E1A] border border-white/5 flex items-center justify-center shrink-0 shadow-inner">
        <Icon className="w-4 h-4 text-[#7C8AA3]" />
      </div>
      <div className="w-28 shrink-0 text-xs text-[#E7ECF5] font-medium">{resource.name}</div>
      <div className="flex-1 h-2 rounded-full bg-[#090E1A] overflow-hidden border border-white/5">
        <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <div className="w-24 shrink-0 text-right text-[11px] font-mono text-[#8B96AC] font-semibold">
        {resource.available.toLocaleString()}/{resource.total.toLocaleString()} {resource.unit}
      </div>
    </div>
  );
}
