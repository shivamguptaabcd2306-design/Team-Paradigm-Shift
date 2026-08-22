import { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  Waves,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Radio,
  Activity,
  Package,
  ShieldAlert,
  Bell,
  MapPin,
  Compass,
  HeartPulse,
} from "lucide-react";

import TabButton from "./components/TabButton.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DisasterMap from "./components/DisasterMap.jsx";
import Assistant from "./components/Assistant.jsx";
import DisasterReport from "./components/DisasterReport.jsx";
import ResourceOperations from "./components/ResourceOperations.jsx";
import AlertsManager from "./components/AlertsManager.jsx";

import { ROLES } from "./data/roles.js";
import { INITIAL_ALERTS } from "./components/disasterData.js";
import { useSituationData } from "./hooks/useSituationData.js";

import {
  fetchSummary,
  fetchDisasterReport,
  sendChatMessage,
} from "./api/client.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [now, setNow] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(INITIAL_ALERTS.length);

  const {
    data,
    reports,
    loading,
    error: situationError,
  } = useSituationData();

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(false);

  const [disasterReport, setDisasterReport] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(false);

  const [role, setRole] = useState("district_magistrate");

  const [conversations, setConversations] = useState(() => {
    const init = {};
    Object.keys(ROLES).forEach((r) => {
      init[r] = [
        {
          role: "assistant",
          content: ROLES[r].intro,
        },
      ];
    });
    return init;
  });

  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const feedEndRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [reports]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations, role, chatLoading]);

  const generateSummary = useCallback(async () => {
    setSummaryLoading(true);
    setSummaryError(false);

    try {
      const text = await fetchSummary(reports);
      setSummary(text);
    } catch (e) {
      console.error("Summary generation failed:", e);
      setSummaryError(true);
    } finally {
      setSummaryLoading(false);
    }
  }, [reports]);

  const generateDisasterReport = useCallback(async () => {
    setReportLoading(true);
    setReportError(false);

    try {
      const text = await fetchDisasterReport(reports || []);
      setDisasterReport(text);
    } catch (e) {
      console.error("Disaster report generation failed:", e);
      setReportError(true);
    } finally {
      setReportLoading(false);
    }
  }, [reports]);

  useEffect(() => {
    if (data && !summary && !summaryLoading) {
      generateSummary();
    }
  }, [data, summary, summaryLoading, generateSummary]);

  useEffect(() => {
    if (activeTab === "report" && data && !disasterReport && !reportLoading) {
      generateDisasterReport();
    }
  }, [activeTab, data, disasterReport, reportLoading, generateDisasterReport]);

  const sendMessage = async (text) => {
    const query = text ?? chatInput;

    if (!query.trim() || chatLoading) {
      return;
    }

    const userMsg = {
      role: "user",
      content: query.trim(),
    };

    const history = conversations[role] || [];
    const nextHistory = [...history, userMsg];

    setConversations((prev) => ({
      ...prev,
      [role]: nextHistory,
    }));

    setChatInput("");
    setChatLoading(true);

    try {
      const reply = await sendChatMessage(
        role,
        nextHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        reports
      );

      setConversations((prev) => ({
        ...prev,
        [role]: [
          ...prev[role],
          {
            role: "assistant",
            content: reply,
          },
        ],
      }));
    } catch (e) {
      console.error("Chat request failed:", e);

      setConversations((prev) => ({
        ...prev,
        [role]: [
          ...prev[role],
          {
            role: "assistant",
            content:
              "I couldn't reach the AI service just now. Please try again in a moment.",
            error: true,
          },
        ],
      }));
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#060A12] via-[#0B1324] to-[#070D18] text-[#E7ECF5] font-sans relative overflow-x-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <header className="glass-header sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* LOGO & REFINED DISTRICT BRANDING */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Waves className="w-5 h-5 text-cyan-400" strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">GOLAGHAT DISTRICT</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  DEOC • ASDMA
                </span>
              </div>
              <div className="text-[11px] text-[#8B96AC] font-mono mt-0.5 flex items-center gap-2">
                <span>Emergency Operations Centre</span>
                <span className="text-[#3A4560] hidden sm:inline">•</span>
                <span className="text-cyan-300 font-semibold hidden sm:inline">Flood Situation Monitoring • District Level</span>
              </div>
            </div>
          </div>

          {/* STATUS BADGES & NOTIFICATIONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">DHANSIRI: 77.94m (MONITORED)</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-semibold">DEOC ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F172A]/80 border border-white/5 text-xs text-[#B7C0D1] font-mono tabular-nums shadow-inner">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>

            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadAlerts(0);
                }}
                className="p-2 rounded-xl bg-[#0F172A]/80 border border-white/10 text-[#B7C0D1] hover:text-white transition-colors relative"
                title="View Emergency Directives"
              >
                <Bell className="w-4 h-4 text-cyan-400" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadAlerts}
                  </span>
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0F172A] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl z-50 space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white uppercase font-mono">DDMA Golaghat Directives</span>
                    <button onClick={() => setShowNotifications(false)} className="text-[#7C8AA3] hover:text-white">✕</button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {INITIAL_ALERTS.map((alt) => (
                      <div key={alt.id} className="p-2.5 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className={alt.severity === "CRITICAL" ? "text-rose-400" : "text-amber-400"}>{alt.title}</span>
                          <span className="text-[10px] text-[#7C8AA3] font-mono">{alt.timestamp}</span>
                        </div>
                        <div className="text-[11px] text-[#D5DBE8]">{alt.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2 pt-1 flex gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={LayoutDashboard}
            label="Situation Dashboard"
          />

          <TabButton
            active={activeTab === "map"}
            onClick={() => setActiveTab("map")}
            icon={Compass}
            label="Operations Map"
          />

          <TabButton
            active={activeTab === "assistant"}
            onClick={() => setActiveTab("assistant")}
            icon={MessageSquare}
            label="Intelligence AI"
          />

          <TabButton
            active={activeTab === "report"}
            onClick={() => setActiveTab("report")}
            icon={FileText}
            label="Situation Report"
          />

          <TabButton
            active={activeTab === "resources"}
            onClick={() => setActiveTab("resources")}
            icon={Package}
            label="Relief Logistics"
          />

          <TabButton
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
            icon={ShieldAlert}
            label="Alerts & Directives"
          />
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-xs font-mono text-[#7C8AA3]">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-panel">
              <Activity className="w-5 h-5 text-cyan-400 animate-spin" />
              Loading Golaghat DEOC Operational Telemetry Grid...
            </div>
          </div>
        ) : situationError || !data ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono space-y-2 max-w-xl mx-auto text-center">
            <p className="font-bold text-rose-400 text-sm">Backend API Connection Unavailable</p>
            <p>Please ensure the Node.js Express server in <code className="text-rose-200 bg-rose-900/40 px-1.5 py-0.5 rounded">/backend</code> is running on port 4000.</p>
          </div>
        ) : activeTab === "dashboard" ? (
          <Dashboard
            disasterInfo={data.disasterInfo}
            kpiCards={data.kpiCards}
            circlesData={data.circlesData}
            humanitarianData={data.humanitarianData}
            housingData={data.housingData}
            infrastructureData={data.infrastructureData}
            agricultureData={data.agricultureData}
            riverGaugeData={data.riverGaugeData}
            reliefOperationsData={data.reliefOperationsData}
            healthServicesData={data.healthServicesData}
            hospitalsData={data.hospitalsData}
            emergencyContactsData={data.emergencyContactsData}
            economicLossData={data.economicLossData}
            recoveryData={data.recoveryData}
            affectedLocations={data.affectedLocations}
            resources={data.resources}
            summary={summary}
            summaryLoading={summaryLoading}
            summaryError={summaryError}
            onRefresh={generateSummary}
            evaluationMetrics={data.evaluationMetrics}
            timelineFrames={data.timelineFrames}
          />
        ) : activeTab === "map" ? (
          <div className="space-y-4 animate-fade-in">
            <DisasterMap
              title="OPERATIONAL INUNDATION & INFRASTRUCTURE MAP"
              subtitle="Full-screen GIS console: Multi-base layer switcher, NRSC Inundation SAR, CWC Gauges & Hospitals"
              height="700px"
            />
          </div>
        ) : activeTab === "assistant" ? (
          <Assistant
            role={role}
            setRole={setRole}
            reports={reports}
            feedEndRef={feedEndRef}
            messages={conversations[role]}
            chatLoading={chatLoading}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendMessage={sendMessage}
            chatEndRef={chatEndRef}
          />
        ) : activeTab === "report" ? (
          <DisasterReport
            disasterInfo={data.disasterInfo}
            circlesData={data.circlesData}
            riverGaugeData={data.riverGaugeData}
            humanitarianData={data.humanitarianData}
            housingData={data.housingData}
            infrastructureData={data.infrastructureData}
            agricultureData={data.agricultureData}
            reliefOperationsData={data.reliefOperationsData}
            economicLossData={data.economicLossData}
            recoveryData={data.recoveryData}
            hospitalsData={data.hospitalsData}
            emergencyContactsData={data.emergencyContactsData}
            evaluationMetrics={data.evaluationMetrics}
            report={disasterReport}
            reportLoading={reportLoading}
            reportError={reportError}
            onRefresh={generateDisasterReport}
          />
        ) : activeTab === "resources" ? (
          <ResourceOperations resources={data.resources} />
        ) : (
          <AlertsManager />
        )}
      </main>
    </div>
  );
}