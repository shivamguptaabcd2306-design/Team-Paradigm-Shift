import { useState, useEffect } from "react";
import { Play, Pause, FastForward, RotateCcw, AlertTriangle, ShieldAlert, Activity, Repeat } from "lucide-react";

export default function EventReplayBar({
  timelineFrames = [],
  currentFrameIndex,
  setCurrentFrameIndex,
  missingDataMode,
  setMissingDataMode,
  confidenceScore = 94,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoLoop, setAutoLoop] = useState(true);

  const frames = timelineFrames.length > 0 ? timelineFrames : [
    { time: "06:00 IST", label: "Initial Water Level Surge", rainfallMax: "110.0 mm", confidence: 96 },
    { time: "07:00 IST", label: "Embankment Breach Detected", rainfallMax: "152.0 mm", confidence: 91 },
    { time: "08:00 IST", label: "Peak Flood Inundation", rainfallMax: "184.5 mm", confidence: 84 },
    { time: "09:00 IST", label: "Stabilization & Rescue Deployment", rainfallMax: "184.5 mm", confidence: 94 },
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev >= frames.length - 1) {
            if (autoLoop) return 0;
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, frames.length, autoLoop, setCurrentFrameIndex]);

  const currentFrame = frames[currentFrameIndex] || frames[0];
  const effectiveConfidence = missingDataMode ? Math.max(35, confidenceScore - 26) : confidenceScore;

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-2xl p-4 shadow-xl space-y-4">
      {/* Header & Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B2434] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <Activity className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#E7ECF5]">Historical & Synthetic Event Replay Engine</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30">
                MVD SIMULATION
              </span>
            </div>
            <p className="text-[11.5px] text-[#7C8AA3]">Sequential sensor telemetry replay & hazard propagation</p>
          </div>
        </div>

        {/* Playback Button Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#0D1420] border border-[#1B2434] p-1 rounded-xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isPlaying
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pause Replay" : "Play Replay"}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentFrameIndex(0);
              }}
              className="p-1.5 rounded-lg text-[#7C8AA3] hover:text-[#E7ECF5] hover:bg-[#1B2434] transition-colors"
              title="Reset Timeline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setAutoLoop(!autoLoop)}
              className={`p-1.5 rounded-lg transition-colors ${
                autoLoop ? "text-cyan-400 bg-cyan-500/10" : "text-[#7C8AA3] hover:text-[#E7ECF5]"
              }`}
              title={autoLoop ? "Auto-loop Enabled" : "Auto-loop Disabled"}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 px-2 border-l border-[#1B2434] text-[11px] font-mono text-[#7C8AA3]">
              <FastForward className="w-3 h-3 text-cyan-400" />
              {[1, 2, 5, 10].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded ${
                    playbackSpeed === spd ? "bg-cyan-500/20 text-cyan-400 font-bold" : "hover:text-[#E7ECF5]"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Missing Data Toggle */}
          <button
            onClick={() => setMissingDataMode(!missingDataMode)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              missingDataMode
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                : "bg-[#0D1420] text-[#7C8AA3] border-[#1B2434] hover:text-[#B7C0D1]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            {missingDataMode ? "Missing Data Mode ACTIVE" : "Simulate Telemetry Outage"}
          </button>
        </div>
      </div>

      {/* Range Slider Scrubber */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#7C8AA3]">CURRENT TIMEFRAME:</span>
            <span className="text-cyan-400 font-bold">{currentFrame.time}</span>
            <span className="text-[#3A4560]">•</span>
            <span className="text-[#E7ECF5]">{currentFrame.label}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#7C8AA3]">RAINFALL:</span>
            <span className="text-rose-400 font-bold">{currentFrame.rainfallMax}</span>
            <span className="text-[#3A4560]">•</span>
            <span className="text-[#7C8AA3]">MODEL CONFIDENCE:</span>
            <span
              className={`font-bold ${
                effectiveConfidence > 85 ? "text-emerald-400" : effectiveConfidence > 65 ? "text-amber-400" : "text-rose-400"
              }`}
            >
              {effectiveConfidence}% {missingDataMode ? "(Interpolated)" : ""}
            </span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max={frames.length - 1}
          value={currentFrameIndex}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentFrameIndex(Number(e.target.value));
          }}
          className="w-full h-2 bg-[#0D1420] border border-[#1B2434] rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        {/* Step Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {frames.map((f, idx) => {
            const isCurrent = idx === currentFrameIndex;
            return (
              <button
                key={f.time}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentFrameIndex(idx);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? "bg-cyan-500/15 border-cyan-500/40 ring-1 ring-cyan-500/30"
                    : "bg-[#0D1420] border-[#1B2434] hover:border-[#3A4560]"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isCurrent ? "text-cyan-400 font-bold" : "text-[#7C8AA3]"}>{f.time}</span>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div className="text-xs font-medium text-[#E7ECF5] truncate">{f.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outage Warning Banner */}
      {missingDataMode && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-rose-400 font-mono">[UNCERTAINTY ALERT]: </span>
            Telemetry dropout detected at Station #103. System safe fallback active: spatial stream gauge interpolation with safety buffer.
          </div>
        </div>
      )}
    </div>
  );
}
