import { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Filter, Clock, MapPin, Bell, Check, Plus } from "lucide-react";
import { INITIAL_ALERTS } from "./disasterData.js";

export default function AlertsManager() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSeverity, setNewSeverity] = useState("CRITICAL");
  const [newDetails, setNewDetails] = useState("");

  const handleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: `ASDMA-ALT-${Math.floor(10 + Math.random() * 90)}`,
      title: newTitle,
      severity: newSeverity,
      location: newLocation || "ASDMA State EOC (Guwahati)",
      timestamp: "22 Aug 2026 (Live)",
      source: "State Emergency Operations Centre (SEOC)",
      acknowledged: false,
      details: newDetails || "Manually broadcasted critical emergency operational directive.",
    };

    setAlerts([created, ...alerts]);
    setNewTitle("");
    setNewLocation("");
    setNewDetails("");
    setShowAddModal(false);
  };

  const filteredAlerts = alerts.filter(
    (a) => filterSeverity === "all" || a.severity.toLowerCase() === filterSeverity.toLowerCase()
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">ASSAM FLOOD 2026 — EMERGENCY ALERTS & DIRECTIVES</h2>
            <p className="text-xs text-[#8B96AC]">Official bulletins from ASDMA, Central Water Commission (CWC), and District DDMAs</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-[#090E1A] border border-white/10 p-1 rounded-xl text-xs font-mono">
            {["all", "critical", "high", "moderate"].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  filterSeverity === sev
                    ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                    : "text-[#7C8AA3] hover:text-white"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-500/30 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Broadcast EOC Directive
          </button>
        </div>
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-3.5">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === "CRITICAL";
          const isHigh = alert.severity === "HIGH";
          const badgeStyle = isCritical
            ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
            : isHigh
            ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
            : "bg-cyan-500/20 text-cyan-400 border-cyan-500/40";

          return (
            <div
              key={alert.id}
              className={`bg-[#0F172A]/70 backdrop-blur-md border rounded-2xl p-4.5 shadow-xl transition-all ${
                alert.acknowledged ? "border-white/5 opacity-75" : "border-rose-500/30 bg-rose-950/10"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isCritical
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${badgeStyle}`}>
                        {alert.severity}
                      </span>
                      <span className="text-[11px] font-mono text-[#7C8AA3] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {alert.timestamp}
                      </span>
                    </div>

                    <div className="text-xs text-cyan-300 font-medium mt-1 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> {alert.location}
                      </span>
                      {alert.source && (
                        <span className="text-[10.5px] font-mono text-[#7C8AA3]">
                          [Source: {alert.source}]
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#D5DBE8] mt-2 leading-relaxed">{alert.details || alert.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    alert.acknowledged
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                      : "bg-white/10 border border-white/15 text-[#E7ECF5] hover:bg-white/20"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {alert.acknowledged ? "ACKNOWLEDGED" : "Acknowledge"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broadcast Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0F172A] border border-rose-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" /> Issue State EOC Operational Directive
            </h3>

            <form onSubmit={handleCreateAlert} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#8B96AC] mb-1 font-mono">DIRECTIVE TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flash Flood Evacuation Notice — Kopili River Basin"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#090E1A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8B96AC] mb-1 font-mono">SEVERITY LEVEL</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full bg-[#090E1A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MODERATE">MODERATE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8B96AC] mb-1 font-mono">DISTRICT / LOCATION</label>
                  <input
                    type="text"
                    placeholder="e.g. Sivasagar & Charaideo"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#090E1A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8B96AC] mb-1 font-mono">OPERATIONAL DETAILS / DIRECTIVES</label>
                <textarea
                  rows="3"
                  placeholder="Specific tasking directives for SDRF, DDMA, or camp logistics..."
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full bg-[#090E1A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 shadow-lg"
                >
                  Issue Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
