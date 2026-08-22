import {
  disasterInfo,
  kpiCards,
  circlesData,
  humanitarianData,
  housingData,
  infrastructureData,
  agricultureData,
  riverGaugeData,
  reliefOperationsData,
  healthServicesData,
  hospitalsData,
  emergencyContactsData,
  economicLossData,
  recoveryData,
  timelineData,
  alertsData,
} from "../data/situation.js";

/**
 * Builds the official district situation context block for GOLAGHAT FLOOD INTELLIGENCE.
 * Grounded exclusively in verified District Administration Golaghat (DDMA), ASDMA, CWC, and District Health Society records.
 * @param {Array<{source:string, location:string, time:string, message:string}>} reports
 */
export function buildContextBlock(reports = []) {
  const circlesSummary = circlesData.map(
    (c) =>
      `• ${c.circle} Revenue Circle (${c.subdivision}): ${c.populationAffected.toLocaleString()} affected (${c.familiesAffected.toLocaleString()} families), ${c.villagesAffected} villages, ${c.deaths} deaths, ${c.housesDamaged} damaged houses, ${c.cropAreaHa} ha crop area, ${c.reliefCamps} relief camps (${c.peopleInCamps.toLocaleString()} inmates). Critical Rivers: ${c.criticalRivers}. Status: ${c.status}`
  ).join("\n");

  const riversSummary = riverGaugeData.map(
    (r) =>
      `• ${r.river} at ${r.station} (${r.circle}): Current Level ${r.currentLevelM}m (Danger Level: ${r.dangerLevelM}m, HFL: ${r.hflM}m) — Status: ${r.status} | Trend: ${r.trend} [Agency: ${r.agency} | Obs: ${r.lastObservation}]`
  ).join("\n");

  const kpisSummary = kpiCards.map(
    (k) => `• ${k.label}: ${k.value} ${k.unit} [Status: ${k.status} | Source: ${k.source} | As of: ${k.date}]`
  ).join("\n");

  const hospitalsSummary = (hospitalsData || []).map(
    (h) =>
      `• ${h.name} (${h.type}, ${h.location}): Status: ${h.status} | Bed Cap: ${h.bedCapacity} (${h.bedsAvailable} available) | Emergency Contact: ${h.emergencyContact} | Main Contact: ${h.mainContact} | Ambulance: ${h.ambulanceAvailability} | Services: ${h.medicalServices} [Source: ${h.source} | Updated: ${h.lastUpdated}]`
  ).join("\n");

  const contactsSummary = (emergencyContactsData || []).map(
    (c) =>
      `• [${c.priority}] ${c.name} (${c.organization}): Phone: ${c.phone}${c.tollFree ? ` / Toll-Free: ${c.tollFree}` : ""} | Purpose: ${c.purpose} | Status: ${c.status} [Source: ${c.source}]`
  ).join("\n");

  const recentAlerts = alertsData.map(
    (a) => `• [${a.severity}] ${a.title} (${a.location}) — ${a.description} [Source: ${a.source} | ${a.timestamp}]`
  ).join("\n");

  return `OFFICIAL DISTRICT OPERATIONAL DATA: GOLAGHAT FLOOD RESPONSE
Incident Command: District Disaster Management Authority (DDMA), Golaghat, Assam.
Reporting Timestamp: ${disasterInfo.lastVerified}
Scope: Golaghat District (5 Revenue Circles: Bokakhat, Golaghat, Khumtai, Dergaon, Morangi)

KEY DISTRICT KPIS (VERIFIED DISTRICT SNAPSHOT):
${kpisSummary}

REVENUE CIRCLE-WISE OPERATIONAL BREAKDOWN:
${circlesSummary}

RIVER & HYDROLOGICAL GAUGES (CWC & WRD):
${riversSummary}

VERIFIED HOSPITALS & HEALTH FACILITIES:
${hospitalsSummary}

OFFICIAL EMERGENCY CONTACTS & HELPLINES:
${contactsSummary}

HUMANITARIAN & DEMOGRAPHIC IMPACT:
• Total Affected: ${humanitarianData.totalAffected.toLocaleString()} citizens (${humanitarianData.familiesAffected.toLocaleString()} families; Men: ${humanitarianData.menAffected.toLocaleString()}, Women: ${humanitarianData.womenAffected.toLocaleString()}, Children: ${humanitarianData.childrenAffected.toLocaleString()})
• Confirmed Casualties (Deaths): ${humanitarianData.deathsConfirmed}
• Missing Persons: ${humanitarianData.missingPersons}
• Evacuated Citizens: ${humanitarianData.evacuatedCitizens.toLocaleString()}
• People in Relief Camps: ${humanitarianData.currentCampInmates.toLocaleString()} inmates across ${humanitarianData.activeReliefCamps} active relief camps (+${humanitarianData.distributionCentres} relief distribution centres)
• Families Assisted via DBT: ${humanitarianData.familiesAssistedDBT.toLocaleString()} families (Gratuitous Relief: ₹${humanitarianData.compensationDisbursedCr} Cr disbursed)
• Medical Response: ${humanitarianData.medicalTeamsDeployed} mobile doctor teams deployed, ${humanitarianData.patientsTreated.toLocaleString()} camp patients treated.

HOUSING & INFRASTRUCTURE DAMAGE:
• Houses Damaged: ${housingData.totalHousesAffected.toLocaleString()} (${housingData.fullyDamaged.toLocaleString()} Fully Damaged, ${housingData.partiallyDamaged.toLocaleString()} Partially Damaged; Kutcha: ${housingData.kutchaHousesAffected.toLocaleString()}, Pucca: ${housingData.puccaHousesAffected.toLocaleString()})
• Public Buildings Affected: ${housingData.publicBuildingsAffected} (${housingData.schoolsAffected} schools, ${housingData.healthSubCentresAffected} health sub-centres)
• Roads Damaged: ${infrastructureData.roads.totalLengthKm} km across ${infrastructureData.roads.totalSectionsDamaged} road sections
  - NH-715 (Kaziranga Corridor): RESTRICTED (Water overtopping Km 92; regulated 30 km/h pilot escort)
  - NH-129 / NH-29 (Numaligarh–Golaghat–Dimapur): OPEN (Shoulder erosion repaired)
  - SH-1 (Dhudar Ali): PARTIALLY ACCESSIBLE (0.2m water at Km 14 Khumtai; light vehicles allowed)
  - Bokakhat–Dhansirimukh Road: CLOSED (Culvert approach washed out; SDRF boat ferry operating)
• Bridges Damaged: ${infrastructureData.bridges.totalDamaged} bridges/culvert approaches (${infrastructureData.bridges.inaccessibleCount} closed, 1 Bailey bridge deployed)
• Embankment Breaches: ${infrastructureData.embankments.totalBreaches} breaches (${infrastructureData.embankments.activePlugging} active geobag operations, ${infrastructureData.embankments.containedBreaches} contained)

AGRICULTURE & LIVESTOCK:
• Standing Crop Area Submerged: ${agricultureData.cropAreaSubmergedHa.toLocaleString()} hectares (${agricultureData.majorAffectedCrops.join(", ")})
• Farmers Affected: ${agricultureData.farmersAffected.toLocaleString()}
• Livestock Affected: ${agricultureData.livestockAffectedTotal.toLocaleString()} animals (${agricultureData.largeAnimalsAffected.toLocaleString()} large cattle/buffaloes, ${agricultureData.smallAnimalsAffected.toLocaleString()} small animals, ${agricultureData.poultryAffected.toLocaleString()} poultry)
• Fodder Depots: ${agricultureData.fodderReliefDepots} depots (${agricultureData.fodderDistributedQuintals.toLocaleString()} quintals distributed)

DAMAGE & ECONOMIC ASSESSMENT:
• Total Estimated Damage: ₹${economicLossData.estimatedTotalCr} Cr (${economicLossData.status})
• Breakdown: Infrastructure ₹${economicLossData.infrastructureDamageCr} Cr, Agriculture ₹${economicLossData.agricultureDamageCr} Cr, Housing ₹${economicLossData.housingDamageCr} Cr, Public Property ₹${economicLossData.publicPropertyDamageCr} Cr

ACTIVE ALERTS & DIRECTIVES:
${recentAlerts}

RECENT FIELD LOGS:
${reports.map((r) => `[${r.source} — ${r.location}, ${r.time}] ${r.message}`).join("\n") || "No immediate field anomalies reported."}`;
}
