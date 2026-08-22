import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  Eye,
  MapPin,
  ShieldAlert,
  Tent,
  Cross,
  Activity,
  Route,
  Info,
  Maximize2,
  Minimize2,
  RotateCcw,
  Compass,
  Radio,
  Satellite,
  Clock,
  HeartPulse,
} from "lucide-react";

import {
  GOLAGHAT_CENTER,
  GOLAGHAT_DEFAULT_ZOOM,
  BASE_LAYERS,
  GOLAGHAT_DISTRICT_BOUNDARY,
  GOLAGHAT_RIVERS,
  GOLAGHAT_CIRCLES_GEO,
  GOLAGHAT_GAUGES_GEO,
  GOLAGHAT_ROADS_GEO,
  GOLAGHAT_FACILITIES_GEO,
  GOLAGHAT_HOSPITALS,
  GOLAGHAT_DEFENSES_GEO,
  GOLAGHAT_INUNDATION_ZONES,
} from "./disasterData.js";

export default function DisasterMap({
  title = "OPERATIONAL INUNDATION & INFRASTRUCTURE MAP",
  subtitle = "Golaghat District GIS: Revenue Circles, Dhansiri Gauges, NH-715 Corridor, Hospitals & Relief Shelters",
  height = "560px",
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState("dark");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ lat: 26.5200, lng: 93.9700 });
  const [selectedCircle, setSelectedCircle] = useState("all");

  const [layers, setLayers] = useState({
    inundation: true,
    rivers: true,
    gauges: true,
    circles: true,
    roads: true,
    facilities: true,
    hospitals: true,
    defenses: true,
  });

  const toggleLayer = (layerName) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(GOLAGHAT_CENTER, GOLAGHAT_DEFAULT_ZOOM, {
        animate: true,
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const activeLayerCount = Object.values(layers).filter(Boolean).length;

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: GOLAGHAT_CENTER,
      zoom: GOLAGHAT_DEFAULT_ZOOM,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Add scale bar
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

    // Track mouse coordinates
    map.on("mousemove", (e) => {
      setMouseCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4)),
      });
    });

    // Base Layer Initialization
    const baseConfig = BASE_LAYERS[activeBaseLayer] || BASE_LAYERS.dark;
    tileLayerRef.current = L.tileLayer(baseConfig.url, {
      attribution: baseConfig.attribution,
      maxZoom: baseConfig.maxZoom || 19,
      subdomains: baseConfig.subdomains || "abc",
    }).addTo(map);

    // 1. GOLAGHAT DISTRICT OUTER BOUNDARY
    const districtPolygon = L.polygon(GOLAGHAT_DISTRICT_BOUNDARY, {
      color: "#22d3ee",
      weight: 2,
      dashArray: "6, 6",
      fillColor: "#0284c7",
      fillOpacity: 0.05,
    }).addTo(map);
    districtPolygon.bindTooltip("Golaghat District Boundary", { sticky: true });

    // 2. INUNDATION EXTENT LAYER (NRSC / ISRO SATELLITE DERIVED)
    if (layers.inundation) {
      GOLAGHAT_INUNDATION_ZONES.forEach((zone) => {
        const poly = L.polygon(zone.polygon, {
          color: zone.color,
          weight: 1.5,
          fillColor: zone.color,
          fillOpacity: zone.fillOpacity,
        }).addTo(map);

        poly.bindPopup(`
          <div style="min-width:220px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${zone.color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:4px;">
              ${zone.name}
            </div>
            <div style="font-size:11.5px;"><b>Observation Agency:</b> ${zone.source}</div>
            <div style="font-size:11.5px;"><b>Satellite Sensor:</b> ${zone.satellite}</div>
            <div style="font-size:11.5px;"><b>Observation Time:</b> ${zone.observation}</div>
            <div style="font-size:11px; color:#b91c1c; margin-top:2px;"><b>Status:</b> ${zone.status}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Limitation: Satellite SAR observation may contain standing rainwater.
            </div>
          </div>
        `);
        poly.bindTooltip(zone.name, { sticky: true });
      });
    }

    // 3. REVENUE CIRCLES LAYER (ADMINISTRATIVE HIERARCHY)
    if (layers.circles) {
      const filteredCircles =
        selectedCircle === "all"
          ? GOLAGHAT_CIRCLES_GEO
          : GOLAGHAT_CIRCLES_GEO.filter((c) => c.circle.includes(selectedCircle));

      filteredCircles.forEach((c) => {
        const isCritical = c.severity === "Critical";
        const color = isCritical ? "#ef4444" : c.severity === "High" ? "#f97316" : "#eab308";

        if (c.polygon) {
          const poly = L.polygon(c.polygon, {
            color: color,
            weight: 1.5,
            fillColor: color,
            fillOpacity: 0.12,
          }).addTo(map);

          poly.bindTooltip(`<b>${c.circle}</b><br/>${(c.populationAffected / 1000).toFixed(1)}K affected`, {
            sticky: true,
          });
        }

        const marker = L.circleMarker(c.center, {
          radius: Math.max(12, Math.min(24, Math.sqrt(c.populationAffected / 120))),
          fillColor: color,
          color: "#ffffff",
          weight: 2,
          opacity: 0.95,
          fillOpacity: 0.7,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:230px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13.5px; color:${color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:4px;">
              ${c.circle}
            </div>
            <div style="font-size:11.5px;"><b>Sub-division:</b> ${c.subdivision}</div>
            <div style="font-size:11.5px;"><b>Population Affected:</b> ${c.populationAffected.toLocaleString()} (${c.familiesAffected.toLocaleString()} families)</div>
            <div style="font-size:11.5px;"><b>Villages Submerged:</b> ${c.villagesAffected}</div>
            <div style="font-size:11.5px;"><b>Casualties:</b> ${c.deaths} confirmed</div>
            <div style="font-size:11.5px;"><b>Houses Damaged:</b> ${c.housesDamaged.toLocaleString()}</div>
            <div style="font-size:11.5px;"><b>Crop Area Hit:</b> ${c.cropAreaHa.toLocaleString()} ha</div>
            <div style="font-size:11.5px;"><b>Active Relief Camps:</b> ${c.reliefCamps} (${c.campInmates.toLocaleString()} inmates)</div>
            <div style="font-size:11.5px; color:#475569; margin-top:2px;"><b>Situation:</b> ${c.status}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Source: ${c.source} | Date: 22 Aug 2026
            </div>
          </div>
        `);
      });
    }

    // 4. RIVERS LAYER
    if (layers.rivers) {
      GOLAGHAT_RIVERS.forEach((river) => {
        const polyline = L.polyline(river.coordinates, {
          color: river.color,
          weight: river.weight,
          opacity: 0.9,
          dashArray: river.status.includes("Above") ? "6, 4" : undefined,
        }).addTo(map);

        polyline.bindPopup(`
          <div style="min-width:200px; font-family:sans-serif; color:#0f172a;">
            <div style="font-weight:bold; font-size:13px; color:${river.color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px;">
              ${river.name}
            </div>
            <div style="font-size:12px; margin-top:4px;"><b>Hydrological Status:</b> ${river.status}</div>
            <div style="font-size:10.5px; color:#64748b; margin-top:2px;">Agency: CWC & Assam WRD (Dhansiri Division)</div>
          </div>
        `);
        polyline.bindTooltip(river.name, { sticky: true });
      });
    }

    // 5. CWC & WRD RIVER GAUGES LAYER
    if (layers.gauges) {
      GOLAGHAT_GAUGES_GEO.forEach((g) => {
        const isAbove = g.status.includes("ABOVE");
        const markerColor = isAbove ? "#dc2626" : "#0284c7";

        const marker = L.circleMarker(g.coords, {
          radius: 9,
          fillColor: markerColor,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:215px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${markerColor}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:4px;">
              ${g.station}
            </div>
            <div style="font-size:12px;"><b>River & Circle:</b> ${g.river} (${g.circle})</div>
            <div style="font-size:12px;"><b>Current Water Level:</b> <span style="font-weight:bold; color:${markerColor}; font-size:13px;">${g.level.toFixed(2)} m</span></div>
            <div style="font-size:12px;"><b>Danger Level:</b> ${g.danger.toFixed(2)} m</div>
            <div style="font-size:12px;"><b>Highest Flood Level (HFL):</b> ${g.hfl.toFixed(2)} m</div>
            <div style="font-size:12px;"><b>Trend:</b> <span style="font-weight:bold;">${g.trend}</span></div>
            <div style="font-size:12px; color:${isAbove ? "#dc2626" : "#0284c7"}; font-weight:bold;">${g.status}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Agency: ${g.agency} | Obs: ${g.lastObs}
            </div>
          </div>
        `);
        marker.bindTooltip(`Gauge: ${g.station} (${g.level}m)`);
      });
    }

    // 6. ROADS & CONNECTIVITY STATUS LAYER
    if (layers.roads) {
      GOLAGHAT_ROADS_GEO.forEach((road) => {
        const polyline = L.polyline(road.coords, {
          color: road.color,
          weight: road.status === "RESTRICTED" || road.status === "CLOSED" ? 5 : 4,
          opacity: 0.95,
          dashArray: road.status === "RESTRICTED" ? "8, 6" : road.status === "CLOSED" ? "4, 6" : undefined,
        }).addTo(map);

        polyline.bindPopup(`
          <div style="min-width:210px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${road.color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:4px;">
              ${road.name}
            </div>
            <div style="font-size:12px;"><b>Category:</b> ${road.category}</div>
            <div style="font-size:12px;"><b>Operational Status:</b> <span style="font-weight:bold; color:${road.color};">${road.status}</span></div>
            <div style="font-size:12px;"><b>Connectivity:</b> ${road.connectivity}</div>
            <div style="font-size:11.5px; margin-top:2px; color:#475569;"><b>Details:</b> ${road.details}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Source: Assam PWD (Golaghat Roads Division)
            </div>
          </div>
        `);
        polyline.bindTooltip(`${road.name}: ${road.status}`, { sticky: true });
      });
    }

    // 7. RELIEF CAMPS LAYER
    if (layers.facilities) {
      GOLAGHAT_FACILITIES_GEO.filter((f) => f.type === "RELIEF_CAMP").forEach((item) => {
        const color = "#10b981";

        const marker = L.circleMarker(item.coords, {
          radius: 7,
          fillColor: color,
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:215px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:3px;">
              ${item.name}
            </div>
            <div style="font-size:11.5px;"><b>Circle:</b> ${item.circle}</div>
            <div style="font-size:11.5px;"><b>Type:</b> Active Flood Relief Shelter</div>
            <div style="font-size:11.5px;"><b>Inmates Sheltered:</b> <span style="font-weight:bold; color:#10b981;">${item.inmates}</span> / ${item.capacity} capacity</div>
            <div style="font-size:11px; color:#0284c7;"><b>Drinking Water:</b> ${item.drinkingWater}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Authority: ${item.authority || "DDMA Golaghat"}
            </div>
          </div>
        `);
      });
    }

    // 8. HOSPITALS & HEALTH CENTRES LAYER
    if (layers.hospitals) {
      GOLAGHAT_HOSPITALS.forEach((hosp) => {
        const color = "#ec4899";

        // Estimate coords if not explicitly present
        const coords =
          hosp.id === "HOSP-01"
            ? [26.5150, 93.9740]
            : hosp.id === "HOSP-02"
            ? [26.5820, 93.6080]
            : hosp.id === "HOSP-03"
            ? [26.1800, 93.8100]
            : hosp.id === "HOSP-04"
            ? [26.6980, 93.9720]
            : hosp.id === "HOSP-05"
            ? [26.6340, 93.8820]
            : hosp.id === "HOSP-06"
            ? [26.6120, 93.7650]
            : hosp.id === "HOSP-07"
            ? [26.4200, 93.8200]
            : [26.6700, 93.8200];

        const marker = L.circleMarker(coords, {
          radius: 8.5,
          fillColor: color,
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:225px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:3px;">
              ${hosp.name}
            </div>
            <div style="font-size:11.5px;"><b>Type:</b> ${hosp.type}</div>
            <div style="font-size:11.5px;"><b>Location:</b> ${hosp.location}</div>
            <div style="font-size:11.5px;"><b>Beds:</b> ${hosp.bedCapacity} Total (<span style="color:#10b981; font-weight:bold;">${hosp.bedsAvailable} Available</span>)</div>
            <div style="font-size:11.5px;"><b>Emergency Phone:</b> <a href="tel:${hosp.emergencyContact.replace(/[^0-9+]/g, '')}" style="color:#0284c7; font-weight:bold;">${hosp.emergencyContact}</a></div>
            <div style="font-size:11px; color:#475569;"><b>Services:</b> ${hosp.medicalServices}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Source: ${hosp.source} | Status: ${hosp.status}
            </div>
          </div>
        `);
      });
    }

    // 9. DEFENSES & EMBANKMENT BREACHES LAYER
    if (layers.defenses) {
      GOLAGHAT_DEFENSES_GEO.forEach((def) => {
        const isBreach = def.type === "EMBANKMENT_BREACH";
        const color = isBreach ? "#dc2626" : "#f59e0b";

        const marker = L.circleMarker(def.coords, {
          radius: 8,
          fillColor: color,
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:210px; font-family:sans-serif; color:#0f172a; line-height:1.4;">
            <div style="font-weight:bold; font-size:13px; color:${color}; border-bottom:1px solid #cbd5e1; padding-bottom:3px; margin-bottom:3px;">
              ${def.name}
            </div>
            <div style="font-size:11.5px;"><b>River / Circle:</b> ${def.river} (${def.circle})</div>
            <div style="font-size:11.5px;"><b>Engineering Status:</b> <span style="font-weight:bold; color:${color};">${def.status.replace(/_/g, " ")}</span></div>
            <div style="font-size:11.5px; margin-top:2px; color:#475569;"><b>Details:</b> ${def.details}</div>
            <div style="font-size:10px; color:#64748b; margin-top:4px; border-top:1px dashed #e2e8f0; padding-top:2px;">
              Source: Assam Water Resources Dept (Dhansiri Division)
            </div>
          </div>
        `);
      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [layers, selectedCircle, activeBaseLayer]);

  return (
    <div
      className={`bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl space-y-0 transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : ""
      }`}
    >
      {/* 1. MAP HEADER & OPERATIONAL CONTEXT BAR */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-[#090E1A]/95 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{title}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold hidden sm:inline">
                Golaghat District GIS
              </span>
            </div>
            <p className="text-xs text-[#8B96AC] font-mono">{subtitle}</p>
          </div>
        </div>

        {/* CONTROLS: BASE LAYER SWITCHER, CIRCLE FILTER & FULLSCREEN */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Base Layer Switcher */}
          <div className="flex items-center gap-1 bg-[#090E1A] border border-white/10 p-1 rounded-xl text-xs font-mono">
            {Object.entries(BASE_LAYERS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveBaseLayer(key)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeBaseLayer === key
                    ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                    : "text-[#7C8AA3] hover:text-white"
                }`}
              >
                {config.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Revenue Circle Filter */}
          <select
            value={selectedCircle}
            onChange={(e) => setSelectedCircle(e.target.value)}
            className="bg-[#090E1A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-[#E7ECF5] font-mono focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All 5 Revenue Circles</option>
            <option value="Bokakhat">Bokakhat Circle (Critical)</option>
            <option value="Golaghat">Golaghat Sadar (Critical)</option>
            <option value="Khumtai">Khumtai Circle (High)</option>
            <option value="Dergaon">Dergaon Circle (Moderate)</option>
            <option value="Morangi">Morangi Circle (Moderate)</option>
          </select>

          {/* Reset View Button */}
          <button
            onClick={handleResetView}
            className="p-2 rounded-xl bg-[#090E1A] border border-white/10 text-[#7C8AA3] hover:text-white transition-colors"
            title="Reset to Golaghat Center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#090E1A] border border-white/10 text-[#7C8AA3] hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. REALISTIC OPERATIONAL STATUS STRIP */}
      <div className="px-5 py-2 bg-gradient-to-r from-sky-950/80 via-[#0B1324] to-slate-950/80 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span>
            <b>Inundation Layer:</b> NRSC / ISRO RISAT-1A SAR (Obs: 22 Aug 2026, 06:30 IST)
          </span>
        </div>
        <div className="text-[11px] text-[#7C8AA3] flex items-center gap-3">
          <span>Active Layers: <b className="text-cyan-400">{activeLayerCount}</b></span>
          <span>•</span>
          <span>Last data update: <b className="text-white">22 Aug 2026, 12:00 IST</b></span>
        </div>
      </div>

      {/* 3. INTERACTIVE DATA LAYER TOGGLE STRIP */}
      <div className="px-5 py-2.5 bg-[#0F172A]/95 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#8B96AC]">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">LAYERS:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => toggleLayer("inundation")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.inundation
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Inundation Extent
          </button>

          <button
            onClick={() => toggleLayer("circles")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.circles
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Revenue Circles ({GOLAGHAT_CIRCLES_GEO.length})
          </button>

          <button
            onClick={() => toggleLayer("rivers")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.rivers
                ? "bg-sky-500/20 border-sky-500/40 text-sky-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Rivers ({GOLAGHAT_RIVERS.length})
          </button>

          <button
            onClick={() => toggleLayer("gauges")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.gauges
                ? "bg-red-500/20 border-red-500/40 text-red-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Gauges ({GOLAGHAT_GAUGES_GEO.length})
          </button>

          <button
            onClick={() => toggleLayer("roads")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.roads
                ? "bg-violet-500/20 border-violet-500/40 text-violet-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Roads & Closures
          </button>

          <button
            onClick={() => toggleLayer("facilities")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.facilities
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Relief Camps (5)
          </button>

          <button
            onClick={() => toggleLayer("hospitals")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.hospitals
                ? "bg-pink-500/20 border-pink-500/40 text-pink-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Hospitals ({GOLAGHAT_HOSPITALS.length})
          </button>

          <button
            onClick={() => toggleLayer("defenses")}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              layers.defenses
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold"
                : "bg-[#090E1A] border-white/5 text-[#7C8AA3] opacity-60"
            }`}
          >
            <Eye className="w-3 h-3" /> Dyke Armoring ({GOLAGHAT_DEFENSES_GEO.length})
          </button>
        </div>
      </div>

      {/* 4. LEAFLET MAP CONTAINER */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: isFullscreen ? "calc(100vh - 150px)" : height }}
        className="z-10 bg-[#0B1324]"
      />

      {/* 5. LEGEND & COORDINATES FOOTER */}
      <div className="px-5 py-3 bg-[#090E1A] border-t border-white/10 text-[11px] font-mono flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3.5 items-center">
          <span className="text-[#7C8AA3] font-bold">STATUS LEGEND:</span>
          <span className="text-emerald-400 flex items-center gap-1">● Operational</span>
          <span className="text-amber-400 flex items-center gap-1">● Warning / Restricted</span>
          <span className="text-rose-400 flex items-center gap-1">● Critical / Above Danger</span>
          <span className="text-pink-400 flex items-center gap-1">● Referral Hospital</span>
          <span className="text-cyan-400 flex items-center gap-1">● Active Dyke Armoring</span>
        </div>

        <div className="text-[#7C8AA3] flex items-center gap-3">
          <span>Lat: <b className="text-white">{mouseCoords.lat}°N</b></span>
          <span>Lng: <b className="text-white">{mouseCoords.lng}°E</b></span>
          <span className="text-cyan-400 hidden sm:inline">Datum: WGS-84</span>
        </div>
      </div>
    </div>
  );
}