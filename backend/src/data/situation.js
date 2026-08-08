// ---------------------------------------------------------------------------
// MOCK DATA — Hydro-Meteorological Telemetry & Simulation Dataset
// Integrated with Hackathon Benchmark Metrics & Historical Event Frames
// ---------------------------------------------------------------------------

export const disasterInfo = {
  type: "Heavy Rainfall & River Basin Flood",
  status: "Hydro-Meteorological Alert",
  severity: "Critical",
  region: "Kolab Basin, Koraput District (Odisha — State LGD 21, District LGD 376)",
  startedAt: "06:00 IST",
  confidence: 94, // % confidence score
  hasMissingDataWindow: false,
};

// Benchmark metrics for Post-Event Evaluation Report (MVD #4)
export const evaluationMetrics = {
  detectionLeadTimeMinutes: 42,
  spatialIoUAccuracyPct: 88.4,
  planFeasibilityScorePct: 94.0,
  falseAlarmRatePct: 4.2,
  predictedInundationKm2: 18.6,
  actualInundationKm2: 19.2,
  evacuationSuccessPct: 96.5,
};

// Historical Event Replay Timeframes (MVD #1)
export const timelineFrames = [
  {
    time: "06:00 IST",
    label: "Initial Surge",
    rainfallMax: "110.0 mm",
    activeGaugeCount: 2,
    inundationSeverity: "Moderate",
    confidence: 96,
  },
  {
    time: "07:00 IST",
    label: "Embankment Overflow",
    rainfallMax: "152.0 mm",
    activeGaugeCount: 3,
    inundationSeverity: "High",
    confidence: 91,
  },
  {
    time: "08:00 IST",
    label: "Peak Basin Inundation",
    rainfallMax: "184.5 mm",
    activeGaugeCount: 4,
    inundationSeverity: "Critical",
    confidence: 84, // Reduced during heavy cloud obscuration
  },
  {
    time: "09:00 IST",
    label: "Stabilization & Rescue Ops",
    rainfallMax: "184.5 mm",
    activeGaugeCount: 4,
    inundationSeverity: "Critical",
    confidence: 94,
  },
];

export const evacuationRoutes = [
  {
    id: "route-1",
    name: "Primary Evacuation Corridor Alpha",
    from: "Sector 4 — Riverside Colony",
    to: "Primary Shelter Ground",
    status: "Active Evacuation",
    hazardLevel: "High Risk",
    distanceKm: 2.4,
  },
  {
    id: "route-2",
    name: "Secondary Bypass Route Beta",
    from: "Sector 4 — Main Market Road",
    to: "Semiliguda Relief Center",
    status: "Clear Corridor",
    hazardLevel: "Moderate",
    distanceKm: 3.8,
  },
];

export const affectedLocations = [
  { name: "Kolab Dam Station", severity: "Critical", note: "Agency: CWC | River: Kolab | Basin: Godavari | Daily Rainfall: 184.5 mm | Lat: 18.8135° N, Long: 82.7123° E" },
  { name: "Semiliguda Gauge", severity: "High", note: "Agency: State WRD | River: Sabari Tributary | Daily Rainfall: 152.0 mm | Lat: 18.7071° N, Long: 82.8681° E" },
  { name: "Laxmipur Station", severity: "High", note: "Agency: CWRDM | Local River: Muran Stream | Daily Rainfall: 128.5 mm | Lat: 18.9892° N, Long: 83.1189° E" },
  { name: "Jeypore Bridge Gauge", severity: "Moderate", note: "Agency: CWC | River: Upper Kolab | Daily Rainfall: 95.0 mm | Lat: 18.8576° N, Long: 82.5694° E" },
  { name: "Boipariguda Station", severity: "Moderate", note: "Agency: State WRD | Basin: Godavari Sub-basin | Daily Rainfall: 82.0 mm | Lat: 18.7523° N, Long: 82.4312° E" },
];

export const statCards = [
  { key: "incidents", icon: "Activity", label: "Max Rainfall (24h)", value: "184.5 mm", delta: 42.5, goodDirection: "down", accent: "rose" },
  { key: "rescue", icon: "AlertTriangle", label: "Active Telemetry Stations", value: 12, delta: 0, goodDirection: "up", accent: "orange" },
  { key: "available", icon: "Users", label: "Stations Above Danger", value: 4, delta: 2, goodDirection: "down", accent: "cyan" },
  { key: "deployed", icon: "Truck", label: "Field Survey Teams", value: 8, delta: 3, goodDirection: "up", accent: "violet" },
];

export const resources = [
  { name: "Rain Gauges Active", available: 12, total: 15, unit: "stations", icon: "Droplet" },
  { name: "Water Level Sensors", available: 8, total: 10, unit: "units", icon: "Activity" },
  { name: "Telemetry Recorders", available: 14, total: 14, unit: "active", icon: "Radio" },
  { name: "Field Inspection Vans", available: 5, total: 8, unit: "vehicles", icon: "Truck" },
  { name: "Emergency Flood Kits", available: 350, total: 500, unit: "kits", icon: "Package" },
];

export const initialReports = [
  { source: "CWC Telemetry Station #101", location: "Kolab Dam Station (Koraput)", time: "06:00 IST", message: "Acquisition Time 06:00 IST: Manual Daily Rainfall recorded 184.5 mm. Local river level surging rapidly in Kolab River Basin." },
  { source: "State WRD Station #102", location: "Semiliguda Gauge (Semiliguda)", time: "06:45 IST", message: "Acquisition Time 06:45 IST: Manual Daily Rainfall 152.0 mm. Sabari Tributary gauge approaching warning mark." },
  { source: "CWRDM Station #103", location: "Laxmipur Station (Laxmipur)", time: "07:15 IST", message: "Acquisition Time 07:15 IST: Manual Daily Rainfall 128.5 mm. Subtributary Muran River overflowing bank spillways." },
];

export const incomingQueue = [
  { source: "CWC Sensor Station #104", location: "Jeypore Bridge Gauge", message: "Acquisition Time 07:30 IST: Manual Daily Rainfall 95.0 mm. Upper Kolab River flow velocity 3.2 m/s." },
  { source: "State WRD Station #105", location: "Boipariguda Station", message: "Acquisition Time 07:45 IST: Manual Daily Rainfall 82.0 mm. Sub-basin discharge steady at 420 cumecs." },
  { source: "Telemetry Alert", location: "Kolab Dam Station (Koraput)", message: "Acquisition Time 08:00 IST: Cumulative 3-hour precipitation exceeds 65 mm. Threshold breach triggered." },
  { source: "CWC Field Survey", location: "Semiliguda Block", message: "Acquisition Time 08:15 IST: Local river gauge reading +1.4m above normal zero level." },
  { source: "District Disaster Cell", location: "Laxmipur Tehsil", message: "Acquisition Time 08:30 IST: Flood alert forwarded to Village Panchayat based on 128.5 mm rainfall telemetry." },
];
