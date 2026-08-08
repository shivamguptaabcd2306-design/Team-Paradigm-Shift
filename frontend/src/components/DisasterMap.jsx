import { useState } from "react";
import { MapPin, Navigation, ShieldAlert, Waves, Anchor, Home, Eye, Info, Layers, Route } from "lucide-react";

const MAP_LOCATIONS = [
  {
    id: "st101",
    name: "Kolab Dam Station",
    severity: "Critical",
    x: 46,
    y: 40,
    coords: "18.8135° N, 82.7123° E",
    evacuated: "184.5 mm Rain",
    status: "River: Kolab | Basin: Godavari | Daily Rainfall: 184.5 mm | Agency: CWC",
    boats: 4,
    teams: "CWC Telemetry Unit 1",
    confidence: 94,
  },
  {
    id: "st102",
    name: "Semiliguda Gauge",
    severity: "High",
    x: 64,
    y: 54,
    coords: "18.7071° N, 82.8681° E",
    evacuated: "152.0 mm Rain",
    status: "River: Sabari Tributary | Daily Rainfall: 152.0 mm | Agency: State WRD",
    boats: 2,
    teams: "WRD Inspection Unit",
    confidence: 91,
  },
  {
    id: "st103",
    name: "Laxmipur Station",
    severity: "High",
    x: 76,
    y: 30,
    coords: "18.9892° N, 83.1189° E",
    evacuated: "128.5 mm Rain",
    status: "Local River: Muran Stream | Daily Rainfall: 128.5 mm | Agency: CWRDM",
    boats: 2,
    teams: "Hydro Survey Unit",
    confidence: 88,
  },
  {
    id: "st104",
    name: "Jeypore Bridge Gauge",
    severity: "Moderate",
    x: 26,
    y: 60,
    coords: "18.8576° N, 82.5694° E",
    evacuated: "95.0 mm Rain",
    status: "River: Upper Kolab | Daily Rainfall: 95.0 mm | Agency: CWC",
    boats: 1,
    teams: "Bridge Telemetry Unit",
    confidence: 95,
  },
  {
    id: "st105",
    name: "Boipariguda Station",
    severity: "Moderate",
    x: 18,
    y: 76,
    coords: "18.7523° N, 82.4312° E",
    evacuated: "82.0 mm Rain",
    status: "Basin: Godavari Sub-basin | Daily Rainfall: 82.0 mm | Agency: State WRD",
    boats: 1,
    teams: "Field Monitoring Unit",
    confidence: 96,
  },
  {
    id: "st106",
    name: "Kolab Telemetry Sensor",
    severity: "Critical",
    x: 40,
    y: 32,
    coords: "18.8310° N, 82.6950° E",
    evacuated: "Sensor Active",
    status: "Data Acquisition Time: 08:00 IST | River Flow: 3.2 m/s",
    boats: 0,
    teams: "Automated Sensor Unit",
    confidence: 82,
  },
];

const SEVERITY_COLORS = {
  Critical: {
    bg: "bg-rose-500",
    ping: "bg-rose-400",
    border: "border-rose-500",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  High: {
    bg: "bg-amber-500",
    ping: "bg-amber-400",
    border: "border-amber-500",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  Moderate: {
    bg: "bg-cyan-500",
    ping: "bg-cyan-400",
    border: "border-cyan-500",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    glow: "rgba(6, 182, 212, 0.4)",
  },
};

export default function DisasterMap({ affectedLocations = [], missingDataMode = false }) {
  const [selectedLoc, setSelectedLoc] = useState(MAP_LOCATIONS[0]);
  const [showInundation, setShowInundation] = useState(true);
  const [showBoats, setShowBoats] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [satelliteView, setSatelliteView] = useState(false);

  // Merge custom backend location notes into map locations if matching
  const locations = MAP_LOCATIONS.map((loc) => {
    const match = affectedLocations.find((al) => al.name.toLowerCase().includes(loc.name.toLowerCase()));
    if (match) {
      return { ...loc, severity: match.severity || loc.severity, status: match.note || loc.status };
    }
    return loc;
  });

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-4 sm:p-5 flex flex-col space-y-4 shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1B2434]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Navigation className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#E7ECF5]">Tactical Hydro-Meteorological Inundation Map</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Telemetry Active
              </span>
            </div>
            <p className="text-[11.5px] text-[#7C8AA3]">Kolab River Basin Telemetry Network • CWC & State WRD Data</p>
          </div>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-2 flex-wrap text-[11.5px]">
          <button
            onClick={() => setSatelliteView(!satelliteView)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              satelliteView ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            {satelliteView ? "Satellite Grid" : "Topo Grid"}
          </button>
          <button
            onClick={() => setShowInundation(!showInundation)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              showInundation ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            Inundation Zone
          </button>
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              showRoutes ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            <Route className="w-3.5 h-3.5 text-emerald-400" />
            Evacuation Routes
          </button>
          <button
            onClick={() => setShowBoats(!showBoats)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              showBoats ? "bg-violet-500/10 text-violet-300 border-violet-500/40" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-violet-400" />
            Rescue Units
          </button>
          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
              showShelters ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40" : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434]"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            Relief Camps
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* SVG Tactical Map Viewport */}
        <div
          className={`lg:col-span-8 relative min-h-[340px] sm:min-h-[380px] rounded-xl border border-[#1B2434] overflow-hidden select-none transition-colors ${
            satelliteView ? "bg-[#050A14]" : "bg-[#090D16]"
          }`}
        >
          {/* Topographical / Satellite Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: satelliteView
                ? `linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)`
                : `radial-gradient(#3A4560 1px, transparent 1px), linear-gradient(to right, rgba(27, 36, 52, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(27, 36, 52, 0.4) 1px, transparent 1px)`,
              backgroundSize: "20px 20px, 40px 40px, 40px 40px",
            }}
          />

          {/* Tactical Vector Graphics Overlay (River, Inundation, Evacuation Routes) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="floodZone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Inundation Danger Polygon */}
            {showInundation && (
              <polygon
                points="120,80 230,120 380,140 450,220 320,290 180,260 100,180"
                fill="url(#floodZone)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-pulse"
              />
            )}

            {/* Evacuation Route Vectors (Capability #5) */}
            {showRoutes && (
              <>
                {/* Route 1: Kolab Dam Station -> Relief Camp 1 */}
                <path
                  d="M 230 150 Q 300 130 340 120"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Route 2: Semiliguda Gauge -> Relief Camp 2 */}
                <path
                  d="M 320 200 Q 370 160 410 90"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </>
            )}

            {/* Main River Course Line */}
            <path
              d="M 60 40 Q 180 120 240 150 T 420 220 T 560 340"
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Secondary Flood Tributary */}
            <path
              d="M 240 150 Q 320 110 440 90"
              fill="none"
              stroke="#0284c7"
              strokeWidth="6"
              strokeDasharray="5 3"
              opacity="0.6"
            />

            {/* Contour Lines */}
            <path d="M 20 200 C 140 180, 260 300, 480 280" fill="none" stroke="#1B2434" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 80 40 C 220 80, 340 40, 520 120" fill="none" stroke="#1B2434" strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* Compass Rose & Scale */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[#7C8AA3] bg-[#0D1420]/80 backdrop-blur px-2.5 py-1 rounded border border-[#1B2434] flex items-center gap-2">
            <span className="text-cyan-400 font-bold">N ↑</span>
            <span>18.8135° N, 82.7123° E</span>
            <span className="border-l border-[#1B2434] pl-2 text-[#56657F]">
              {satelliteView ? "Satellite Band 8 SAR" : "Scale 1:50,000"}
            </span>
          </div>

          {/* Interactive Relief Camps Icons on Map */}
          {showShelters && (
            <>
              <div
                className="absolute top-[32%] left-[68%] -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                title="Relief Camp #1 (Semiliguda High School - 210/300 Beds Occupied)"
              >
                <Home className="w-3.5 h-3.5" />
              </div>
              <div
                className="absolute top-[24%] left-[82%] -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                title="Relief Camp #2 (Laxmipur Primary Health Center - 90/300 Beds Occupied)"
              >
                <Home className="w-3.5 h-3.5" />
              </div>
            </>
          )}

          {/* Interactive Rescue Boats Icons on Map */}
          {showBoats && (
            <>
              <div
                className="absolute top-[44%] left-[42%] -translate-x-1/2 -translate-y-1/2 p-1 rounded bg-violet-500/20 border border-violet-500/50 text-violet-300 animate-bounce"
                title="Rescue Boat Unit Alpha-1"
              >
                <Anchor className="w-3.5 h-3.5" />
              </div>
              <div
                className="absolute top-[52%] left-[58%] -translate-x-1/2 -translate-y-1/2 p-1 rounded bg-violet-500/20 border border-violet-500/50 text-violet-300 animate-bounce"
                title="Rescue Boat Unit Beta-2"
              >
                <Anchor className="w-3.5 h-3.5" />
              </div>
            </>
          )}

          {/* Map Location Markers */}
          {locations.map((loc) => {
            const isSelected = selectedLoc?.id === loc.id;
            const style = SEVERITY_COLORS[loc.severity] || SEVERITY_COLORS.Moderate;
            const locConfidence = missingDataMode ? Math.max(40, loc.confidence - 25) : loc.confidence;

            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              >
                {/* Pulsating Severity Rings */}
                <div className="relative flex items-center justify-center">
                  <span className={`absolute w-7 h-7 rounded-full ${style.ping} opacity-40 animate-ping`} />
                  <div
                    className={`w-6 h-6 rounded-full ${style.bg} text-white flex items-center justify-center border-2 border-[#090D16] shadow-lg transition-transform duration-200 ${
                      isSelected ? "scale-125 ring-4 ring-white/20" : "group-hover:scale-110"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Location Name & Confidence Label Tag */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap backdrop-blur border transition-all flex items-center gap-1 ${
                    isSelected
                      ? `${style.badge} font-bold shadow-md shadow-black/50`
                      : "bg-[#0D1420]/90 text-[#D5DBE8] border-[#1B2434] group-hover:border-[#3A4560]"
                  }`}
                >
                  <span>{loc.name}</span>
                  <span className="font-mono text-[9.5px] opacity-80">({locConfidence}%)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Location Operational Detail Sidebar */}
        <div className="lg:col-span-4 bg-[#0D1420] border border-[#1B2434] rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#1B2434]">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-4 h-4 ${SEVERITY_COLORS[selectedLoc.severity]?.text}`} />
                <h4 className="text-sm font-semibold text-[#E7ECF5]">{selectedLoc.name}</h4>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${SEVERITY_COLORS[selectedLoc.severity]?.badge}`}>
                {selectedLoc.severity.toUpperCase()}
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-[12.5px]">
              <div>
                <span className="text-[11px] text-[#7C8AA3] font-mono block mb-0.5">LOCATION COORDINATES</span>
                <span className="text-[#B7C0D1] font-mono text-[12px]">{selectedLoc.coords}</span>
              </div>

              <div>
                <span className="text-[11px] text-[#7C8AA3] font-mono block mb-0.5">SITUATION UPDATE</span>
                <p className="text-[#D5DBE8] bg-[#111826] p-2.5 rounded-lg border border-[#1B2434] text-[12px] leading-relaxed">
                  {selectedLoc.status}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-[#111826] p-2.5 rounded-lg border border-[#1B2434]">
                  <span className="text-[10.5px] text-[#7C8AA3] font-mono block">EVACUATED</span>
                  <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">{selectedLoc.evacuated}</span>
                </div>
                <div className="bg-[#111826] p-2.5 rounded-lg border border-[#1B2434]">
                  <span className="text-[10.5px] text-[#7C8AA3] font-mono block">CONFIDENCE</span>
                  <span className="text-sm font-semibold text-cyan-400 mt-0.5 block font-mono">
                    {missingDataMode ? Math.max(40, (selectedLoc.confidence || 90) - 25) : selectedLoc.confidence || 94}%
                  </span>
                </div>
              </div>

              <div className="bg-[#111826] p-2.5 rounded-lg border border-[#1B2434]">
                <span className="text-[10.5px] text-[#7C8AA3] font-mono block">DEPLOYED UNITS</span>
                <span className="text-[12px] text-[#B7C0D1] font-medium mt-0.5 block">{selectedLoc.teams}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1B2434] text-[11px] text-[#7C8AA3] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" /> Click markers to view telemetry details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
