import { useState } from "react";
import { Check, Edit2, X, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { ROLE_ACCENT } from "../data/styles.js";

function parseProposals(text) {
  if (!text) return { cleanText: "", proposals: [] };

  const lines = text.split("\n");
  const proposals = [];
  const normalLines = [];

  lines.forEach((line, index) => {
    if (line.trim().startsWith("PROPOSAL:")) {
      const raw = line.trim().replace(/^PROPOSAL:\s*/, "");
      const parts = raw.split("|").map((p) => p.trim());
      
      let title = "Proposed Action Directive";
      let target = "Field Response";
      let priority = "High";
      let details = raw;

      parts.forEach((part) => {
        if (part.startsWith("Target:")) target = part.replace(/^Target:\s*/, "");
        else if (part.startsWith("Priority:")) priority = part.replace(/^Priority:\s*/, "");
        else if (part.startsWith("Details:")) details = part.replace(/^Details:\s*/, "");
        else if (!part.includes(":")) title = part;
      });

      proposals.push({
        id: `prop-${index}-${Date.now()}`,
        title,
        target,
        priority,
        details,
      });
    } else {
      normalLines.push(line);
    }
  });

  return { cleanText: normalLines.join("\n").trim(), proposals };
}

export default function ChatBubble({ role, content, error, accent }) {
  const isUser = role === "user";
  const acc = ROLE_ACCENT[accent] || ROLE_ACCENT.cyan;
  const { cleanText, proposals } = parseProposals(content);

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-2`}>
      <div
        className={`max-w-[90%] sm:max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? `${acc.bg} ring-1 ${acc.ring} text-[#E7ECF5]`
            : error
            ? "bg-rose-500/10 ring-1 ring-rose-500/25 text-rose-300"
            : "bg-[#0D1420] ring-1 ring-[#1B2434] text-[#D5DBE8]"
        }`}
      >
        {cleanText || content}
      </div>

      {!isUser && proposals.length > 0 && (
        <div className="w-full max-w-[90%] sm:max-w-[85%] space-y-2 pt-1">
          {proposals.map((prop) => (
            <ProposalCard key={prop.id} proposal={prop} acc={acc} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProposalCard({ proposal, acc }) {
  const [status, setStatus] = useState("pending"); // 'pending' | 'editing' | 'approved' | 'rejected'
  const [editedData, setEditedData] = useState({
    title: proposal.title,
    target: proposal.target,
    priority: proposal.priority,
    details: proposal.details,
  });

  const handleApprove = () => {
    setStatus("approved");
  };

  const handleReject = () => {
    setStatus("rejected");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setStatus("approved_edited");
  };

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-3.5 space-y-2.5 text-[12.5px] shadow-lg">
      <div className="flex items-center justify-between gap-2 border-b border-[#1B2434] pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-violet-400" />
          <span className="font-semibold text-[#E7ECF5] text-[13px]">{editedData.title}</span>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            editedData.priority.toLowerCase().includes("critical")
              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
              : editedData.priority.toLowerCase().includes("high")
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
          }`}
        >
          {editedData.priority.toUpperCase()}
        </span>
      </div>

      {status === "editing" ? (
        <form onSubmit={handleSaveEdit} className="space-y-2 text-[12px]">
          <div>
            <label className="text-[10.5px] font-mono text-[#7C8AA3] block mb-0.5">ACTION TITLE</label>
            <input
              value={editedData.title}
              onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
              className="w-full bg-[#0D1420] border border-[#1B2434] rounded px-2.5 py-1.5 text-[#E7ECF5] outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10.5px] font-mono text-[#7C8AA3] block mb-0.5">TARGET LOCATION/UNIT</label>
              <input
                value={editedData.target}
                onChange={(e) => setEditedData({ ...editedData, target: e.target.value })}
                className="w-full bg-[#0D1420] border border-[#1B2434] rounded px-2.5 py-1.5 text-[#E7ECF5] outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-[10.5px] font-mono text-[#7C8AA3] block mb-0.5">PRIORITY</label>
              <select
                value={editedData.priority}
                onChange={(e) => setEditedData({ ...editedData, priority: e.target.value })}
                className="w-full bg-[#0D1420] border border-[#1B2434] rounded px-2.5 py-1.5 text-[#E7ECF5] outline-none focus:border-cyan-500/50"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10.5px] font-mono text-[#7C8AA3] block mb-0.5">ACTION DETAILS</label>
            <textarea
              rows={2}
              value={editedData.details}
              onChange={(e) => setEditedData({ ...editedData, details: e.target.value })}
              className="w-full bg-[#0D1420] border border-[#1B2434] rounded px-2.5 py-1.5 text-[#E7ECF5] outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded py-1.5 text-[11.5px] font-medium flex items-center justify-center gap-1 hover:bg-emerald-500/30 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Confirm & Approve Directive
            </button>
            <button
              type="button"
              onClick={() => setStatus("pending")}
              className="px-3 bg-[#0D1420] text-[#7C8AA3] border border-[#1B2434] rounded py-1.5 text-[11.5px] hover:text-[#E7ECF5]"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="space-y-1 text-[#B7C0D1]">
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#7C8AA3]">
              <span className="font-mono">Target:</span>
              <span className="text-[#E7ECF5] font-medium">{editedData.target}</span>
            </div>
            <p className="bg-[#0D1420] p-2 rounded border border-[#1B2434] text-[12px] text-[#D5DBE8]">
              {editedData.details}
            </p>
          </div>

          {status === "pending" && (
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleApprove}
                className="flex-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-lg py-1.5 text-[11.5px] font-medium flex items-center justify-center gap-1.5 hover:bg-emerald-500/25 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Approve Action
              </button>
              <button
                onClick={() => setStatus("editing")}
                className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-[11.5px] font-medium flex items-center gap-1.5 hover:bg-cyan-500/25 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Action
              </button>
              <button
                onClick={handleReject}
                className="bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-lg px-2.5 py-1.5 text-[11.5px] hover:bg-rose-500/25 transition-colors"
                title="Reject proposal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {(status === "approved" || status === "approved_edited") && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11.5px] font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                DIRECTIVE APPROVED & DISPATCHED {status === "approved_edited" ? "(MODIFIED)" : ""}
              </span>
            </div>
          )}

          {status === "rejected" && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11.5px] font-mono">
              <X className="w-4 h-4 text-rose-400 shrink-0" />
              <span>PROPOSAL REJECTED BY OPERATOR</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
