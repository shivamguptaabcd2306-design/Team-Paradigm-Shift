import { Radio, Sparkles, Send, MapPin, Route, Building2, Package, Compass } from "lucide-react";
import ChatBubble from "./ChatBubble.jsx";
import { ROLES } from "../data/roles.js";
import { ROLE_ACCENT } from "../data/styles.js";

export default function Assistant({
  role,
  setRole,
  reports,
  feedEndRef,
  messages,
  chatLoading,
  chatInput,
  setChatInput,
  sendMessage,
  chatEndRef,
}) {
  const roleInfo = ROLES[role];
  const roleAccent = ROLE_ACCENT[roleInfo.accent];

  const quickActions = [
    { label: "Show Blocked Roads", query: "What are the blocked roads and critical obstructions in Dhemaji?", icon: Route },
    { label: "Severe Building Damage", query: "List all severely damaged buildings and immediate rescue priorities.", icon: Building2 },
    { label: "Resource Readiness", query: "What is the current stock of rescue boats, ambulances, and food rations?", icon: Package },
    { label: "Evacuation Routing", query: "Recommend the best clear evacuation routes for Sector 4.", icon: Compass },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header & Role Selector */}
      <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4.5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">AI Decision Support & Stakeholder Assistant</h2>
            <p className="text-xs text-[#8B96AC]">Role-tailored operational guidance and real-time query answering</p>
          </div>
        </div>

        {/* Stakeholder Role Buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ROLES).map(([key, r]) => {
            const active = key === role;
            const acc = ROLE_ACCENT[r.accent];
            const Icon = r.icon;
            return (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? `${acc.activeBg} ${acc.text} ${acc.border} shadow-[0_0_12px_rgba(6,182,212,0.15)]`
                    : "bg-[#090E1A] text-[#7C8AA3] border border-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Live Feed & Chat Window */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-230px)] min-h-[480px]">
        {/* Live Incident Stream */}
        <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090E1A]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7ECF5]">
              <Radio className="w-4 h-4 text-cyan-400" /> Live Field Feed
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">STREAMING</span>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
            {reports.map((r, i) => {
              const relevant = r.source === roleInfo.matchesSource;
              return (
                <div
                  key={i}
                  className={`text-xs bg-[#090E1A]/90 border rounded-xl p-3 transition-all ${
                    relevant ? `border-transparent ring-1 ${ROLE_ACCENT[roleInfo.accent].ring}` : "border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-[#7C8AA3] mb-1">
                    <span className={relevant ? roleAccent.text : "text-cyan-400 font-semibold"}>{r.source}</span>
                    <span>{r.time}</span>
                  </div>
                  <div className="text-[#D5DBE8] leading-snug">{r.message}</div>
                  <div className="flex items-center gap-1 mt-1.5 text-[10.5px] text-cyan-300 font-mono">
                    <MapPin className="w-3 h-3 text-cyan-400" /> {r.location}
                  </div>
                </div>
              );
            })}
            <div ref={feedEndRef} />
          </div>
        </div>

        {/* AI Chat Window */}
        <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090E1A]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7ECF5]">
              <Sparkles className="w-4 h-4 text-violet-400" /> Operational AI Assistant — {roleInfo.label} View
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
              STAKEHOLDER SYNTHESIS ACTIVE
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#090E1A]/60">
            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} content={m.content} error={m.error} accent={roleInfo.accent} />
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#7C8AA3] pl-1">
                <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
                Synthesizing multi-agency telemetry data...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Command Suggestions */}
          <div className="px-4 py-2 border-t border-white/5 bg-[#090E1A] flex flex-wrap gap-2">
            {quickActions.map((qa) => {
              const QIcon = qa.icon;
              return (
                <button
                  key={qa.label}
                  onClick={() => sendMessage(qa.query)}
                  disabled={chatLoading}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[#B7C0D1] hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <QIcon className="w-3.5 h-3.5 text-cyan-400" />
                  {qa.label}
                </button>
              );
            })}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="border-t border-white/10 p-3 bg-[#090E1A] flex items-center gap-2"
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask as ${roleInfo.label}...`}
              className="flex-1 bg-[#060A12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#7C8AA3] outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
