import { useState } from "react";
import { TrendingUp, Droplets, Waves, Users, ShieldAlert } from "lucide-react";

const TELEMETRY_DATA_24H = [
  { time: "00:00", waterLevel: 4.2, rainfall: 12, evacuated: 320, dangerThreshold: 8.5 },
  { time: "02:00", waterLevel: 4.8, rainfall: 24, evacuated: 450, dangerThreshold: 8.5 },
  { time: "04:00", waterLevel: 5.9, rainfall: 48, evacuated: 780, dangerThreshold: 8.5 },
  { time: "06:00", waterLevel: 7.4, rainfall: 110, evacuated: 1420, dangerThreshold: 8.5 },
  { time: "08:00", waterLevel: 9.1, rainfall: 152, evacuated: 2890, dangerThreshold: 8.5 },
  { time: "10:00", waterLevel: 10.5, rainfall: 184, evacuated: 4120, dangerThreshold: 8.5 },
  { time: "12:00", waterLevel: 11.2, rainfall: 165, evacuated: 5380, dangerThreshold: 8.5 },
  { time: "14:00", waterLevel: 10.8, rainfall: 120, evacuated: 6100, dangerThreshold: 8.5 },
  { time: "16:00", waterLevel: 9.9, rainfall: 85, evacuated: 6750, dangerThreshold: 8.5 },
  { time: "18:00", waterLevel: 9.2, rainfall: 45, evacuated: 7200, dangerThreshold: 8.5 },
  { time: "20:00", waterLevel: 8.6, rainfall: 22, evacuated: 7420, dangerThreshold: 8.5 },
  { time: "22:00", waterLevel: 8.1, rainfall: 10, evacuated: 7550, dangerThreshold: 8.5 },
];

export default function TelemetryAnalyticsChart() {
  const [activeRange, setActiveRange] = useState("24H");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [activeMetric, setActiveMetric] = useState("all");

  const data = activeRange === "6H" 
    ? TELEMETRY_DATA_24H.slice(3, 7)
    : activeRange === "12H" 
    ? TELEMETRY_DATA_24H.slice(2, 9)
    : TELEMETRY_DATA_24H;

  const maxWaterLevel = 13;
  const maxRainfall = 200;

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-2xl p-5 shadow-xl space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B2434] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-[#E7ECF5]">Hydrological & Telemetry Analytics</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                REAL-TIME SENSOR FEED
              </span>
            </div>
            <p className="text-[12px] text-[#7C8AA3]">River water level gauges, cumulative rainfall, and evacuation kinetics</p>
          </div>
        </div>

        {/* Range & Metric Selectors */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-[#0D1420] border border-[#1B2434] p-1 rounded-xl">
            {["6H", "12H", "24H"].map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeRange === range
                    ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40"
                    : "text-[#7C8AA3] hover:text-[#E7ECF5]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#0D1420] border border-[#1B2434] p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveMetric("all")}
              className={`px-2.5 py-1 rounded-lg ${activeMetric === "all" ? "bg-[#1B2434] text-white" : "text-[#7C8AA3]"}`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveMetric("water")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${activeMetric === "water" ? "bg-cyan-500/20 text-cyan-400" : "text-[#7C8AA3]"}`}
            >
              <Waves className="w-3 h-3" /> Water
            </button>
            <button
              onClick={() => setActiveMetric("rainfall")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${activeMetric === "rainfall" ? "bg-blue-500/20 text-blue-400" : "text-[#7C8AA3]"}`}
            >
              <Droplets className="w-3 h-3" /> Rain
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#0D1420] border border-[#1B2434] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7C8AA3] uppercase">Peak Water Level</div>
            <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">11.2 m</div>
            <div className="text-[11px] text-rose-300/80 mt-1 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> +2.7m above danger line
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <Waves className="w-5 h-5 text-rose-400" />
          </div>
        </div>

        <div className="bg-[#0D1420] border border-[#1B2434] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7C8AA3] uppercase">Peak Rainfall Rate</div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">184.5 mm/h</div>
            <div className="text-[11px] text-cyan-300/80 mt-1 flex items-center gap-1">
              <Droplets className="w-3 h-3" /> Flash flood trigger reached
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div className="bg-[#0D1420] border border-[#1B2434] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7C8AA3] uppercase">Total Evacuated</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">7,550 Citizens</div>
            <div className="text-[11px] text-emerald-300/80 mt-1 flex items-center gap-1">
              <Users className="w-3 h-3" /> 88.8% shelter capacity filled
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* SVG Time-Series Chart */}
      <div className="relative bg-[#0D1420] border border-[#1B2434] rounded-xl p-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#7C8AA3] mb-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> River Water Level (m)
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> Rainfall (mm)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-4 h-0 border-b-2 border-dashed border-rose-500 inline-block" /> Danger Threshold (8.5m)
            </span>
          </div>
          <div>HOVER FOR EXACT METRICS</div>
        </div>

        {/* SVG Container */}
        <div className="w-full h-64 overflow-hidden relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 60, 120, 180, 240].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#1B2434" strokeDasharray="3 3" strokeWidth="1" />
            ))}

            {/* Danger Threshold Line */}
            {(() => {
              const dangerY = 240 - (8.5 / maxWaterLevel) * 240;
              return (
                <line x1="0" y1={dangerY} x2="800" y2={dangerY} stroke="#ef4444" strokeDasharray="6 4" strokeWidth="2" opacity="0.8" />
              );
            })()}

            {/* Rainfall Bar chart */}
            {(activeMetric === "all" || activeMetric === "rainfall") &&
              data.map((pt, i) => {
                const step = 800 / (data.length - 1 || 1);
                const x = i * step;
                const barHeight = (pt.rainfall / maxRainfall) * 180;
                const y = 240 - barHeight;
                return (
                  <rect
                    key={`rain-${i}`}
                    x={x - 12}
                    y={y}
                    width="24"
                    height={barHeight}
                    fill="url(#rainGradient)"
                    rx="3"
                    opacity="0.45"
                  />
                );
              })}

            {/* River Water Level Area & Polyline */}
            {(activeMetric === "all" || activeMetric === "water") && (() => {
              const points = data.map((pt, i) => {
                const x = i * (800 / (data.length - 1 || 1));
                const y = 240 - (pt.waterLevel / maxWaterLevel) * 220;
                return `${x},${y}`;
              }).join(" ");

              const areaPoints = `0,240 ${points} 800,240`;

              return (
                <>
                  <polygon points={areaPoints} fill="url(#waterGradient)" opacity="0.35" />
                  <polyline points={points} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </>
              );
            })()}

            {/* Points & Interactive Tooltip triggers */}
            {data.map((pt, i) => {
              const x = i * (800 / (data.length - 1 || 1));
              const yWater = 240 - (pt.waterLevel / maxWaterLevel) * 220;
              const isDanger = pt.waterLevel >= pt.dangerThreshold;

              return (
                <g key={`pt-${i}`} className="cursor-pointer" onMouseEnter={() => setHoveredPoint({ ...pt, x, yWater })}>
                  <circle
                    cx={x}
                    cy={yWater}
                    r={isDanger ? "6" : "4"}
                    fill={isDanger ? "#ef4444" : "#22d3ee"}
                    stroke="#111826"
                    strokeWidth="2"
                    className="transition-all hover:r-8"
                  />
                </g>
              );
            })}

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hovered Point Card Popover */}
          {hoveredPoint && (
            <div
              className="absolute bg-[#111826] border border-cyan-500/40 rounded-xl p-3 shadow-2xl z-20 pointer-events-none text-xs space-y-1 transform -translate-x-1/2 -translate-y-full mb-3 font-mono"
              style={{ left: `${(hoveredPoint.x / 800) * 100}%`, top: "50px" }}
            >
              <div className="text-cyan-400 font-bold border-b border-[#1B2434] pb-1 flex items-center justify-between gap-3">
                <span>TIME: {hoveredPoint.time} IST</span>
                {hoveredPoint.waterLevel >= 8.5 && <span className="text-rose-400 text-[10px] font-mono px-1 rounded bg-rose-500/20">DANGER</span>}
              </div>
              <div className="flex justify-between gap-4 text-[#D5DBE8]">
                <span>Water Level:</span>
                <span className="font-bold text-cyan-300">{hoveredPoint.waterLevel} m</span>
              </div>
              <div className="flex justify-between gap-4 text-[#D5DBE8]">
                <span>Rainfall Intensity:</span>
                <span className="font-bold text-blue-300">{hoveredPoint.rainfall} mm/h</span>
              </div>
              <div className="flex justify-between gap-4 text-[#D5DBE8]">
                <span>Evacuated:</span>
                <span className="font-bold text-emerald-300">{hoveredPoint.evacuated}</span>
              </div>
            </div>
          )}
        </div>

        {/* X Axis Time Labels */}
        <div className="flex justify-between mt-3 text-[11px] font-mono text-[#7C8AA3]">
          {data.map((pt) => (
            <span key={pt.time}>{pt.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
