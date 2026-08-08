import { Radio, Sparkles, Send, MapPin } from "lucide-react";
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

  return (
    <div className="space-y-4">
      {/* Role selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(ROLES).map(([key, r]) => {
          const active = key === role;
          const acc = ROLE_ACCENT[r.accent];
          const Icon = r.icon;
          return (
            <button
              key={key}
              onClick={() => setRole(key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-[13px] font-medium transition-colors ${
                active ? `${acc.activeBg} ${acc.text} ${acc.border}` : "bg-[#111826] text-[#7C8AA3] border-[#1B2434] hover:text-[#B7C0D1]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {r.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-232px)] min-h-[440px]">
        {/* Live data feed */}
        <div className="bg-[#111826] border border-[#1B2434] rounded-xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1B2434]">
            <Radio className="w-4 h-4 text-cyan-400" />
            <h3 className="text-[13px] font-semibold text-[#B7C0D1]">Live Data Feed</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
            {reports.map((r, i) => {
              const relevant = r.source === roleInfo.matchesSource;
              return (
                <div
                  key={i}
                  className={`text-[12px] bg-[#0D1420] border rounded-lg px-2.5 py-2 ${
                    relevant ? `border-transparent ring-1 ${ROLE_ACCENT[roleInfo.accent].ring}` : "border-[#1B2434]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-[#7C8AA3] mb-1">
                    <span className={relevant ? roleAccent.text : "text-cyan-400/80"}>{r.source}</span>
                    <span>{r.time}</span>
                  </div>
                  <div className="text-[#B7C0D1] leading-snug">{r.message}</div>
                  <div className="flex items-center gap-1 mt-1 text-[10.5px] text-[#5C6980]">
                    <MapPin className="w-3 h-3" /> {r.location}
                  </div>
                </div>
              );
            })}
            <div ref={feedEndRef} />
          </div>
        </div>

        {/* Chat */}
        <div className="bg-[#111826] border border-[#1B2434] rounded-xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1B2434]">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-[13px] font-semibold text-[#B7C0D1]">Assistant — {roleInfo.label} view</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} content={m.content} error={m.error} accent={roleInfo.accent} />
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-[12.5px] text-[#7C8AA3] pl-1">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                Analyzing situation data...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {roleInfo.suggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={chatLoading}
                className="text-[11.5px] px-2.5 py-1.5 rounded-full bg-[#0D1420] border border-[#1B2434] text-[#8B96AC] hover:text-[#E7ECF5] hover:border-cyan-500/40 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="border-t border-[#1B2434] p-3 flex items-center gap-2"
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask as ${roleInfo.label}...`}
              className="flex-1 bg-[#0D1420] border border-[#1B2434] rounded-lg px-3.5 py-2.5 text-[13px] text-[#E7ECF5] placeholder-[#5C6980] outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
