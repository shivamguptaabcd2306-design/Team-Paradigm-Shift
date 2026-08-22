import { Users, HeartPulse, ShieldAlert, HeartHandshake, Baby, CheckCircle2, UserCheck, Shield, Clock } from "lucide-react";

export default function HumanImpactSection({ humanitarian = {} }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECTION HEADER */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">HUMAN IMPACT & DEMOGRAPHIC AUDIT</h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
              DDMA & HEALTH SOCIETY
            </span>
          </div>
          <p className="text-xs text-[#8B96AC] mt-1">
            Demographic breakdown of Golaghat district's flood-affected population, boat evacuations, active camp inmates, and medical triage.
          </p>
        </div>

        <div className="text-right text-[11px] font-mono text-[#7C8AA3]">
          <div>District Population Affected: <b>{(humanitarian.totalAffected || 195400).toLocaleString()}</b></div>
          <div className="text-cyan-400">Casualties Confirmed: <b>{humanitarian.deathsConfirmed || 9}</b></div>
        </div>
      </div>

      {/* DEMOGRAPHIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A]/85 border border-white/10 shadow-lg space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>TOTAL AFFECTED</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{(humanitarian.totalAffected || 195400).toLocaleString()}</div>
          <div className="text-[10.5px] text-[#7C8AA3] font-mono">{(humanitarian.familiesAffected || 41200).toLocaleString()} families in 5 circles</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/85 border border-white/10 shadow-lg space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>ADULT MEN</span>
            <UserCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-300">{(humanitarian.menAffected || 95200).toLocaleString()}</div>
          <div className="text-[10.5px] text-[#7C8AA3] font-mono">48.7% of affected cohort</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/85 border border-white/10 shadow-lg space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>ADULT WOMEN</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-pink-300">{(humanitarian.womenAffected || 82100).toLocaleString()}</div>
          <div className="text-[10.5px] text-[#7C8AA3] font-mono">42.0% of affected cohort</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A]/85 border border-white/10 shadow-lg space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8B96AC]">
            <span>CHILDREN (0-14Y)</span>
            <Baby className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">{(humanitarian.childrenAffected || 18100).toLocaleString()}</div>
          <div className="text-[10.5px] text-[#7C8AA3] font-mono">Baby food & milk supplied</div>
        </div>
      </div>

      {/* CASUALTIES & EVACUATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CASUALTIES AUDIT */}
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Casualties & Missing Persons Audit</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
              ASDMA VERIFIED REGISTRY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#090E1A] border border-rose-500/30">
              <div className="text-[10.5px] font-mono text-rose-400">CONFIRMED DEATHS</div>
              <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{humanitarian.deathsConfirmed || 9}</div>
              <div className="text-[10.5px] text-[#7C8AA3] font-mono">Ex-gratia ₹4 Lakh per kin sanctioned</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090E1A] border border-emerald-500/30">
              <div className="text-[10.5px] font-mono text-emerald-400">MISSING PERSONS</div>
              <div className="text-base font-bold font-mono text-emerald-300 mt-1">{humanitarian.missingPersons || "None officially reported (0)"}</div>
              <div className="text-[10.5px] text-[#7C8AA3] font-mono">Zero unconfirmed reports</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5 text-xs text-[#B7C0D1] space-y-1">
            <div className="font-bold text-white">Ex-gratia Compensation Disbursal Status:</div>
            <p className="text-[11px] text-[#8B96AC]">
              8 out of 9 deceased victim families in Golaghat have received direct DBT ex-gratia payment of ₹4,00,000 from SDRF funds. Verification of 1 remaining case in Bokakhat circle is under final legal review.
            </p>
          </div>
        </div>

        {/* EVACUATION & MEDICAL RELIEF */}
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">Evacuations & Medical Triage</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              HEALTH MISSION ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5">
              <div className="text-[10.5px] font-mono text-[#8B96AC]">CITIZENS EVACUATED</div>
              <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{(humanitarian.evacuatedCitizens || 8400).toLocaleString()}</div>
              <div className="text-[10.5px] text-[#7C8AA3] font-mono">38 SDRF/NDRF rescue boats</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5">
              <div className="text-[10.5px] font-mono text-[#8B96AC]">PATIENTS TREATED</div>
              <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">{(humanitarian.patientsTreated || 9850).toLocaleString()}</div>
              <div className="text-[10.5px] text-[#7C8AA3] font-mono">{humanitarian.medicalTeamsDeployed || 34} mobile doctor units</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/5 text-xs text-[#B7C0D1] space-y-1">
            <div className="font-bold text-white">Camp Health Interventions:</div>
            <p className="text-[11px] text-[#8B96AC]">
              Water chlorination drives active across all 48 relief camps in Bokakhat, Golaghat, Khumtai, Dergaon, and Morangi. Over 85,000 chlorine tablets and 24,000 ORS packs distributed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
