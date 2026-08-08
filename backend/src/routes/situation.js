import { Router } from "express";
import {
  disasterInfo,
  affectedLocations,
  statCards,
  resources,
  initialReports,
  incomingQueue,
  evaluationMetrics,
  timelineFrames,
  evacuationRoutes,
} from "../data/situation.js";

const router = Router();

// GET /api/situation — everything the dashboard needs to render on load.
router.get("/", (req, res) => {
  res.json({
    disasterInfo,
    affectedLocations,
    statCards,
    resources,
    initialReports,
    incomingQueue,
    evaluationMetrics,
    timelineFrames,
    evacuationRoutes,
  });
});

export default router;
