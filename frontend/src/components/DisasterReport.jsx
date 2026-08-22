import { useState, useRef } from "react";
import {
  FileText,
  Printer,
  Download,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
  Waves,
  RefreshCw,
  Home,
  Wheat,
  Route,
  Anchor,
  Shield,
  Coins,
  HeartPulse,
  PhoneCall,
  Calendar,
  CloudRain,
  Truck,
  CheckCircle,
  Activity,
  Zap,
  Droplet,
  Flame,
  Info,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { GOLAGHAT_HOSPITALS, GOLAGHAT_EMERGENCY_CONTACTS } from "./disasterData.js";

// Ashoka Lion Capital Vector Emblem Component (State Emblem of India)
function AshokaEmblem({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 110" className={className} fill="currentColor">
      {/* Central Lion Head / Crown */}
      <path d="M50 8 C42 8 38 14 38 22 C38 30 42 36 50 36 C58 36 62 30 62 22 C62 14 58 8 50 8 Z" fill="#1e293b" />
      {/* Left Lion Head */}
      <path d="M34 16 C28 16 24 22 24 29 C24 35 28 40 34 40 C37 40 40 37 41 33 C38 29 36 23 34 16 Z" fill="#334155" />
      {/* Right Lion Head */}
      <path d="M66 16 C72 16 76 22 76 29 C76 35 72 40 66 40 C63 40 60 37 59 33 C62 29 64 23 66 16 Z" fill="#334155" />
      {/* Mane Details */}
      <path d="M43 28 C41 34 43 45 50 48 C57 45 59 34 57 28 C55 31 52 33 50 33 C48 33 45 31 43 28 Z" fill="#475569" />
      {/* Torso & Pillars */}
      <path d="M36 44 L32 64 L42 66 L44 48 Z" fill="#334155" />
      <path d="M64 44 L68 64 L58 66 L56 48 Z" fill="#334155" />
      <path d="M46 48 L46 67 L54 67 L54 48 Z" fill="#1e293b" />
      {/* Abacus Base Platform */}
      <rect x="20" y="68" width="60" height="8" rx="2" fill="#0f172a" />
      {/* Ashoka Chakra Wheel */}
      <circle cx="50" cy="72" r="3.5" fill="#0284c7" />
      <circle cx="50" cy="72" r="1.5" fill="#ffffff" />
      {/* Galloping Bull / Horse Embellishments */}
      <circle cx="32" cy="72" r="2" fill="#64748b" />
      <circle cx="68" cy="72" r="2" fill="#64748b" />
      {/* Lower Bell-shaped Lotus Base */}
      <path d="M26 78 C30 84 40 86 50 86 C60 86 70 84 74 78 L26 78 Z" fill="#334155" />
      {/* Base Plinth */}
      <rect x="22" y="87" width="56" height="4" rx="1" fill="#0f172a" />
      {/* Satyameva Jayate Inscription Text representation */}
      <text x="50" y="102" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#0f172a" fontFamily="serif">
        सत्यमेव जयते
      </text>
    </svg>
  );
}

// Satellite / Hazard Vector Map Component
function ReportMapGraphic({ type = "pre" }) {
  // type: 'pre' | 'post' | 'severity'
  const isPost = type === "post";
  const isSeverity = type === "severity";

  return (
    <div className="relative w-full h-[155px] bg-[#142319] overflow-hidden rounded border border-[#2d4a36] select-none">
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {/* Background Satellite Terrain Texture */}
        <rect width="300" height="200" fill="#1b2f22" />

        {/* Topography Contours & Tea Garden Patches */}
        <path d="M 0 50 Q 80 30 160 70 T 300 40 L 300 0 L 0 0 Z" fill="#243d2c" opacity="0.8" />
        <path d="M 0 120 Q 90 150 180 110 T 300 160 L 300 200 L 0 200 Z" fill="#1e3425" opacity="0.9" />
        <ellipse cx="70" cy="80" rx="45" ry="30" fill="#294632" opacity="0.6" />
        <ellipse cx="220" cy="120" rx="55" ry="35" fill="#26402e" opacity="0.6" />

        {/* Golaghat District Boundary (Dotted Yellow/Cyan) */}
        <polygon
          points="20,50 90,20 220,15 285,45 270,165 200,190 110,185 35,145 15,90"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.2"
          strokeDasharray="3,2"
          opacity="0.85"
        />

        {/* Revenue Circle Boundary Outlines */}
        {/* Bokakhat (NW) */}
        <polygon points="20,50 90,20 125,55 90,95 35,80" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
        {/* Dergaon (NE) */}
        <polygon points="125,55 220,15 250,55 185,75 140,65" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
        {/* Khumtai (Center-West) */}
        <polygon points="90,95 125,55 185,75 160,115 105,120" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
        {/* Golaghat Sadar (Center-East) */}
        <polygon points="185,75 250,55 285,105 230,135 160,115" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
        {/* Morangi (South-West) */}
        <polygon points="105,120 160,115 170,165 110,175 60,140" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
        {/* Sarupathar (South) */}
        <polygon points="160,115 230,135 250,180 180,190 170,165" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />

        {/* Major Rivers (Dhansiri & Doyang) */}
        {/* Dhansiri Main Channel */}
        <path
          d="M 30,180 Q 80,150 140,115 T 220,65 T 280,30"
          fill="none"
          stroke="#0284c7"
          strokeWidth={isPost ? "4.5" : "2"}
          opacity="0.95"
        />
        {/* Doyang Tributary */}
        <path
          d="M 190,190 Q 180,145 140,115"
          fill="none"
          stroke="#0284c7"
          strokeWidth={isPost ? "3.5" : "1.5"}
          opacity="0.9"
        />
        {/* Gelabil Channel (Bokakhat) */}
        <path
          d="M 25,60 Q 60,70 90,65"
          fill="none"
          stroke="#0284c7"
          strokeWidth={isPost ? "3" : "1.2"}
          opacity="0.9"
        />

        {/* FLOOD OVERLAY (Only for Post-Disaster Map) */}
        {isPost && (
          <g>
            {/* Dhansiri Corridor Inundation Footprint */}
            <path
              d="M 25,182 Q 75,148 135,112 T 215,62 T 282,28 L 285,38 Q 225,75 145,120 T 35,188 Z"
              fill="#38bdf8"
              fillOpacity="0.65"
            />
            {/* Bokakhat Kaziranga Buffer Submergence Zone */}
            <ellipse cx="65" cy="55" rx="30" ry="18" fill="#38bdf8" fillOpacity="0.6" stroke="#0284c7" strokeWidth="0.8" />
            {/* Khumtai Lowland Inundation */}
            <ellipse cx="130" cy="90" rx="22" ry="14" fill="#38bdf8" fillOpacity="0.55" stroke="#0284c7" strokeWidth="0.8" />
            {/* Inundated village markers */}
            <circle cx="50" cy="50" r="2" fill="#ef4444" />
            <circle cx="75" cy="60" r="2" fill="#ef4444" />
            <circle cx="125" cy="85" r="2" fill="#ef4444" />
            <circle cx="150" cy="105" r="2" fill="#ef4444" />
            <circle cx="210" cy="70" r="2" fill="#ef4444" />
          </g>
        )}

        {/* AI SEVERITY ZONE HEATMAP OVERLAY (Only for Severity Map) */}
        {isSeverity && (
          <g>
            {/* Critical Red Zone: Bokakhat */}
            <ellipse cx="65" cy="55" rx="36" ry="22" fill="#dc2626" fillOpacity="0.75" />
            {/* Critical Red Zone: Golaghat Sadar & Dhansiri Corridor */}
            <ellipse cx="195" cy="85" rx="42" ry="26" fill="#dc2626" fillOpacity="0.7" />
            {/* High Orange Zone: Khumtai */}
            <ellipse cx="130" cy="90" rx="32" ry="20" fill="#ea580c" fillOpacity="0.7" />
            {/* Moderate Yellow Zone: Dergaon */}
            <ellipse cx="185" cy="45" rx="30" ry="18" fill="#ca8a04" fillOpacity="0.65" />
            {/* Moderate Yellow Zone: Morangi */}
            <ellipse cx="120" cy="145" rx="28" ry="18" fill="#ca8a04" fillOpacity="0.65" />
            {/* Moderate Yellow Zone: Sarupathar */}
            <ellipse cx="205" cy="155" rx="30" ry="20" fill="#ca8a04" fillOpacity="0.65" />
          </g>
        )}

        {/* Road Overlay (Major NH-715 & NH-129) */}
        <path d="M 20,40 Q 100,50 200,35 T 280,45" fill="none" stroke="#f8fafc" strokeWidth="1.2" opacity="0.7" />
        <path d="M 200,35 L 180,185" fill="none" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3,1" opacity="0.6" />

        {/* Geographic Circle Labels */}
        <text x="65" y="48" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Bokakhat
        </text>
        <text x="185" y="40" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Dergaon
        </text>
        <text x="125" y="90" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Khumtai
        </text>
        <text x="215" y="95" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Golaghat
        </text>
        <text x="115" y="145" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Morangi
        </text>
        <text x="205" y="160" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 1px 1px black)">
          Sarupathar
        </text>

        {/* River Label */}
        <text x="135" y="188" fill="#38bdf8" fontSize="7" fontWeight="bold" fontStyle="italic">
          DHANSIRI RIVER
        </text>
      </svg>

      {/* Map Header Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 bg-[#09150e]/90 border-b border-[#2d4a36] px-2 py-0.5 flex justify-between items-center text-[9px] font-mono text-[#cbd5e1]">
        <span className="font-bold text-white">
          {type === "pre" ? "PRE-DISASTER IMAGE" : type === "post" ? "POST-DISASTER IMAGE" : "SEVERITY ZONE MAP (AI CLASSIFICATION)"}
        </span>
        <span className="text-emerald-400 font-bold">{type === "pre" ? "10 AUGUST 2026" : "22 AUGUST 2026"}</span>
      </div>
    </div>
  );
}

export default function DisasterReport({
  disasterInfo = {},
  circlesData = [],
  riverGaugeData = [],
  humanitarianData = {},
  housingData = {},
  infrastructureData = {},
  agricultureData = {},
  reliefOperationsData = {},
  economicLossData = {},
  recoveryData = {},
  hospitalsData = GOLAGHAT_HOSPITALS,
  emergencyContactsData = GOLAGHAT_EMERGENCY_CONTACTS,
  evaluationMetrics = {},
  report = "",
  reportLoading = false,
  reportError = false,
  onRefresh,
}) {
  const reportContentRef = useRef(null);
  const [downloadState, setDownloadState] = useState("idle"); // idle | generating | success | error

  // Dynamic Date and Report ID values
  const reportDateStr = "22 AUGUST 2026";
  const reportTimeStr = "10:30 AM IST";
  const reportId = "GLGT/FSR/2026/08/22/01";

  // Data aggregations and calculations
  const totalPop = humanitarianData.totalAffected || 195400;
  const totalFamilies = humanitarianData.familiesAffected || 41200;
  const totalHouses = housingData.totalHousesAffected || 5640;
  const totalVillages = circlesData.reduce((acc, c) => acc + (c.villagesAffected || 0), 0) || 215;
  const totalCamps = reliefOperationsData.activeCamps || 48;
  const totalInmates = reliefOperationsData.inmatesSheltered || 16500;
  const floodedAreaSqKm = 98.0; // 9,800 ha = 98.0 sq km
  const roadCutKm = infrastructureData.roads?.totalLengthDamagedKm || 126;
  const bridgesDamaged = infrastructureData.bridges?.totalDamaged || 3;

  // Circles list with fallbacks
  const displayCircles =
    circlesData.length > 0
      ? circlesData
      : [
          { circle: "Bokakhat", severity: "HIGH", populationAffected: 64800, familiesAffected: 13800, housesDamaged: 1920, villagesAffected: 68, reliefCamps: 16, peopleInCamps: 5600, status: "Active", priority: "P1" },
          { circle: "Golaghat", severity: "HIGH", populationAffected: 48200, familiesAffected: 10400, housesDamaged: 1380, villagesAffected: 54, reliefCamps: 12, peopleInCamps: 4100, status: "Active", priority: "P1" },
          { circle: "Khumtai", severity: "HIGH", populationAffected: 38400, familiesAffected: 8200, housesDamaged: 1120, villagesAffected: 42, reliefCamps: 9, peopleInCamps: 3200, status: "Active", priority: "P2" },
          { circle: "Dergaon", severity: "MODERATE", populationAffected: 26500, familiesAffected: 5600, housesDamaged: 740, villagesAffected: 31, reliefCamps: 6, peopleInCamps: 2100, status: "Active", priority: "P3" },
          { circle: "Morangi", severity: "MODERATE", populationAffected: 17500, familiesAffected: 3200, housesDamaged: 480, villagesAffected: 20, reliefCamps: 5, peopleInCamps: 1500, status: "Active", priority: "P3" },
          { circle: "Sarupathar", severity: "MODERATE", populationAffected: 10200, familiesAffected: 2400, housesDamaged: 320, villagesAffected: 18, reliefCamps: 4, peopleInCamps: 900, status: "Active", priority: "P3" },
        ];

  // Circle Totals
  const sumPop = displayCircles.reduce((s, c) => s + (c.populationAffected || 0), 0);
  const sumFam = displayCircles.reduce((s, c) => s + (c.familiesAffected || 0), 0);
  const sumHouses = displayCircles.reduce((s, c) => s + (c.housesDamaged || 0), 0);
  const sumVillages = displayCircles.reduce((s, c) => s + (c.villagesAffected || 0), 0);
  const sumCamps = displayCircles.reduce((s, c) => s + (c.reliefCamps || 0), 0);
  const sumInmates = displayCircles.reduce((s, c) => s + (c.peopleInCamps || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!reportContentRef.current || downloadState === "generating") return;

    setDownloadState("generating");

    try {
      const element = reportContentRef.current;

      // Capture at high resolution (scale 2.5) for crisp government print quality
      const canvas = await html2canvas(element, {
        scale: 2.5,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 1440,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // Create PDF in Landscape A4 (297mm x 210mm) to match the approved situation report poster layout
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297;
      const pdfHeight = 210;

      // Fit the captured canvas image perfectly onto A4 landscape
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      const filename = `Golaghat_District_Situation_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);

      setDownloadState("success");
      setTimeout(() => setDownloadState("idle"), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. REPORT CONTROL TOOLBAR */}
      <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">DISTRICT SITUATION & DAMAGE REPORT</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                OFFICIAL DDMA BRIEF
              </span>
            </div>
            <p className="text-xs text-[#8B96AC]">
              Approved Government Format • High-Density Operational Briefing Sheet for District Incident Command
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onRefresh}
            disabled={reportLoading || downloadState === "generating"}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#E7ECF5] hover:bg-white/10 transition-colors disabled:opacity-50"
            title="Refresh AI Operational Briefing"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${reportLoading ? "animate-spin" : ""}`} />
            <span>Regenerate AI Synthesis</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={downloadState === "generating"}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#E7ECF5] hover:bg-white/10 transition-colors"
            title="Print Report"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Report</span>
          </button>

          {/* EXPORT OFFICIAL PDF BUTTON */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloadState === "generating"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-lg ${
              downloadState === "generating"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait"
                : downloadState === "success"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : downloadState === "error"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30"
            }`}
          >
            {downloadState === "generating" ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Generating Official Report...</span>
              </>
            ) : downloadState === "success" ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Report Generated</span>
              </>
            ) : downloadState === "error" ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Unable to generate report. Please try again.</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Official PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. APPROVED OFFICIAL SITUATION REPORT DOCUMENT (FAITHFUL TO APPROVED IMAGE) */}
      <div className="overflow-x-auto pb-4">
        <div
          ref={reportContentRef}
          className="w-[1280px] bg-white text-[#0f172a] p-5 rounded-xl shadow-2xl border border-slate-300 font-sans mx-auto text-[11px] leading-tight select-text"
          style={{ minWidth: "1280px" }}
        >
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#0d472a] gap-4">
            {/* Left: Emblem & Titles */}
            <div className="flex items-center gap-3.5">
              <AshokaEmblem className="w-12 h-14 text-[#0f172a] shrink-0" />
              <div>
                <h1 className="text-xl font-bold text-[#0d472a] tracking-tight leading-none uppercase font-serif">
                  DISTRICT SITUATION REPORT
                </h1>
                <h2 className="text-sm font-extrabold text-[#0f172a] tracking-wide mt-1 uppercase">
                  GOLAGHAT DISTRICT, ASSAM
                </h2>
                <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  FLOOD SITUATION ASSESSMENT & ACTION PLAN
                </h3>
              </div>
            </div>

            {/* Right: Green Report ID & Timestamp Box */}
            <div className="bg-[#0a3d24] text-white px-4 py-2 rounded-lg font-mono text-[11px] shadow-sm text-right space-y-0.5 shrink-0">
              <div className="font-bold text-emerald-300">REPORT ID: {reportId}</div>
              <div>DATE: {reportDateStr}</div>
              <div>TIME: {reportTimeStr}</div>
            </div>
          </div>

          {/* GREEN METADATA BANNER STRIP */}
          <div className="bg-[#0d472a] text-[#e2e8f0] px-3.5 py-1.5 rounded mt-2.5 flex items-center justify-between font-mono text-[10.5px] font-medium">
            <div className="flex items-center gap-4">
              <span>🏛 District: <b className="text-white">Golaghat, Assam</b></span>
              <span>🌊 Event: <b className="text-emerald-300">Flood 2026</b></span>
              <span>📅 Assessment Period: <b className="text-white">16 Aug 2026 - 22 Aug 2026</b></span>
            </div>
            <div>
              <span>Data Source: <b className="text-white">DDMA Golaghat, ASDMA, CWC, WRD, IMD, PWD</b></span>
            </div>
          </div>

          {/* MAIN 2-COLUMN OPERATIONAL GRID */}
          <div className="grid grid-cols-[52%_48%] gap-3.5 mt-3">
            {/* ========================================================================= */}
            {/* LEFT COLUMN: SECTIONS 1, 2, 3, 4 */}
            {/* ========================================================================= */}
            <div className="space-y-3">
              {/* SECTION 1: OVERALL STATUS */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-2">
                  1. OVERALL STATUS
                </div>

                <div className="grid grid-cols-9 gap-1.5 text-center">
                  {/* Overall Severity */}
                  <div className="bg-white border border-rose-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">OVERALL SEVERITY</div>
                    <div className="my-1 flex justify-center"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
                    <div className="text-[11px] font-black text-rose-600">HIGH</div>
                  </div>

                  {/* Circles Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">CIRCLES AFFECTED</div>
                    <div className="my-1 flex justify-center"><Building2 className="w-4 h-4 text-[#0d472a]" /></div>
                    <div>
                      <div className="text-[11px] font-extrabold text-[#0f172a]">6/6</div>
                      <div className="text-[8px] text-slate-500">100%</div>
                    </div>
                  </div>

                  {/* Population Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">POPULATION AFFECTED</div>
                    <div className="my-1 flex justify-center"><Users className="w-4 h-4 text-[#0d472a]" /></div>
                    <div>
                      <div className="text-[10.5px] font-black text-[#0f172a]">{totalPop.toLocaleString()}</div>
                      <div className="text-[8px] text-slate-500">(Est.)</div>
                    </div>
                  </div>

                  {/* Families Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">FAMILIES AFFECTED</div>
                    <div className="my-1 flex justify-center"><Home className="w-4 h-4 text-[#0d472a]" /></div>
                    <div>
                      <div className="text-[10.5px] font-black text-[#0f172a]">{totalFamilies.toLocaleString()}</div>
                      <div className="text-[8px] text-slate-500">(Est.)</div>
                    </div>
                  </div>

                  {/* Houses Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">HOUSES AFFECTED</div>
                    <div className="my-1 flex justify-center"><Home className="w-4 h-4 text-amber-600" /></div>
                    <div>
                      <div className="text-[10.5px] font-black text-[#0f172a]">{totalHouses.toLocaleString()}</div>
                      <div className="text-[8px] text-slate-500">(Prelim.)</div>
                    </div>
                  </div>

                  {/* Flood Inundation */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">FLOOD INUNDATION</div>
                    <div className="my-1 flex justify-center"><Waves className="w-4 h-4 text-sky-600" /></div>
                    <div>
                      <div className="text-[10.5px] font-black text-[#0f172a]">{floodedAreaSqKm.toFixed(1)}</div>
                      <div className="text-[8px] text-slate-500">sq km</div>
                    </div>
                  </div>

                  {/* Roads Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">ROADS AFFECTED</div>
                    <div className="my-1 flex justify-center"><Route className="w-4 h-4 text-amber-600" /></div>
                    <div>
                      <div className="text-[10.5px] font-black text-[#0f172a]">{roadCutKm}</div>
                      <div className="text-[8px] text-slate-500">km</div>
                    </div>
                  </div>

                  {/* Bridges Affected */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">BRIDGES / CROSSINGS</div>
                    <div className="my-1 flex justify-center"><Anchor className="w-4 h-4 text-rose-600" /></div>
                    <div className="text-[11px] font-black text-[#0f172a]">{bridgesDamaged}</div>
                  </div>

                  {/* Relief Camps Active */}
                  <div className="bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                    <div className="text-[8px] font-bold text-slate-500 uppercase leading-none">RELIEF CAMPS ACTIVE</div>
                    <div className="my-1 flex justify-center"><Users className="w-4 h-4 text-emerald-600" /></div>
                    <div className="text-[11px] font-black text-emerald-700">{totalCamps}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: SATELLITE CHANGE DETECTION & SEVERITY ZONES */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-2">
                  2. SATELLITE CHANGE DETECTION & SEVERITY ZONES
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <ReportMapGraphic type="pre" />
                  <ReportMapGraphic type="post" />
                  <ReportMapGraphic type="severity" />
                </div>

                {/* Map Legend Bar */}
                <div className="flex flex-wrap items-center justify-between mt-2 pt-1.5 border-t border-slate-200 text-[9.5px] font-mono text-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold text-rose-700">● HIGH (4)</span>
                    <span className="flex items-center gap-1 font-bold text-amber-700">● MODERATE (9)</span>
                    <span className="flex items-center gap-1 font-bold text-yellow-700">● LOW (12)</span>
                    <span className="flex items-center gap-1 font-bold text-sky-700">● WATER / NORMAL</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>— Major Road</span>
                    <span>--- Other Road</span>
                    <span className="text-sky-600 font-bold">~ River / Water</span>
                    <span>⛩ Bridge / Crossing Affected</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3 & 4: CIRCLE-WISE IMPACT SUMMARY + CONFIDENCE LEVEL */}
              <div className="grid grid-cols-[72%_28%] gap-2.5">
                {/* SECTION 3: CIRCLE-WISE IMPACT SUMMARY TABLE */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50/50">
                  <div className="text-[10.5px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1.5">
                    3. CIRCLE-WISE IMPACT SUMMARY
                  </div>

                  <table className="w-full text-left text-[9.5px] border-collapse">
                    <thead>
                      <tr className="bg-[#0d472a] text-white font-mono text-[9px]">
                        <th className="py-1 px-1.5">CIRCLE</th>
                        <th className="py-1 px-1 text-center">SEVERITY</th>
                        <th className="py-1 px-1 text-right">POPULATION (EST.)</th>
                        <th className="py-1 px-1 text-right">FAMILIES</th>
                        <th className="py-1 px-1 text-right">HOUSES</th>
                        <th className="py-1 px-1 text-right">VILLAGES</th>
                        <th className="py-1 px-1 text-right">CAMPS</th>
                        <th className="py-1 px-1 text-right">INMATES</th>
                        <th className="py-1 px-1 text-center">STATUS</th>
                        <th className="py-1 px-1 text-center">PRIORITY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {displayCircles.map((c) => {
                        const isHigh = c.severity === "HIGH" || c.severity === "Critical";
                        const isP1 = c.priority === "P1";

                        return (
                          <tr key={c.circle} className="hover:bg-slate-50">
                            <td className="py-1 px-1.5 font-bold text-[#0f172a]">{c.circle}</td>
                            <td className="py-1 px-1 text-center">
                              <span className={`px-1 py-0.2 rounded font-bold text-[8.5px] ${isHigh ? "bg-rose-100 text-rose-700 font-extrabold" : "bg-amber-100 text-amber-700"}`}>
                                {isHigh ? "HIGH" : "MODERATE"}
                              </span>
                            </td>
                            <td className="py-1 px-1 text-right font-mono font-semibold">{c.populationAffected?.toLocaleString() || "Data unavailable"}</td>
                            <td className="py-1 px-1 text-right font-mono">{c.familiesAffected?.toLocaleString() || "Data unavailable"}</td>
                            <td className="py-1 px-1 text-right font-mono">{c.housesDamaged?.toLocaleString() || "Data unavailable"}</td>
                            <td className="py-1 px-1 text-right font-mono font-semibold">{c.villagesAffected || "Data unavailable"}</td>
                            <td className="py-1 px-1 text-right font-mono font-bold text-emerald-700">{c.reliefCamps || 0}</td>
                            <td className="py-1 px-1 text-right font-mono font-semibold text-[#0f172a]">{c.peopleInCamps?.toLocaleString() || 0}</td>
                            <td className="py-1 px-1 text-center font-mono text-[8.5px] text-emerald-700 font-bold">{c.status || "Active"}</td>
                            <td className="py-1 px-1 text-center">
                              <span className={`px-1 py-0.2 rounded text-[8.5px] font-mono font-bold ${isP1 ? "bg-rose-600 text-white" : c.priority === "P2" ? "bg-amber-500 text-white" : "bg-yellow-400 text-slate-900"}`}>
                                {c.priority || (isHigh ? "P1" : "P3")}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {/* TOTAL ROW */}
                      <tr className="bg-slate-100 font-bold font-mono text-[9.5px] border-t-2 border-slate-300">
                        <td className="py-1 px-1.5 text-[#0d472a]">TOTAL / AVERAGE</td>
                        <td className="py-1 px-1 text-center text-rose-700">CRITICAL</td>
                        <td className="py-1 px-1 text-right">{sumPop.toLocaleString()}</td>
                        <td className="py-1 px-1 text-right">{sumFam.toLocaleString()}</td>
                        <td className="py-1 px-1 text-right">{sumHouses.toLocaleString()}</td>
                        <td className="py-1 px-1 text-right">{sumVillages}</td>
                        <td className="py-1 px-1 text-right text-emerald-700 font-black">{sumCamps}</td>
                        <td className="py-1 px-1 text-right text-[#0d472a] font-black">{sumInmates.toLocaleString()}</td>
                        <td className="py-1 px-1 text-center text-emerald-700 font-bold">Active</td>
                        <td className="py-1 px-1 text-center text-slate-700">—</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-[8px] text-slate-500 mt-1 italic">
                    Note: Population & infrastructure exposure are estimated using satellite, census and field reports.
                  </div>
                </div>

                {/* SECTION 4: CONFIDENCE LEVEL (AI OUTPUT) */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1.5">
                      4. CONFIDENCE LEVEL <span className="text-[8px] text-slate-500">(AI OUTPUT)</span>
                    </div>

                    <div className="space-y-1.5 text-[9.5px] font-mono">
                      <div className="flex justify-between items-center bg-white p-1 rounded border border-slate-200">
                        <span className="text-slate-700">Flood Extent</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">84%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-1 rounded border border-slate-200">
                        <span className="text-slate-700">Pop Exposure</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">79%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-1 rounded border border-slate-200">
                        <span className="text-slate-700">Building Damage</span>
                        <span className="font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">72%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-1 rounded border border-slate-200">
                        <span className="text-slate-700">Road Damage</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">76%</span>
                      </div>
                    </div>
                  </div>

                  {/* Data Reliability Legend */}
                  <div className="border-t border-slate-200 pt-1 text-[8.5px] font-mono space-y-0.5">
                    <div className="font-bold text-slate-700 text-[8px]">DATA RELIABILITY</div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">■ High (&gt;80%)</div>
                    <div className="flex items-center gap-1 text-amber-700 font-bold">■ Medium (60-80%)</div>
                    <div className="flex items-center gap-1 text-rose-700 font-bold">■ Low (&lt;60%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: SECTIONS 5, 6, 7, 8, 9, 10, 11 */}
            {/* ========================================================================= */}
            <div className="space-y-3">
              {/* SECTION 5: KEY OBSERVATIONS & WEATHER ALERT */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="grid grid-cols-[70%_30%] gap-2.5">
                  <div>
                    <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1.5">
                      5. KEY OBSERVATIONS
                    </div>
                    <ul className="list-disc pl-3.5 space-y-1 text-[9.5px] text-slate-700 leading-tight">
                      <li>Flood situation in Dhansiri and Doyang rivers steady; several low-lying areas in Bokakhat & Sadar remain inundated.</li>
                      <li>Dhansiri (Numaligarh) recorded at <b>77.94m</b> (0.52m above 77.42m danger level); Doyang at 84.40m.</li>
                      <li><b>48 relief camps</b> operational housing <b>16,500 inmates</b>; 34 mobile medical teams active.</li>
                      <li>Multiple road sections affected (126 km damaged); NH-715 overtopped at Km 92 under 30 km/h pilot escort.</li>
                      <li>Damage assessment in progress: ₹242.50 Cr estimated loss (₹14.80 Cr DBT disbursed to 38,500 families).</li>
                      <li>Continued rainfall in upper catchment may cause fluctuations in water levels in next 24–48 hours.</li>
                    </ul>
                  </div>

                  {/* Weather Alert Box */}
                  <div className="bg-white border border-amber-300 rounded p-2 flex flex-col justify-between text-center">
                    <div className="bg-[#0d472a] text-white text-[8px] font-mono font-bold py-0.5 rounded uppercase">
                      WEATHER ALERT (NEXT 72 HRS)
                    </div>
                    <div className="my-1 flex items-center justify-center gap-1.5 text-sky-600">
                      <CloudRain className="w-5 h-5" />
                    </div>
                    <div className="text-[9px] text-slate-700 leading-tight">
                      Moderate to heavy rain with thunderstorms likely.<br />
                      <span className="text-[7.5px] text-slate-500 font-mono">Source: IMD Guwahati</span>
                    </div>
                    <div className="bg-yellow-400 text-slate-900 font-black text-[10px] py-0.5 rounded font-mono mt-1">
                      YELLOW ALERT
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 6: IMMEDIATE ACTION PRIORITY (NEXT 72 HOURS) */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-2">
                  6. IMMEDIATE ACTION PRIORITY (NEXT 72 HOURS)
                </div>

                <div className="space-y-1.5">
                  {/* P1 IMMEDIATE */}
                  <div className="bg-white border border-rose-200 rounded p-1.5 flex items-center gap-2">
                    <div className="bg-rose-600 text-white font-black font-mono text-[9px] px-2 py-1.5 rounded text-center shrink-0 w-20">
                      <div>P1</div>
                      <div className="text-[7.5px]">IMMEDIATE</div>
                      <div className="text-[6.5px] text-rose-200">0 - 24 HRS</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 flex-1 text-[9px]">
                      <div>
                        <div className="font-bold text-slate-900">Search & Rescue Operations</div>
                        <div className="text-[8px] text-slate-500">Focus on Low-lying Areas</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Evacuation & Relief Camps</div>
                        <div className="text-[8px] text-slate-500">Monitor Camp Capacities</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Restore Road Connectivity</div>
                        <div className="text-[8px] text-slate-500">Priority on Flooded Roads</div>
                      </div>
                    </div>
                  </div>

                  {/* P2 URGENT */}
                  <div className="bg-white border border-amber-200 rounded p-1.5 flex items-center gap-2">
                    <div className="bg-amber-500 text-white font-black font-mono text-[9px] px-2 py-1.5 rounded text-center shrink-0 w-20">
                      <div>P2</div>
                      <div className="text-[7.5px]">URGENT</div>
                      <div className="text-[6.5px] text-amber-100">24 - 48 HRS</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 flex-1 text-[9px]">
                      <div>
                        <div className="font-bold text-slate-900">Bridge & Crossing Inspection</div>
                        <div className="text-[8px] text-slate-500">Ensure Safe Passage</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Medical & Health Services</div>
                        <div className="text-[8px] text-slate-500">Focus on Camp Health</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Clean Drinking Water</div>
                        <div className="text-[8px] text-slate-500">Ensure Safe Water Supply</div>
                      </div>
                    </div>
                  </div>

                  {/* P3 IMPORTANT */}
                  <div className="bg-white border border-yellow-200 rounded p-1.5 flex items-center gap-2">
                    <div className="bg-yellow-400 text-slate-900 font-black font-mono text-[9px] px-2 py-1.5 rounded text-center shrink-0 w-20">
                      <div>P3</div>
                      <div className="text-[7.5px]">IMPORTANT</div>
                      <div className="text-[6.5px] text-slate-700">48 - 72 HRS</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 flex-1 text-[9px]">
                      <div>
                        <div className="font-bold text-slate-900">Detailed Damage Assessment</div>
                        <div className="text-[8px] text-slate-500">All Revenue Circles</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Fodder Supply & Livestock</div>
                        <div className="text-[8px] text-slate-500">Use Fodder Depots</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Coordinate Departments</div>
                        <div className="text-[8px] text-slate-500">Unified Response</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 7: RESOURCE REQUIREMENT (INITIAL) */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-2">
                  7. RESOURCE REQUIREMENT (INITIAL)
                </div>

                <div className="grid grid-cols-6 gap-2 text-center">
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">NDRF Boats</div>
                    <div className="text-sm font-black font-mono text-[#0d472a]">06</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">SDRF Teams</div>
                    <div className="text-sm font-black font-mono text-[#0d472a]">10</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">Ambulances</div>
                    <div className="text-sm font-black font-mono text-pink-700">15</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">JCB / Movers</div>
                    <div className="text-sm font-black font-mono text-[#0d472a]">06</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">Trucks</div>
                    <div className="text-sm font-black font-mono text-[#0d472a]">18</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded p-1.5">
                    <div className="text-[8px] font-bold text-slate-500 uppercase">Relief MT</div>
                    <div className="text-sm font-black font-mono text-amber-700">60</div>
                  </div>
                </div>
              </div>

              {/* SECTION 8: COMMAND ACTION BOARD */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="text-[11px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1.5">
                  8. COMMAND ACTION BOARD
                </div>

                <table className="w-full text-left text-[9px] border-collapse">
                  <thead>
                    <tr className="bg-[#0d472a] text-white font-mono text-[8.5px]">
                      <th className="py-1 px-1 text-center">PRIORITY</th>
                      <th className="py-1 px-1.5">ACTION</th>
                      <th className="py-1 px-1.5">LOCATION / AREA</th>
                      <th className="py-1 px-1.5">RESPONSIBLE DEPT</th>
                      <th className="py-1 px-1 text-center">STATUS</th>
                      <th className="py-1 px-1.5 text-right">TARGET TIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-rose-600 text-white px-1 py-0.2 rounded font-bold font-mono text-[8px]">P1</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Deploy Rescue Teams</td>
                      <td className="py-0.8 px-1.5 text-slate-700">Bokakhat, Low-lying Areas</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">SDRF / NDRF</td>
                      <td className="py-0.8 px-1 text-center text-emerald-700 font-bold">● In Progress</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 2 Hrs</td>
                    </tr>
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-rose-600 text-white px-1 py-0.2 rounded font-bold font-mono text-[8px]">P1</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Evacuate Affected People</td>
                      <td className="py-0.8 px-1.5 text-slate-700">Low-lying Villages</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">Revenue / Police</td>
                      <td className="py-0.8 px-1 text-center text-emerald-700 font-bold">● In Progress</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 3 Hrs</td>
                    </tr>
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-amber-500 text-white px-1 py-0.2 rounded font-bold font-mono text-[8px]">P2</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Restore Flooded Roads</td>
                      <td className="py-0.8 px-1.5 text-slate-700">NH-715, Rural Roads</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">PWD / PWD (R)</td>
                      <td className="py-0.8 px-1 text-center text-emerald-700 font-bold">● In Progress</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 24 Hrs</td>
                    </tr>
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-amber-500 text-white px-1 py-0.2 rounded font-bold font-mono text-[8px]">P2</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Medical Camps in Relief Camps</td>
                      <td className="py-0.8 px-1.5 text-slate-700">All Relief Camps</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">Health Dept.</td>
                      <td className="py-0.8 px-1 text-center text-emerald-700 font-bold">● In Progress</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 24 Hrs</td>
                    </tr>
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-yellow-400 text-slate-900 px-1 py-0.2 rounded font-bold font-mono text-[8px]">P3</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Damage Assessment</td>
                      <td className="py-0.8 px-1.5 text-slate-700">All Circles</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">Revenue Dept.</td>
                      <td className="py-0.8 px-1 text-center text-amber-700 font-bold">● Pending</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 72 Hrs</td>
                    </tr>
                    <tr>
                      <td className="py-0.8 px-1 text-center"><span className="bg-yellow-400 text-slate-900 px-1 py-0.2 rounded font-bold font-mono text-[8px]">P3</span></td>
                      <td className="py-0.8 px-1.5 font-bold text-[#0f172a]">Fodder Supply</td>
                      <td className="py-0.8 px-1.5 text-slate-700">All Circles</td>
                      <td className="py-0.8 px-1.5 font-mono text-[#0d472a] font-semibold">Animal Husbandry</td>
                      <td className="py-0.8 px-1 text-center text-amber-700 font-bold">● Pending</td>
                      <td className="py-0.8 px-1.5 text-right font-mono text-slate-700">Within 72 Hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTIONS 9, 10, 11: IMPORTANT CONTACTS, NEXT UPDATE, DISCLAIMER */}
              <div className="grid grid-cols-[45%_25%_30%] gap-2.5">
                {/* SECTION 9: IMPORTANT CONTACTS */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50/50">
                  <div className="text-[10px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1">
                    9. IMPORTANT CONTACTS
                  </div>
                  <div className="space-y-0.8 text-[8.5px] font-mono text-slate-700">
                    <div className="flex justify-between">
                      <span className="truncate">DEOC Golaghat (24x7)</span>
                      <span className="font-bold text-[#0d472a]">03774-280120 / 1077</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">District Control Room</span>
                      <span className="font-bold text-[#0d472a]">03774-280221</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">SDRF Control Room</span>
                      <span className="font-bold text-[#0d472a]">03774-280450 / 1077</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">Police Control Room</span>
                      <span className="font-bold text-[#0d472a]">03774-280333 / 112</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">Fire & Emergency</span>
                      <span className="font-bold text-[#0d472a]">03774-280101 / 101</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">Ambulance Service</span>
                      <span className="font-bold text-pink-700">108 (Toll Free)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">Electricity (APDCL)</span>
                      <span className="font-bold text-[#0d472a]">1912 / 03774-280245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">Water Supply (PHED)</span>
                      <span className="font-bold text-[#0d472a]">03774-280188</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 10: NEXT UPDATE */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1">
                      10. NEXT UPDATE
                    </div>
                    <div className="flex items-center gap-1.5 my-1 text-[#0d472a]">
                      <Calendar className="w-4 h-4 text-[#0d472a]" />
                      <div className="text-[8.5px] font-mono leading-tight">
                        Next Situation Update:<br />
                        <b className="text-slate-900">22 Aug 2026 (Evening)</b>
                      </div>
                    </div>
                  </div>
                  <div className="text-[8px] font-mono text-slate-600 border-t border-slate-200 pt-1">
                    Next Situation Report:<br />
                    <b className="text-[#0d472a]">23 Aug 2026 by 08:00 AM</b>
                  </div>
                </div>

                {/* SECTION 11: DISCLAIMER */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50/50 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-[#0d472a] uppercase font-mono tracking-wide border-b border-slate-200 pb-1 mb-1">
                    11. DISCLAIMER
                  </div>
                  <p className="text-[8px] text-slate-600 leading-tight">
                    This report is based on available satellite data, field reports and departmental inputs. Figures are preliminary and subject to change as assessments continue.
                  </p>
                  <div className="text-[7.5px] text-slate-400 font-mono mt-1">
                    Automated analytical support via DRISHTI EODSS.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GREEN OFFICIAL FOOTER */}
          <div className="bg-[#0d472a] text-white px-4 py-2 rounded mt-3 flex items-center justify-between font-mono text-[10.5px]">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <AshokaEmblem className="w-4 h-4 text-emerald-300" />
              <span>Save Lives, Protect Property, Restore Normalcy</span>
            </div>
            <div className="text-emerald-300 font-bold">
              Issued by: District Disaster Management Authority (DDMA), Golaghat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}