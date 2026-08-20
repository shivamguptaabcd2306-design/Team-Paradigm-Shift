import { useState, useEffect, useRef, useCallback } from "react";
import {
  Wifi,
  Clock,
  Waves,
  LayoutDashboard,
  MessageSquare,
  FileText,
} from "lucide-react";

import TabButton from "./components/TabButton.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Assistant from "./components/Assistant.jsx";
import DisasterReport from "./components/DisasterReport.jsx";

import { ROLES } from "./data/roles.js";
import { useSituationData } from "./hooks/useSituationData.js";

import {
  fetchSummary,
  fetchDisasterReport,
  sendChatMessage,
} from "./api/client.js";

export default function App() {
  // ============================================================
  // TAB STATE
  // ============================================================

  const [activeTab, setActiveTab] = useState("dashboard");

  // ============================================================
  // CLOCK
  // ============================================================

  const [now, setNow] = useState(new Date());

  // ============================================================
  // SITUATION DATA
  // ============================================================

  const {
    data,
    reports,
    loading,
    error: situationError,
  } = useSituationData();

  // ============================================================
  // AI SUMMARY
  // ============================================================

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(false);

  // ============================================================
  // DISASTER REPORT
  // ============================================================

  const [disasterReport, setDisasterReport] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(false);

  // ============================================================
  // AI ASSISTANT
  // ============================================================

  const [role, setRole] = useState("authority");

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

  // ============================================================
  // REFS
  // ============================================================

  const feedEndRef = useRef(null);
  const chatEndRef = useRef(null);

  // ============================================================
  // CLOCK EFFECT
  // ============================================================

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(t);
  }, []);

  // ============================================================
  // SCROLL LIVE FEED
  // ============================================================

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [reports]);

  // ============================================================
  // SCROLL CHAT
  // ============================================================

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations, role, chatLoading]);

  // ============================================================
  // GENERATE AI SUMMARY
  // ============================================================

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

  // ============================================================
  // GENERATE DISASTER REPORT
  // ============================================================

  const generateDisasterReport = useCallback(async () => {
    if (!reports || reports.length === 0) {
      setReportError(true);
      return;
    }

    setReportLoading(true);
    setReportError(false);

    try {
      const text = await fetchDisasterReport(reports);

      setDisasterReport(text);
    } catch (e) {
      console.error("Disaster report generation failed:", e);
      setReportError(true);
    } finally {
      setReportLoading(false);
    }
  }, [reports]);

  // ============================================================
  // GENERATE SUMMARY WHEN DATA LOADS
  // ============================================================

  useEffect(() => {
    if (data && !summary && !summaryLoading) {
      generateSummary();
    }
  }, [data, summary, summaryLoading, generateSummary]);

  // ============================================================
  // GENERATE DISASTER REPORT WHEN REPORT TAB IS OPENED
  // ============================================================

  useEffect(() => {
    if (
      activeTab === "report" &&
      data &&
      reports &&
      reports.length > 0 &&
      !disasterReport &&
      !reportLoading
    ) {
      generateDisasterReport();
    }
  }, [
    activeTab,
    data,
    reports,
    disasterReport,
    reportLoading,
    generateDisasterReport,
  ]);

  // ============================================================
  // AI CHAT
  // ============================================================

  const sendMessage = async (text) => {
    const query = text ?? chatInput;

    if (!query.trim() || chatLoading) {
      return;
    }

    const userMsg = {
      role: "user",
      content: query.trim(),
    };

    const history = conversations[role];

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

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen w-full bg-[#0A0F1A] text-[#E7ECF5] font-sans">

      {/* ======================================================
          HEADER
      ======================================================= */}

      <header className="border-b border-[#1B2434] bg-[#0D1420]/90 backdrop-blur sticky top-0 z-20">

        {/* HEADER TOP */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/30 flex items-center justify-center shrink-0">

              <Waves
                className="w-5 h-5 text-cyan-400"
                strokeWidth={2}
              />

            </div>

            <div>

              <div className="text-[15px] font-semibold tracking-tight leading-none">
                EODSS
              </div>

              <div className="text-[11px] text-[#7C8AA3] leading-none mt-1 font-mono">
                Emergency Operations Decision Support
              </div>

            </div>

          </div>

          {/* ONLINE + CLOCK */}

          <div className="flex items-center gap-4 sm:gap-6">

            <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#7C8AA3] font-mono">

              <Wifi className="w-3.5 h-3.5 text-emerald-400" />

              <span className="text-emerald-400">
                Online
              </span>

            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-[#B7C0D1] font-mono tabular-nums">

              <Clock className="w-3.5 h-3.5" />

              {now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}

            </div>

          </div>

        </div>

        {/* ==================================================
            NAVIGATION TABS
        =================================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1">

          {/* SITUATION DASHBOARD */}

          <TabButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={LayoutDashboard}
            label="Situation Dashboard"
          />

          {/* AI ASSISTANT */}

          <TabButton
            active={activeTab === "assistant"}
            onClick={() => setActiveTab("assistant")}
            icon={MessageSquare}
            label="AI Assistant"
          />

          {/* DISASTER REPORT */}

          <TabButton
            active={activeTab === "report"}
            onClick={() => setActiveTab("report")}
            icon={FileText}
            label="Disaster Report"
          />

        </div>

      </header>

      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* LOADING */}

        {loading ? (

          <div className="text-[13px] text-[#7C8AA3] font-mono">
            Loading situation data…
          </div>

        ) : situationError || !data ? (

          /* BACKEND ERROR */

          <div className="text-[13px] text-rose-400 font-mono">

            Couldn't reach the backend API.

            Make sure the server in{" "}

            <span className="text-rose-300">
              /backend
            </span>{" "}

            is running.

          </div>

        ) : activeTab === "dashboard" ? (

          /* ==================================================
             SITUATION DASHBOARD
          =================================================== */

          <Dashboard
            disasterInfo={data.disasterInfo}
            affectedLocations={data.affectedLocations}
            statCards={data.statCards}
            resources={data.resources}
            summary={summary}
            summaryLoading={summaryLoading}
            summaryError={summaryError}
            onRefresh={generateSummary}
            evaluationMetrics={data.evaluationMetrics}
            timelineFrames={data.timelineFrames}
          />

        ) : activeTab === "assistant" ? (

          /* ==================================================
             AI ASSISTANT
          =================================================== */

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

        ) : (

          /* ==================================================
             DISASTER REPORT
          =================================================== */

          <DisasterReport
            disasterInfo={data.disasterInfo}
            affectedLocations={data.affectedLocations}
            statCards={data.statCards}
            resources={data.resources}
            report={disasterReport}
            reportLoading={reportLoading}
            reportError={reportError}
            onRefresh={generateDisasterReport}
          />

        )}

      </main>

    </div>
  );
}