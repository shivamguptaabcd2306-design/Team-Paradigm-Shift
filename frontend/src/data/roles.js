import { ShieldAlert, Building, HeartHandshake } from "lucide-react";

// Official Operating Contexts for Golaghat Flood 2026 Intelligence Assistant
export const ROLES = {
  district_magistrate: {
    label: "District Magistrate / DDMA Chairman",
    icon: ShieldAlert,
    accent: "cyan",
    intro: "Golaghat Incident Command View: Query district-wide damage summaries, SDRF rescue fleet tasking, PWD road closures, CWC Dhansiri flood warnings, or DBT ex-gratia distribution.",
    matchesSource: "DDMA Golaghat Control Room",
    suggestions: [
      "Give me a 60-second operational situation briefing for Golaghat Flood 2026.",
      "What is the current water level and trend of Dhansiri at Numaligarh?",
      "Compare flood impact between Bokakhat and Khumtai revenue circles.",
      "What is the status of NH-715 Kaziranga corridor and SH-1 Dhudar Ali?",
    ],
  },
  subdivisional_officer: {
    label: "Sub-Divisional Officer (Civil) — Bokakhat",
    icon: Building,
    accent: "orange",
    intro: "Circle & Sub-Divisional Operations View: Access Bokakhat circle telemetry, Kaziranga animal corridor speed escort, Gelabil river overflow, and local camp distribution.",
    matchesSource: "SDRF Golaghat Unit 1",
    suggestions: [
      "What are the restricted and closed roads in Bokakhat circle?",
      "How many houses and crop hectares are submerged in Bokakhat?",
      "What is the current relief camp occupancy in Bokakhat Town Club shelter?",
      "What is the status of embankment armoring along Bilgaon and Dhansirimukh?",
    ],
  },
  relief_logistics: {
    label: "District Relief & Health Officer",
    icon: HeartHandshake,
    accent: "emerald",
    intro: "Relief & Health Operations View: Track 48 active relief camps, 16,500 camp inmates, Gratuitous Relief (GR) DBT grants, mobile doctor teams, and cattle fodder depots.",
    matchesSource: "District Health Society",
    suggestions: [
      "Summarize relief camp inmate demographics and medical triage status.",
      "How much financial compensation has been disbursed via DBT to flood-hit families?",
      "What is the livestock impact and status of the 24 cattle fodder depots?",
      "Which power substations and drinking water tankers are currently active?",
    ],
  },
};
