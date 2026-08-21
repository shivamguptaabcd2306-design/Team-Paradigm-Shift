import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, Eye, MapPin, ShieldAlert, Cross, Tent, Truck } from "lucide-react";

import {
  DHEMAJI_CENTER,
  PRE_DISASTER_REGION,
  POST_DISASTER_REGION,
  AI_CLASSIFIED_REGIONS,
  BUILDINGS,
  ROADS,
  FLOOD_ZONES,
  HOSPITALS_AND_CAMPS,
} from "./disasterData";

function getBuildingColor(damage) {
  switch (damage) {
    case "SEVERE": return "#ef4444";
    case "HIGH": return "#f97316";
    case "MODERATE": return "#eab308";
    case "LOW": return "#22c55e";
    default: return "#64748b";
  }
}

function getRoadColor(status) {
  switch (status) {
    case "BLOCKED": return "#ef4444";
    case "PARTIALLY_BLOCKED": return "#f97316";
    case "OPEN": return "#22c55e";
    default: return "#64748b";
  }
}

export default function DisasterMap({
  title = "TACTICAL GIS DISASTER INUNDATION MAP",
  type: initialType = "ai",
  affectedLocations = [],
  missingDataMode = false,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [mapMode, setMapMode] = useState(initialType);
  const [layers, setLayers] = useState({
    buildings: true,
    roads: true,
    flood: true,
    telemetry: true,
    campsAndHospitals: true,
  });

  const toggleLayer = (layerName) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: DHEMAJI_CENTER,
      zoom: 12,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const allLayers = [];

    // PRE DISASTER BASELINE REGION
    if (mapMode === "pre" || mapMode === "ai") {
      const polygon = L.polygon(PRE_DISASTER_REGION, {
        color: "#22c55e",
        weight: 2,
        fillColor: "#22c55e",
        fillOpacity: mapMode === "pre" ? 0.35 : 0.1,
      }).addTo(map);

      polygon.bindPopup(`
        <div style="min-width:180px;">
          <b style="color:#22c55e;">PRE-DISASTER BASELINE REGION</b><br/>
          <span>Baseline geographical extent prior to inundation event.</span>
        </div>
      `);
      polygon.bindTooltip("Pre-disaster Baseline");
      allLayers.push(polygon);
    }

    // POST DISASTER FLOODED REGION
    if (mapMode === "post" || mapMode === "ai") {
      const polygon = L.polygon(POST_DISASTER_REGION, {
        color: "#ef4444",
        weight: 3,
        fillColor: "#ef4444",
        fillOpacity: mapMode === "post" ? 0.4 : 0.15,
      }).addTo(map);

      polygon.bindPopup(`
        <div style="min-width:180px;">
          <b style="color:#ef4444;">POST-DISASTER FLOODED REGION</b><br/>
          <span>Satellite-detected inundation boundary.</span>
        </div>
      `);
      polygon.bindTooltip("Post-disaster Affected Region");
      allLayers.push(polygon);
    }

    // FLOOD EXTENT POLYGONS
    if (layers.flood && (mapMode === "post" || mapMode === "ai")) {
      FLOOD_ZONES.forEach((zone) => {
        const floodPoly = L.polygon(zone.coordinates, {
          color: "#38bdf8",
          weight: 2,
          fillColor: "#38bdf8",
          fillOpacity: 0.35,
        }).addTo(map);

        floodPoly.bindPopup(`
          <div style="min-width:180px;">
            <b style="color:#38bdf8;">${zone.name}</b><br/>
            <span>AI Flood Confidence: <b>${(zone.confidence * 100).toFixed(1)}%</b></span>
          </div>
        `);
        allLayers.push(floodPoly);
      });
    }

    // AI CLASSIFIED SEVERITY ZONES
    if (mapMode === "ai") {
      AI_CLASSIFIED_REGIONS.forEach((region) => {
        const poly = L.polygon(region.coordinates, {
          color: region.color,
          weight: 2,
          fillColor: region.color,
          fillOpacity: 0.2,
        }).addTo(map);

        poly.bindPopup(`<b>${region.name} SEVERITY ZONE</b><br/>AI Classified hazard risk area.`);
        allLayers.push(poly);
      });
    }

    // BUILDINGS DAMAGE POLYGONS
    if (layers.buildings && mapMode === "ai") {
      BUILDINGS.forEach((b) => {
        const color = getBuildingColor(b.damage);
        const poly = L.polygon(b.coordinates, {
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.8,
        }).addTo(map);

        poly.bindPopup(`
          <div style="min-width:200px; font-family:sans-serif; color:#1e293b;">
            <div style="font-weight:bold; font-size:14px; margin-bottom:4px; border-bottom:1px solid #cbd5e1; padding-bottom:3px;">
              ${b.name} (${b.id})
            </div>
            <div style="margin-bottom:4px;">
              <b>Damage Level:</b> <span style="color:${color}; font-weight:bold;">${b.damage}</span>
            </div>
            <div style="margin-bottom:4px;">
              <b>AI Confidence:</b> ${(b.confidence * 100).toFixed(1)}%
            </div>
            <div style="margin-bottom:4px;">
              <b>Emergency Priority:</b> <span style="font-size:11px; background:#f1f5f9; padding:2px 4px; border-radius:3px;">${b.priority}</span>
            </div>
            <div>
              <b>Assigned Inspector:</b> ${b.inspectors}
            </div>
          </div>
        `);
        poly.bindTooltip(`${b.id} — ${b.damage}`);
        allLayers.push(poly);
      });
    }

    // ROADS STATUS POLYLINES
    if (layers.roads && mapMode === "ai") {
      ROADS.forEach((r) => {
        const color = getRoadColor(r.status);
        const line = L.polyline(r.coordinates, {
          color: color,
          weight: 7,
          opacity: 0.95,
        }).addTo(map);

        line.bindPopup(`
          <div style="min-width:220px; font-family:sans-serif; color:#1e293b;">
            <div style="font-weight:bold; font-size:14px; margin-bottom:4px; border-bottom:1px solid #cbd5e1; padding-bottom:3px;">
              ${r.name} (${r.id})
            </div>
            <div style="margin-bottom:4px;">
              <b>Road Status:</b> <span style="color:${color}; font-weight:bold;">${r.status}</span>
            </div>
            <div style="margin-bottom:4px;">
              <b>Blocked Length:</b> ${r.lengthBlocked}
            </div>
            <div style="margin-bottom:4px;">
              <b>Obstruction:</b> ${r.obstructionType}
            </div>
            <div>
              <b>Routing Priority:</b> <span style="font-size:11px; background:#f1f5f9; padding:2px 4px; border-radius:3px;">${r.priority}</span>
            </div>
          </div>
        `);
        line.bindTooltip(`${r.name} — ${r.status}`);
        allLayers.push(line);
      });
    }

    // HOSPITALS & RELIEF CAMPS MARKERS
    if (layers.campsAndHospitals) {
      HOSPITALS_AND_CAMPS.forEach((item) => {
        const isHospital = item.type === "HOSPITAL";
        const markerColor = isHospital ? "#ec4899" : item.type === "RELIEF_CAMP" ? "#10b981" : "#8b5cf6";
        const marker = L.circleMarker(item.coords, {
          radius: 9,
          fillColor: markerColor,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:210px; font-family:sans-serif; color:#1e293b;">
            <div style="font-weight:bold; font-size:14px; color:${markerColor}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:4px;">
              ${item.name}
            </div>
            <div><b>Type:</b> ${item.type}</div>
            <div><b>Status:</b> ${item.status}</div>
            ${item.bedsAvailable !== undefined ? `<div><b>Available Beds:</b> ${item.bedsAvailable}/${item.bedsTotal}</div>` : ""}
            ${item.shelteredPeople !== undefined ? `<div><b>Sheltered Citizens:</b> ${item.shelteredPeople}/${item.maxCapacity}</div>` : ""}
            ${item.foodStockDays !== undefined ? `<div><b>Food Rations:</b> ${item.foodStockDays} days remaining</div>` : ""}
          </div>
        `);
        allLayers.push(marker);
      });
    }

    // TELEMETRY STATIONS MARKERS
    if (layers.telemetry && affectedLocations.length > 0) {
      affectedLocations.forEach((loc) => {
        if (loc.coords) {
          const marker = L.circleMarker(loc.coords, {
            radius: 8,
            fillColor: missingDataMode ? "#f43f5e" : "#06b6d4",
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
          }).addTo(map);

          marker.bindPopup(`
            <div style="min-width:180px;">
              <b>${loc.name} Gauge Station</b><br/>
              <b>Status:</b> ${loc.severity}<br/>
              <p style="margin-top:4px; font-size:12px; color:#475569;">${loc.note}</p>
            </div>
          `);
          allLayers.push(marker);
        }
      });
    }

    if (allLayers.length > 0) {
      const group = L.featureGroup(allLayers);
      map.fitBounds(group.getBounds(), { padding: [30, 30] });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapMode, layers, affectedLocations, missingDataMode]);

  return (
    <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      {/* HEADER & VIEW CONTROLS */}
      <div className="px-5 py-4 border-b border-white/10 bg-[#090E1A]/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#E7ECF5]">{title}</h3>
            <p className="text-[11px] text-[#8B96AC] font-mono">ASSAM FLOOD RESPONSE — DHEMAJI SECTOR GIS GRID</p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#090E1A] border border-white/10 p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setMapMode("ai")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                mapMode === "ai" ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30" : "text-[#7C8AA3] hover:text-[#E7ECF5]"
              }`}
            >
              AI Multi-Layer
            </button>
            <button
              onClick={() => setMapMode("pre")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                mapMode === "pre" ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30" : "text-[#7C8AA3] hover:text-[#E7ECF5]"
              }`}
            >
              Pre-Disaster
            </button>
            <button
              onClick={() => setMapMode("post")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                mapMode === "post" ? "bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30" : "text-[#7C8AA3] hover:text-[#E7ECF5]"
              }`}
            >
              Post-Disaster
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE LAYER TOGGLE BAR */}
      <div className="px-5 py-2.5 bg-[#0F172A]/90 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#8B96AC]">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-[#E7ECF5]">MAP LAYERS:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {mapMode === "ai" && (
            <>
              <button
                onClick={() => toggleLayer("buildings")}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                  layers.buildings
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                    : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
                }`}
              >
                <Eye className="w-3 h-3" /> Buildings ({BUILDINGS.length})
              </button>

              <button
                onClick={() => toggleLayer("roads")}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                  layers.roads
                    ? "bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                    : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
                }`}
              >
                <Eye className="w-3 h-3" /> Blocked Roads ({ROADS.length})
              </button>
            </>
          )}

          <button
            onClick={() => toggleLayer("flood")}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.flood
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Flood Inundation
          </button>

          <button
            onClick={() => toggleLayer("campsAndHospitals")}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.campsAndHospitals
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Hospitals & Camps ({HOSPITALS_AND_CAMPS.length})
          </button>

          <button
            onClick={() => toggleLayer("telemetry")}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.telemetry
                ? "bg-violet-500/15 border-violet-500/40 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.15)]"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Stream Gauges
          </button>
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div ref={mapRef} style={{ width: "100%", height: "480px" }} className="z-10" />

      {/* LEGEND FOOTER */}
      <div className="px-5 py-3 bg-[#090E1A] border-t border-white/10 text-[11px] font-mono flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3.5 items-center">
          <span className="text-[#7C8AA3] font-semibold">LEGEND:</span>
          {mapMode === "ai" && (
            <>
              <span className="text-rose-400">■ SEVERE DAMAGE</span>
              <span className="text-orange-400">■ HIGH</span>
              <span className="text-yellow-400">■ MODERATE</span>
              <span className="text-emerald-400">■ LOW</span>
              <span className="text-rose-400">━ BLOCKED ROAD</span>
              <span className="text-orange-400">━ PARTIAL</span>
              <span className="text-emerald-400">━ OPEN</span>
              <span className="text-pink-400">● HOSPITAL</span>
              <span className="text-emerald-400">● RELIEF CAMP</span>
            </>
          )}
        </div>

        {missingDataMode && (
          <span className="text-rose-400 flex items-center gap-1 animate-pulse font-bold">
            <ShieldAlert className="w-3.5 h-3.5" /> Sensor Outage Interpolation Active
          </span>
        )}
      </div>
    </div>
  );
}