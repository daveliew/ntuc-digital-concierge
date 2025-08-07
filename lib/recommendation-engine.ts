// Simplified recommendation engine for MVP
// In production, this would call the Python backend API

import servicesData from "./services-data.json"

interface Service {
  id: string
  name: string
  pillar: string
  description: string
  targetAudience: string[]
  benefit: string
  channels: string[]
}

export function calculateRecommendations(answers: Record<string, string>) {
  // Score each service based on answers
  const scoredServices = servicesData.services.map(service => {
    let score = 0
    const reasons = []

    // Persona matching
    if (answers.persona === "worker" && service.targetAudience.includes("workers")) {
      score += 10
      reasons.push("Designed for workers like you")
    }
    if (answers.persona === "job_seeker" && service.targetAudience.includes("job_seekers")) {
      score += 10
      reasons.push("Perfect for job seekers")
    }

    // Employment type matching
    if (answers.employment_type === "freelancer" && service.id.includes("workplace-advisory")) {
      score += 8
      reasons.push("Essential protection for freelancers")
    }

    // Need matching
    if (answers.immediate_need === "workplace_issue" && service.pillar === "protection") {
      score += 8
      reasons.push("Addresses workplace concerns directly")
    }
    if (answers.immediate_need === "career_growth" && service.pillar === "placement") {
      score += 8
      reasons.push("Supports your career advancement")
    }
    if (answers.immediate_need === "financial" && service.pillar === "privileges") {
      score += 8
      reasons.push("Helps reduce cost of living")
    }

    // Urgency matching
    if (answers.urgency === "immediate" && service.channels.includes("hotline")) {
      score += 5
      reasons.push("Available 24/7 for immediate help")
    }

    // Membership benefits
    if (answers.membership === "yes" && service.targetAudience.includes("members")) {
      score += 3
      reasons.push("Exclusive member benefit")
    }

    // Channel preference
    if (answers.channel === "digital" && service.channels.includes("digital")) {
      score += 2
    }

    return {
      ...service,
      score,
      reasons: reasons.length > 0 ? reasons : ["Matches your profile"],
      access: getAccessMethod(service, answers),
      confidence: score >= 20 ? "high" : score >= 10 ? "medium" : "low"
    }
  })

  // Sort by score and return top 3
  return scoredServices
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function getAccessMethod(service: Service, answers: Record<string, string>) {
  if (answers.urgency === "immediate" && service.channels.includes("hotline")) {
    return "Call 6213-8008 now for immediate assistance"
  }
  if (answers.channel === "digital" && service.channels.includes("digital")) {
    return "Access online at ntuc.org.sg or via mobile app"
  }
  if (answers.channel === "physical" && service.channels.includes("physical")) {
    return "Visit your nearest NTUC service centre"
  }
  return "Multiple access options available - choose what works for you"
}