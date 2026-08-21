/*
  ============================================================
  DISASTER GIS DEMO DATA - ENHANCED FOR EODSS (DRISHTI PLAN)
  ============================================================
*/

export const DHEMAJI_CENTER = [27.47, 94.90];

/* ============================================================
   PRE-DISASTER REGION
   ============================================================ */
export const PRE_DISASTER_REGION = [
  [27.505, 94.855],
  [27.515, 94.875],
  [27.510, 94.910],
  [27.490, 94.935],
  [27.455, 94.925],
  [27.435, 94.895],
  [27.445, 94.865],
  [27.475, 94.850],
];

/* ============================================================
   POST-DISASTER / FLOOD AFFECTED REGION
   ============================================================ */
export const POST_DISASTER_REGION = [
  [27.525, 94.835],
  [27.540, 94.875],
  [27.525, 94.925],
  [27.495, 94.955],
  [27.450, 94.945],
  [27.420, 94.905],
  [27.430, 94.855],
  [27.475, 94.825],
];

/* ============================================================
   AI SEVERITY ZONES
   ============================================================ */
export const AI_CLASSIFIED_REGIONS = [
  {
    id: "SZ-001",
    name: "CRITICAL",
    color: "#ef4444",
    coordinates: [
      [27.495, 94.875],
      [27.515, 94.895],
      [27.505, 94.925],
      [27.475, 94.920],
      [27.465, 94.895],
    ],
  },
  {
    id: "SZ-002",
    name: "HIGH",
    color: "#f97316",
    coordinates: [
      [27.525, 94.850],
      [27.545, 94.875],
      [27.525, 94.900],
      [27.505, 94.895],
      [27.495, 94.875],
    ],
  },
  {
    id: "SZ-003",
    name: "MODERATE",
    color: "#eab308",
    coordinates: [
      [27.475, 94.845],
      [27.495, 94.875],
      [27.465, 94.895],
      [27.440, 94.875],
      [27.445, 94.850],
    ],
  },
  {
    id: "SZ-004",
    name: "LOW",
    color: "#22c55e",
    coordinates: [
      [27.520, 94.915],
      [27.540, 94.940],
      [27.505, 94.955],
      [27.485, 94.925],
    ],
  },
];

/* ============================================================
   BUILDING DAMAGE DATA
   ============================================================ */
export const BUILDINGS = [
  {
    id: "B001",
    name: "Dhemaji General Hospital Annex",
    damage: "SEVERE",
    confidence: 0.94,
    priority: "PRIORITY 1 - IMMEDIATE RESCUE",
    inspectors: "NDRF Team #4",
    coordinates: [
      [27.4900, 94.8850],
      [27.4920, 94.8850],
      [27.4920, 94.8875],
      [27.4900, 94.8875],
    ],
  },
  {
    id: "B002",
    name: "Machkhowa Higher Sec School",
    damage: "SEVERE",
    confidence: 0.91,
    priority: "PRIORITY 1 - IMMEDIATE RESCUE",
    inspectors: "SDRF Squad Alpha",
    coordinates: [
      [27.4960, 94.8920],
      [27.4980, 94.8920],
      [27.4980, 94.8950],
      [27.4960, 94.8950],
    ],
  },
  {
    id: "B003",
    name: "Community Food Storage Grainery",
    damage: "HIGH",
    confidence: 0.87,
    priority: "PRIORITY 2 - HIGH URGENCY",
    inspectors: "NGO Relief Unit #2",
    coordinates: [
      [27.4850, 94.9000],
      [27.4875, 94.9000],
      [27.4875, 94.9030],
      [27.4850, 94.9030],
    ],
  },
  {
    id: "B004",
    name: "Jonai Road Commercial Complex",
    damage: "HIGH",
    confidence: 0.84,
    priority: "PRIORITY 2 - HIGH URGENCY",
    inspectors: "Local Civil Defense",
    coordinates: [
      [27.4780, 94.8900],
      [27.4805, 94.8900],
      [27.4805, 94.8930],
      [27.4780, 94.8930],
    ],
  },
  {
    id: "B005",
    name: "Sub-Divisional Water Pump House",
    damage: "MODERATE",
    confidence: 0.79,
    priority: "PRIORITY 3 - UTILITY REPAIR",
    inspectors: "PWD Engineering Division",
    coordinates: [
      [27.4700, 94.9000],
      [27.4725, 94.9000],
      [27.4725, 94.9030],
      [27.4700, 94.9030],
    ],
  },
  {
    id: "B006",
    name: "East Dhemaji Residential Block 4",
    damage: "MODERATE",
    confidence: 0.76,
    priority: "PRIORITY 3 - STRUCTURAL AUDIT",
    inspectors: "Volunteer Corps #8",
    coordinates: [
      [27.4600, 94.8950],
      [27.4625, 94.8950],
      [27.4625, 94.8980],
      [27.4600, 94.8980],
    ],
  },
  {
    id: "B007",
    name: "District Administrative Sub-Office",
    damage: "LOW",
    confidence: 0.93,
    priority: "OPERATIONAL / SAFE",
    inspectors: "Station Security",
    coordinates: [
      [27.4750, 94.9150],
      [27.4775, 94.9150],
      [27.4775, 94.9180],
      [27.4750, 94.9180],
    ],
  },
  {
    id: "B008",
    name: "Dhemaji Circuit House & Shelter",
    damage: "LOW",
    confidence: 0.96,
    priority: "OPERATIONAL / ACTIVE SHELTER",
    inspectors: "District Red Cross",
    coordinates: [
      [27.4850, 94.9250],
      [27.4875, 94.9250],
      [27.4875, 94.9280],
      [27.4850, 94.9280],
    ],
  },
];

/* ============================================================
   ROAD DAMAGE DATA
   ============================================================ */
export const ROADS = [
  {
    id: "R001",
    name: "NH-15 Dhemaji Arterial Highway",
    status: "BLOCKED",
    damage: 0.91,
    lengthBlocked: "3.4 km",
    obstructionType: "Embankment Erosion & Debris Surge",
    priority: "CRITICAL CLEARANCE",
    coordinates: [
      [27.455, 94.850],
      [27.465, 94.865],
      [27.475, 94.880],
      [27.485, 94.895],
      [27.495, 94.910],
    ],
  },
  {
    id: "R002",
    name: "Machkhowa Feeder Road",
    status: "PARTIALLY_BLOCKED",
    damage: 0.48,
    lengthBlocked: "1.2 km",
    obstructionType: "Water Overtopping (0.4m depth)",
    priority: "LIGHT VEHICLES ONLY",
    coordinates: [
      [27.510, 94.850],
      [27.500, 94.865],
      [27.490, 94.880],
      [27.480, 94.895],
    ],
  },
  {
    id: "R003",
    name: "Jonai Relief Corridor",
    status: "OPEN",
    damage: 0.08,
    lengthBlocked: "0 km",
    obstructionType: "Clear Passable Route",
    priority: "PRIMARY EMERGENCY CORRIDOR",
    coordinates: [
      [27.445, 94.925],
      [27.460, 94.920],
      [27.475, 94.915],
      [27.490, 94.910],
      [27.505, 94.905],
    ],
  },
  {
    id: "R004",
    name: "Central Dhemaji Access Road",
    status: "BLOCKED",
    damage: 0.82,
    lengthBlocked: "2.1 km",
    obstructionType: "Culvert Washout",
    priority: "HEAVY MACHINERY NEEDED",
    coordinates: [
      [27.520, 94.875],
      [27.505, 94.885],
      [27.490, 94.895],
      [27.475, 94.905],
      [27.460, 94.915],
    ],
  },
  {
    id: "R005",
    name: "Hospital Emergency Link Road",
    status: "PARTIALLY_BLOCKED",
    damage: 0.56,
    lengthBlocked: "0.8 km",
    obstructionType: "Submerged Shoulder",
    priority: "AMBULANCE ESORT REQUIRED",
    coordinates: [
      [27.500, 94.930],
      [27.490, 94.920],
      [27.480, 94.910],
      [27.470, 94.900],
    ],
  },
];

/* ============================================================
   HOSPITALS & RELIEF CAMPS (RESOURCE MARKERS FOR MAP)
   ============================================================ */
export const HOSPITALS_AND_CAMPS = [
  {
    id: "H001",
    name: "Dhemaji District Hospital",
    type: "HOSPITAL",
    status: "OPERATIONAL (ICU Full)",
    bedsAvailable: 14,
    bedsTotal: 120,
    doctorsOnDuty: 8,
    coords: [27.4880, 94.8940],
  },
  {
    id: "C001",
    name: "Central Flood Relief Camp #1 (Govt High School)",
    type: "RELIEF_CAMP",
    status: "ACTIVE (Capacity 92%)",
    shelteredPeople: 1450,
    maxCapacity: 1600,
    foodStockDays: 4,
    coords: [27.4720, 94.9180],
  },
  {
    id: "C002",
    name: "Machkhowa Emergency Shelter #2",
    type: "RELIEF_CAMP",
    status: "ACTIVE (Capacity 78%)",
    shelteredPeople: 820,
    maxCapacity: 1050,
    foodStockDays: 6,
    coords: [27.5120, 94.8620],
  },
  {
    id: "R001_BASE",
    name: "NDRF Base Station & Boat Staging",
    type: "RESCUE_BASE",
    status: "DISPATCH READY",
    boatsActive: 12,
    rescuersOnDuty: 45,
    coords: [27.4520, 94.8880],
  },
];

/* ============================================================
   CRITICAL ALERTS FEED
   ============================================================ */
export const INITIAL_ALERTS = [
  {
    id: "ALT-101",
    title: "Embankment Failure at Sector 4 River Gauge",
    severity: "CRITICAL",
    location: "Jiadhal River Bank (Dhemaji Sector 4)",
    timestamp: "10 mins ago",
    acknowledged: false,
    details: "Water level rose 1.8m above danger mark. Immediate evacuation triggered for 1,200 households.",
  },
  {
    id: "ALT-102",
    title: "NH-15 Highway Debris Washout & Closure",
    severity: "CRITICAL",
    location: "NH-15 Km 42 (Dhemaji-Jonai Section)",
    timestamp: "25 mins ago",
    acknowledged: true,
    details: "Main evacuation arterial road blocked by severe debris surge. Diverting emergency vehicles to Jonai Corridor.",
  },
  {
    id: "ALT-103",
    title: "Medical Oxygen & Fresh Water Shortage",
    severity: "HIGH",
    location: "Sub-Divisional Hospital Annex",
    timestamp: "40 mins ago",
    acknowledged: false,
    details: "Emergency supply dispatch requested. Current stock estimated at 12 hours remaining.",
  },
  {
    id: "ALT-104",
    title: "Power Grid Substation Submersion",
    severity: "HIGH",
    location: "East Dhemaji Power Grid",
    timestamp: "1 hour ago",
    acknowledged: true,
    details: "Grid power shutdown executed as safety precaution. Backup diesel generators active for hospital.",
  },
  {
    id: "ALT-105",
    title: "Water Purification Unit Arrival",
    severity: "MODERATE",
    location: "Relief Camp #1",
    timestamp: "2 hours ago",
    acknowledged: true,
    details: "Mobile purification unit deployed with 5,000L/day capacity.",
  },
];

/* ============================================================
   FIELD TEAMS STATUS
   ============================================================ */
export const FIELD_TEAMS = [
  { id: "T1", name: "NDRF Battalion 12", role: "Water Rescue & Evacuation", status: "DEPLOYED", members: 32, sector: "Sector 4 Waterway" },
  { id: "T2", name: "SDRF Assam Squad 3", role: "Medical Triage & First Aid", status: "DEPLOYED", members: 18, sector: "Relief Camp #1" },
  { id: "T3", name: "Army Engineer Task Force", role: "Road Clearance & Pontoon Bridge", status: "ACTIVE", members: 45, sector: "NH-15 Highway" },
  { id: "T4", name: "Red Cross Medical Unit", role: "Mobile Healthcare", status: "STANDBY", members: 14, sector: "Central Base" },
];

/* ============================================================
   FLOOD ZONES
   ============================================================ */
export const FLOOD_ZONES = [
  {
    id: "F001",
    name: "Brahmaputra & Jiadhal Overflow Zone",
    confidence: 0.92,
    coordinates: [
      [27.425, 94.860],
      [27.435, 94.875],
      [27.445, 94.895],
      [27.455, 94.915],
      [27.450, 94.940],
      [27.430, 94.930],
      [27.415, 94.900],
      [27.410, 94.875],
    ],
  },
];

/* ============================================================
   DAMAGE STATISTICS & ANALYTICS
   ============================================================ */
export const DAMAGE_STATISTICS = {
  severeBuildings: BUILDINGS.filter((b) => b.damage === "SEVERE").length,
  highBuildings: BUILDINGS.filter((b) => b.damage === "HIGH").length,
  moderateBuildings: BUILDINGS.filter((b) => b.damage === "MODERATE").length,
  lowBuildings: BUILDINGS.filter((b) => b.damage === "LOW").length,
  blockedRoads: ROADS.filter((r) => r.status === "BLOCKED").length,
  partiallyBlockedRoads: ROADS.filter((r) => r.status === "PARTIALLY_BLOCKED").length,
  openRoads: ROADS.filter((r) => r.status === "OPEN").length,
  affectedPopulation: "42,800 Citizens",
  totalSubmergedArea: "128.5 sq km",
  aiAvgConfidence: "89.4%",
};