import { Radio, Sparkles, Send, MapPin, Route, Building2, Package, Compass, ShieldAlert, Waves, Home, Tent, HeartPulse, PhoneCall } from "lucide-react";
import ChatBubble from "./ChatBubble.jsx";
import { ROLES } from "../data/roles.js";
import { ROLE_ACCENT } from "../data/styles.js";

export default function Assistant({
  role = "district_magistrate",
  setRole,
  reports = [],
  feedEndRef,
  messages = [],
  chatLoading = false,
  chatInput = "",
  setChatInput,
  sendMessage,
  chatEndRef,
}) {
  const roleInfo = ROLES[role] || ROLES.district_magistrate;
  const roleAccent = ROLE_ACCENT[roleInfo?.accent || "cyan"] || ROLE_ACCENT.cyan;

  const quickActions = [
    {
      label: "60-Sec Briefing",
      query: "Give me a 60-second operational situation briefing for Golaghat district.",
      icon: Sparkles,
    },
    {
      label: "Nearby Hospitals",
      query: "Which hospitals and medical facilities are available in Golaghat and Bokakhat with emergency contacts?",
      icon: HeartPulse,
    },
    {
      label: "Emergency Helplines",
      query: "What are the official emergency contacts and control room phone numbers for Golaghat flood response?",
      icon: PhoneCall,
    },
    {
      label: "Dhansiri River Stage",
      query: "What is the current water level and trend of Dhansiri at Numaligarh and Golaghat Town?",
      icon: Waves,
    },
    {
      label: "Roads & NH-715",
      query: "What is the status of the NH-715 Kaziranga corridor and which roads or bridges are closed in Golaghat?",
      icon: Route,
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header & Role Selector */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4.5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">GOLAGHAT FLOOD INTELLIGENCE</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                DDMA / ASDMA GROUNDED
              </span>
            </div>
            <p className="text-xs text-[#8B96AC]">District Emergency Operations decision support engine with verified telemetry & hospitals</p>
          </div>
        </div>

        {/* Stakeholder Role Buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ROLES).map(([key, r]) => {
            const active = key === role;
            const acc = ROLE_ACCENT[r.accent] || ROLE_ACCENT.cyan;
            const Icon = r.icon || ShieldAlert;
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
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-230px)] min-h-[500px]">
        {/* Live Incident Stream */}
        <div className="bg-[#0F172A]/85 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090E1A]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7ECF5]">
              <Radio className="w-4 h-4 text-cyan-400" /> Operational Incident Feed
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">DEOC LOG</span>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
            {reports.map((r, i) => {
              const relevant = r.source === roleInfo.matchesSource;
              return (
                <div
                  key={i}
                  className={`text-xs bg-[#090E1A]/90 border rounded-xl p-3 transition-all ${
                    relevant ? `border-transparent ring-1 ${roleAccent.ring}` : "border-white/5"
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
        <div className="bg-[#0F172A]/85 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090E1A]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7ECF5]">
              <Sparkles className="w-4 h-4 text-violet-400" /> Intelligence Query Engine — {roleInfo.label} Context
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
              VERIFIED TELEMETRY & CONTACTS
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#090E1A]/60">
            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} content={m.content} error={m.error} accent={roleInfo.accent} />
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pl-1 py-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                Querying verified DDMA Golaghat bulletins, hospital beds, and emergency helplines...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Query Suggestions */}
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

          {/* Chat Input Form */}
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
              placeholder={`Ask anything about Golaghat hospitals, emergency helplines, Dhansiri gauge, relief camps, or road cuts...`}
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
