import { useState } from "react";
import {
  Tent,
  Users,
  Shield,
  HeartHandshake,
  Coins,
  CheckCircle2,
  Award,
  Clock,
  ArrowRight,
  Truck,
  Droplet,
  HeartPulse,
  Phone,
  PhoneCall,
  Activity,
  AlertCircle,
  Building,
  Ambulance,
  Search,
} from "lucide-react";
import { GOLAGHAT_HOSPITALS, GOLAGHAT_EMERGENCY_CONTACTS } from "./disasterData.js";

export default function ReliefRecoverySection({
  relief = {},
  health = {},
  economic = {},
  recovery = {},
  hospitals = GOLAGHAT_HOSPITALS,
  emergencyContacts = GOLAGHAT_EMERGENCY_CONTACTS,
}) {
  const [activeSubTab, setActiveSubTab] = useState("all"); // all | hospitals | contacts | camps | dbt
  const [hospitalSearch, setHospitalSearch] = useState("");

  const filteredHospitals = (hospitals && hospitals.length > 0 ? hospitals : GOLAGHAT_HOSPITALS).filter(
    (h) =>
      h.name.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      h.location.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      h.type.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      h.medicalServices.toLowerCase().includes(hospitalSearch.toLowerCase())
  );

  const contactList = emergencyContacts && emergencyContacts.length > 0 ? emergencyContacts : GOLAGHAT_EMERGENCY_CONTACTS;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. SECTION HEADER */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">HEALTH & EMERGENCY CONTACTS • RELIEF OPERATIONS</h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              DISTRICT HEALTH SOCIETY & DDMA
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] mt-1">
            Verified hospitals, direct emergency helplines, relief shelter occupancy, and Gratuitous Relief (GR) DBT tracking.
          </p>
        </div>

        {/* SUBTAB FILTER BUTTONS */}
        <div className="flex items-center gap-1.5 bg-[#090E1A] border border-white/10 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveSubTab("all")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === "all" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            All Health & Relief
          </button>
          <button
            onClick={() => setActiveSubTab("hospitals")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === "hospitals" ? "bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            Hospitals ({filteredHospitals.length})
          </button>
          <button
            onClick={() => setActiveSubTab("contacts")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === "contacts" ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            Emergency Contacts ({contactList.length})
          </button>
          <button
            onClick={() => setActiveSubTab("camps")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === "camps" ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30" : "text-[#7C8AA3] hover:text-white"
            }`}
          >
            Relief Camps ({relief.activeCamps || 48})
          </button>
        </div>
      </div>

      {/* 2. IMPORTANT EMERGENCY CONTACTS PANEL (COMPACT & PROMINENT) */}
      {(activeSubTab === "all" || activeSubTab === "contacts") && (
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                  IMPORTANT DISTRICT EMERGENCY CONTACTS & HELPLINES
                </h3>
                <p className="text-[11px] text-[#8B96AC]">Direct 24/7 verified emergency numbers for flood rescue, medical evacuation & control rooms</p>
              </div>
            </div>

            <span className="text-[10.5px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full font-bold">
              TAP TO CALL DIRECTLY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {contactList.map((contact) => {
              const isCritical = contact.priority === "CRITICAL";

              return (
                <div
                  key={contact.id}
                  className={`p-3.5 rounded-xl bg-[#090E1A] border transition-all flex flex-col justify-between space-y-2.5 ${
                    isCritical ? "border-rose-500/30 hover:border-rose-500/50" : "border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white text-xs leading-snug">{contact.name}</span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          isCritical
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-cyan-400 font-mono">{contact.organization}</div>
                    <p className="text-[11px] text-[#8B96AC] leading-tight">{contact.purpose}</p>
                  </div>

                  {/* PHONE NUMBER CALL BUTTON */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{contact.phone}</span>
                    </a>

                    {contact.tollFree && (
                      <a
                        href={`tel:${contact.tollFree.replace(/[^0-9+]/g, "")}`}
                        className="py-1.5 px-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-mono font-bold flex items-center gap-1"
                        title="Toll-Free Helpline"
                      >
                        <span>TF: {contact.tollFree}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[10.5px] font-mono text-[#7C8AA3] flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
            <span>Sources: DDMA Golaghat Official Registry, Assam Police, ASDMA & NHM Assam</span>
            <span>Emergency Status: Continuously Monitored</span>
          </div>
        </div>
      )}

      {/* 3. DEDICATED HOSPITALS & MEDICAL FACILITIES PANEL */}
      {(activeSubTab === "all" || activeSubTab === "hospitals") && (
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                  NEARBY HOSPITALS & EMERGENCY MEDICAL FACILITIES
                </h3>
                <p className="text-[11px] text-[#8B96AC]">Verified referral hospitals, Sub-Divisional Civil Hospitals, and First Referral Units (FRUs)</p>
              </div>
            </div>

            {/* Hospital Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7C8AA3] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search hospital, service, circle..."
                value={hospitalSearch}
                onChange={(e) => setHospitalSearch(e.target.value)}
                className="bg-[#090E1A] border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#E7ECF5] placeholder-[#7C8AA3] focus:outline-none focus:border-cyan-500/50 w-52 sm:w-64"
              />
            </div>
          </div>

          {/* HOSPITAL CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredHospitals.map((hosp) => {
              const isOperational = hosp.status === "OPERATIONAL";
              const isLimited = hosp.status === "LIMITED SERVICES";
              const statusBg = isOperational
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : isLimited
                ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                : "bg-rose-500/15 text-rose-400 border-rose-500/30";

              const hasEmergencyPhone = hosp.emergencyContact && hosp.emergencyContact !== "Contact unavailable";
              const hasMainPhone = hosp.mainContact && hosp.mainContact !== "Contact unavailable";

              return (
                <div
                  key={hosp.id}
                  className="p-4 rounded-2xl bg-[#090E1A] border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {/* Top Name & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm leading-snug">{hosp.name}</h4>
                        <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{hosp.type} • {hosp.location}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${statusBg}`}>
                        ● {hosp.status}
                      </span>
                    </div>

                    {/* Beds & Ambulance */}
                    <div className="grid grid-cols-2 gap-2 bg-[#060A12] p-2.5 rounded-xl border border-white/5 text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-[#7C8AA3]">BED CAPACITY</div>
                        <div className="text-white font-bold">
                          {hosp.bedCapacity} Total ({hosp.bedsAvailable} Available)
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#7C8AA3]">AMBULANCE FLEET</div>
                        <div className="text-pink-400 font-bold truncate">{hosp.ambulanceAvailability}</div>
                      </div>
                    </div>

                    {/* Medical Services */}
                    <div>
                      <div className="text-[10.5px] font-mono text-[#8B96AC]">SPECIALIZED FLOOD MEDICAL SERVICES:</div>
                      <p className="text-xs text-[#D5DBE8] leading-relaxed mt-0.5">{hosp.medicalServices}</p>
                    </div>
                  </div>

                  {/* Phone Numbers & Footer */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {hasEmergencyPhone ? (
                          <a
                            href={`tel:${hosp.emergencyContact.replace(/[^0-9+]/g, "")}`}
                            className="py-1 px-2.5 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-300 hover:bg-pink-500/25 transition-all text-xs font-mono font-bold flex items-center gap-1.5"
                          >
                            <PhoneCall className="w-3 h-3 text-pink-400" />
                            <span>Emergency: {hosp.emergencyContact}</span>
                          </a>
                        ) : (
                          <span className="py-1 px-2.5 rounded-lg bg-white/5 border border-white/5 text-[#7C8AA3] text-xs font-mono">
                            Emergency: Contact unavailable
                          </span>
                        )}

                        {hasMainPhone && hosp.mainContact !== hosp.emergencyContact && (
                          <a
                            href={`tel:${hosp.mainContact.replace(/[^0-9+]/g, "")}`}
                            className="py-1 px-2 rounded-lg bg-white/5 border border-white/10 text-[#E7ECF5] hover:bg-white/10 transition-all text-xs font-mono flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Main: {hosp.mainContact}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#7C8AA3]">
                      <span>Source: {hosp.source}</span>
                      <span>Last updated: {hosp.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. RELIEF CAMPS & EMERGENCY LOGISTICS */}
      {(activeSubTab === "all" || activeSubTab === "camps") && (
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Tent className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono">Relief Camp Operations & Inmate Telemetry</h3>
                <p className="text-[11px] text-[#8B96AC]">Managed by Sub-Divisional and Circle Administration, Golaghat</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
              {relief.activeCamps || 48} CAMPS OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
              <div className="text-[11px] font-mono text-[#8B96AC]">ACTIVE RELIEF CAMPS</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                {relief.activeCamps || 48} camps
              </div>
              <div className="text-[10px] text-[#7C8AA3] font-mono">+{relief.distributionCentres || 56} distribution centres</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090E1A] border border-cyan-500/20 space-y-1">
              <div className="text-[11px] font-mono text-cyan-400">INMATES SHELTERED</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                {(relief.inmatesSheltered || 16500).toLocaleString()}
              </div>
              <div className="text-[10px] text-[#7C8AA3] font-mono">Full daily doctor rounds</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
              <div className="text-[11px] font-mono text-[#8B96AC]">CITIZENS EVACUATED</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {(relief.citizensEvacuated || 8400).toLocaleString()}
              </div>
              <div className="text-[10px] text-[#7C8AA3] font-mono">{relief.rescueBoatsActive || 38} rescue boats active</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090E1A] border border-white/5 space-y-1">
              <div className="text-[11px] font-mono text-[#8B96AC]">RATIONS DISPATCHED</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                {(relief.foodPacketsDispatched || 68000).toLocaleString()} pkts
              </div>
              <div className="text-[10px] text-[#7C8AA3] font-mono">{(relief.waterPouchesDistributed || 280000).toLocaleString()} water pouches</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. DAMAGE ASSESSMENT & DBT RECOVERY TRACKING */}
      {(activeSubTab === "all" || activeSubTab === "dbt") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ECONOMIC LOSS AUDIT */}
          <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">District Damage Loss Audit</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                PRELIMINARY ESTIMATE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090E1A] border border-rose-500/20 space-y-1">
              <div className="text-[11px] font-mono text-rose-300">TOTAL ESTIMATED LOSS (GOLAGHAT DISTRICT)</div>
              <div className="text-3xl font-bold font-mono text-white">₹{economic.estimatedTotalCr || 242.50} Crore</div>
              <div className="text-[10px] text-[#7C8AA3] font-mono">
                Confirmed Audit: ₹{economic.confirmedLossCr || 72.40} Cr | Ongoing Assessment: ₹{economic.underAssessmentCr || 170.10} Cr ({economic.assessmentCompletionPct || 72}%)
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded-lg bg-[#090E1A] border border-white/5">
                <span className="text-[#B7C0D1]">Infrastructure (PWD Roads & Bridges)</span>
                <span className="font-bold text-white">₹{economic.infrastructureDamageCr || 94.00} Cr</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-[#090E1A] border border-white/5">
                <span className="text-[#B7C0D1]">Agriculture & Standing Crops</span>
                <span className="font-bold text-amber-300">₹{economic.agricultureDamageCr || 68.00} Cr</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-[#090E1A] border border-white/5">
                <span className="text-[#B7C0D1]">Housing & Private Property</span>
                <span className="font-bold text-cyan-300">₹{economic.housingDamageCr || 38.50} Cr</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-[#090E1A] border border-white/5">
                <span className="text-[#B7C0D1]">Public Utilities & Power Substations</span>
                <span className="font-bold text-white">₹{economic.publicPropertyDamageCr || 26.00} Cr</span>
              </div>
            </div>
          </div>

          {/* RECOVERY & DBT TRACKER */}
          <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">Rehabilitation & DBT Grant Tracker</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                REHABILITATION ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090E1A] border border-emerald-500/20 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-300 font-bold">DISTRICT RECOVERY PROGRESS</span>
                <span className="text-white font-bold">{recovery.recoveryProgressScorePct || 46.5}% Completed</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#060A12] overflow-hidden border border-white/5">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${recovery.recoveryProgressScorePct || 46.5}%` }} />
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#090E1A] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Gratuitous Relief (GR) via DBT</div>
                  <div className="text-[11px] text-[#7C8AA3] font-mono">Direct transfer to flood-hit bank accounts</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{(recovery.familiesBenefitedDBT || 38500).toLocaleString()} Families</div>
                  <div className="text-[10px] text-[#8B96AC]">₹{recovery.grReliefDisbursedCr || 14.80} Cr Disbursed</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090E1A] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">PMAY-G Reconstruction Sanctioned</div>
                  <div className="text-[11px] text-[#7C8AA3] font-mono">Severely damaged houses housing scheme</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-cyan-300">{(recovery.housesSanctionedPMAYGReconstruction || 680).toLocaleString()} Houses</div>
                  <div className="text-[10px] text-amber-300">Phase 1 Approved</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090E1A] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">PWD Road Restorations Completed</div>
                  <div className="text-[11px] text-[#7C8AA3] font-mono">Temporary boulder & culvert works</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{recovery.roadsTemporaryRestoredCount || 14} Sections</div>
                  <div className="text-[10px] text-emerald-400">+{recovery.bridgesRestoredWithBaileyPontoon || 1} Bailey Bridge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
