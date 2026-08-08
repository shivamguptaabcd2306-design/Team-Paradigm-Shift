import { Landmark, HeartHandshake, Truck } from "lucide-react";

// Three individual operating contexts for the same underlying AI assistant.
export const ROLES = {
  authority: {
    label: "Local Authority",
    icon: Landmark,
    accent: "cyan",
    intro: "Local Authority Operations Mode: The AI automatically constructs tactical response plans with proposed directives for your approval or edit.",
    matchesSource: "Local Authority",
    suggestions: [
      "Generate complete tactical response plan",
      "Generate evacuation & perimeter action plan",
      "Generate river basin resource allocation plan",
    ],
  },
  ngo: {
    label: "NGO",
    icon: HeartHandshake,
    accent: "emerald",
    intro: "You're viewing the assistant as NGO. I'll focus on relief supplies, shelter, and medical support needs — ask me anything.",
    matchesSource: "NGO Report",
    suggestions: [
      "What relief supplies are critical right now?",
      "Which locations need medical support?",
      "Where should we set up the next relief camp?",
      "Summarize today's NGO activity",
    ],
  },
  team: {
    label: "Emergency Team",
    icon: Truck,
    accent: "orange",
    intro: "You're viewing the assistant as Emergency Team. I'll focus on rescue priorities and on-ground blockers — ask me anything.",
    matchesSource: "Emergency Team",
    suggestions: [
      "Which area needs immediate rescue?",
      "What's blocking teams on the ground right now?",
      "Prioritize the next 3 rescue tasks",
      "What hazards should I watch for?",
    ],
  },
};
