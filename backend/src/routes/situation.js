import { Router } from "express";
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
  affectedLocations,
  statCards,
  resources,
  initialReports,
  incomingQueue,
  evaluationMetrics,
  timelineFrames,
} from "../data/situation.js";

const router = Router();

// GET /api/situation — returns the complete official Golaghat District Flood 2026 dataset
router.get("/", (req, res) => {
  res.json({
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
    affectedLocations,
    statCards,
    resources,
    initialReports,
    incomingQueue,
    evaluationMetrics,
    timelineFrames,
  });
});

export default router;
