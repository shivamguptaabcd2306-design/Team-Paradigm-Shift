import { useState } from "react";
import { MapPin, Sparkles, RefreshCw, Waves, Package, Award, BarChart2 } from "lucide-react";
import StatCard from "./StatCard.jsx";
import DisasterMap from "./DisasterMap.jsx";
import DisasterTimeline from "./DisasterTimeline.jsx";
import EventReplayBar from "./EventReplayBar.jsx";
import EvaluationReportModal from "./EvaluationReportModal.jsx";
import { SEVERITY_STYLES, ICON_MAP } from "../data/styles.js";

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

  const sevStyle = SEVERITY_STYLES[disasterInfo.severity] || SEVERITY_STYLES.Critical;

  return (
    <div className="space-y-6">
      {/* Hero: Overview + AI Brief + Benchmark Report Button */}
      <div className={`relative overflow-hidden rounded-2xl bg-[#111826] border border-[#1B2434] border-l-4 ${sevStyle.border}`}>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${sevStyle.bg} ring-1 ${sevStyle.ring} flex items-center justify-center shrink-0`}>
                <Waves className={`w-6 h-6 ${sevStyle.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{disasterInfo.type}</h1>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${sevStyle.bg} ${sevStyle.text} ring-1 ${sevStyle.ring}`}>
                    {disasterInfo.severity?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[13px] text-[#8B96AC]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {disasterInfo.region}
                  </span>
                  <span className="text-[#3A4560]">•</span>
                  <span className="font-mono">{disasterInfo.status}</span>
                  <span className="text-[#3A4560]">•</span>
                  <span className="font-mono">Since {disasterInfo.startedAt}</span>
                </div>
              </div>
            </div>

            {/* Benchmark Report Modal Button (MVD #4) */}
            <button
              onClick={() => setShowEvaluationModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[12.5px] font-medium flex items-center gap-2 hover:bg-emerald-500/25 transition-colors shadow-lg"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              Post-Event Benchmark Report
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-[#1B2434]">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide text-[#7C8AA3]">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                AI Situation Brief
              </div>
              <button
                onClick={onRefresh}
                disabled={summaryLoading}
                className="p-1.5 rounded-md hover:bg-[#1B2434] text-[#7C8AA3] hover:text-[#E7ECF5] transition-colors disabled:opacity-50"
                title="Refresh analysis"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${summaryLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
            {summaryLoading ? (
              <div className="space-y-2">
                <div className="h-3.5 bg-[#1B2434] rounded animate-pulse w-full" />
                <div className="h-3.5 bg-[#1B2434] rounded animate-pulse w-4/5" />
              </div>
            ) : summaryError ? (
              <p className="text-[13.5px] text-[#7C8AA3]">
                Couldn't generate the AI brief right now.{" "}
                <button onClick={onRefresh} className="text-cyan-400 hover:underline">
                  Retry
                </button>
              </p>
            ) : (
              <p className="text-[15px] leading-relaxed text-[#D5DBE8]">{summary}</p>
            )}
          </div>
        </div>
      </div>

      {/* Historical / Synthetic Event Replay Controller (MVD #1 & MVD #2) */}
      <EventReplayBar
        timelineFrames={timelineFrames}
        currentFrameIndex={currentFrameIndex}
        setCurrentFrameIndex={setCurrentFrameIndex}
        missingDataMode={missingDataMode}
        setMissingDataMode={setMissingDataMode}
        confidenceScore={disasterInfo.confidence || 94}
      />

      {/* Key Operational Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <StatCard key={s.key} {...s} />
        ))}
      </div>

      {/* Interactive Tactical Disaster Inundation Map with Evacuation Routes */}
      <DisasterMap affectedLocations={affectedLocations} missingDataMode={missingDataMode} />

      {/* Main Grid: Disaster Timeline & Location + Resource Operational Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Disaster Escalation Timeline */}
        <div className="lg:col-span-7">
          <DisasterTimeline />
        </div>

        {/* Right: Affected Locations Summary & Resource Availability */}
        <div className="lg:col-span-5 space-y-5">
          {/* Affected Locations Summary */}
          <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3.5">
              <MapPin className="w-4 h-4 text-[#7C8AA3]" />
              <h3 className="text-[13px] font-semibold text-[#B7C0D1]">Affected Telemetry Stations Breakdown</h3>
            </div>
            <div className="space-y-2">
              {affectedLocations.map((loc) => {
                const s = SEVERITY_STYLES[loc.severity] || SEVERITY_STYLES.Moderate;
                return (
                  <div key={loc.name} className={`flex items-start gap-3 rounded-lg border-l-2 ${s.border} bg-[#0D1420] pl-3 pr-3 py-2.5`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[#E7ECF5]">{loc.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${s.bg} ${s.text}`}>{loc.severity}</span>
                      </div>
                      <div className="text-[12px] text-[#7C8AA3] mt-0.5 truncate">{loc.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resource Availability Gauges */}
          <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3.5">
              <Package className="w-4 h-4 text-[#7C8AA3]" />
              <h3 className="text-[13px] font-semibold text-[#B7C0D1]">Resource Allocation & Stock</h3>
            </div>
            <div className="space-y-3.5">
              {resources.map((r) => {
                const pct = Math.round((r.available / r.total) * 100);
                const barColor = pct < 30 ? "bg-rose-500" : pct < 60 ? "bg-amber-500" : "bg-emerald-500";
                return <ResourceRow key={r.name} resource={r} pct={pct} barColor={barColor} />;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Post-Event Evaluation Benchmark Modal (MVD #4) */}
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
      <div className="w-8 h-8 rounded-lg bg-[#0D1420] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#7C8AA3]" />
      </div>
      <div className="w-28 shrink-0 text-[12.5px] text-[#B7C0D1]">{resource.name}</div>
      <div className="flex-1 h-2 rounded-full bg-[#1B2434] overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <div className="w-24 shrink-0 text-right text-[12px] font-mono text-[#7C8AA3]">
        {resource.available.toLocaleString()}/{resource.total.toLocaleString()} {resource.unit}
      </div>
    </div>
  );
}
