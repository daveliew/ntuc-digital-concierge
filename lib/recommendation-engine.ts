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
    const reasons: string[] = []

    // Persona matching - handle all personas
    if (answers.persona === "worker" && service.targetAudience.includes("worker")) {
      score += 10
      reasons.push("Designed for workers like you")
    }
    if (answers.persona === "job_seeker" && service.targetAudience.includes("job_seeker")) {
      score += 10
      reasons.push("Perfect for job seekers")
    }
    if (answers.persona === "employer" && service.targetAudience.includes("employer")) {
      score += 10
      reasons.push("Essential for employers")
    }
    if (answers.persona === "retired" && service.targetAudience.includes("retired")) {
      score += 10
      reasons.push("Perfect for your retirement lifestyle")
    }

    // Employment type matching - comprehensive coverage
    if (answers.employment_type === "freelancer" || answers.employment_type === "gig_worker") {
      if (service.targetAudience.includes("freelancer") || 
          service.targetAudience.includes("gig_worker") ||
          service.id.includes("workplace-advisory") ||
          service.id.includes("legal-assistance") ||
          service.id.includes("ntuc-gift")) {
        score += 8
        reasons.push("Essential protection for independent workers")
      }
    }
    if (answers.employment_type === "full_time" && service.targetAudience.includes("worker")) {
      score += 6
      reasons.push("Great for full-time employees")
    }
    if (answers.employment_type === "part_time" && service.targetAudience.includes("worker")) {
      score += 6
      reasons.push("Supports part-time workers")
    }

    // Need matching
    if (answers.immediate_need === "workplace_issue" && service.pillar === "protection") {
      score += 8
      reasons.push("Addresses workplace concerns directly")
    }
    if (answers.immediate_need === "career_growth" && 
        (service.pillar === "progression" || service.pillar === "placement")) {
      score += 8
      reasons.push("Supports your career advancement")
    }
    if (answers.immediate_need === "financial" && service.pillar === "privileges") {
      score += 8
      reasons.push("Helps reduce cost of living")
    }
    if (answers.immediate_need === "community" && 
        (service.id.includes("project-refresh") || service.pillar === "privileges")) {
      score += 8
      reasons.push("Great way to give back to community")
    }
    if (answers.immediate_need === "personal" && 
        (service.pillar === "progression" || service.id.includes("digi-fam"))) {
      score += 8
      reasons.push("Enhances personal development")
    }

    // Life stage matching
    if (answers.life_stage === "young" && 
        (service.targetAudience.includes("young_worker") || 
         service.targetAudience.includes("worker") || 
         service.targetAudience.includes("freelancer") || 
         service.targetAudience.includes("gig_worker"))) {
      score += 4
      reasons.push("Perfect for young professionals")
    }
    if (answers.life_stage === "parent" && 
        (service.targetAudience.includes("family") || service.pillar === "privileges")) {
      score += 4
      reasons.push("Family-friendly benefits")
    }

    // Urgency matching
    if (answers.urgency === "immediate" && service.channels.includes("hotline")) {
      score += 5
      reasons.push("Available 24/7 for immediate help")
    }

    // Membership benefits and incentives
    if (answers.membership === "yes" && 
        (service.targetAudience.includes("worker") || 
         service.targetAudience.includes("freelancer") || 
         service.targetAudience.includes("gig_worker") || 
         service.targetAudience.includes("retired"))) {
      score += 3
      reasons.push("Exclusive member benefit")
    }
    if ((answers.membership === "no_interested" || answers.membership === "not_sure") && 
        service.id === "membership-gifts") {
      score += 10
      reasons.push("Unlock all NTUC benefits")
    }
    if (answers.membership === "no" && 
        (service.targetAudience.includes("worker") || service.targetAudience.includes("job_seeker"))) {
      score += 2
    }

    // Channel preference
    if (answers.channel === "digital" && 
        (service.channels.includes("digital") || service.channels.includes("online"))) {
      score += 2
    }
    if (answers.channel === "physical" && service.channels.includes("physical")) {
      score += 2
    }
    if (answers.channel === "phone" && 
        (service.channels.includes("hotline") || service.channels.includes("phone"))) {
      score += 2
    }

    return {
      ...service,
      score,
      reasons: reasons.length > 0 ? reasons : ["Matches your profile"],
      access: getAccessMethod(service, answers),
      confidence: score >= 20 ? "high" : score >= 12 ? "medium" : "low"
    }
  })

  // Sort by score and get top recommendations
  const sortedServices = scoredServices.sort((a, b) => b.score - a.score)
  
  // Ensure we always return at least 3 recommendations
  const topServices = sortedServices.slice(0, 3)
  
  // If top 3 have very low scores, add fallback recommendations
  if (topServices.length < 3 || topServices[2].score < 5) {
    const fallbacks = getFallbackRecommendations(answers, sortedServices)
    return [...topServices, ...fallbacks].slice(0, 3)
  }
  
  return topServices
}

function getAccessMethod(service: Service, answers: Record<string, string>) {
  if (answers.urgency === "immediate" && service.channels.includes("hotline")) {
    return "Call 6213-8008 now for immediate assistance"
  }
  if (answers.channel === "digital" && 
      (service.channels.includes("digital") || service.channels.includes("online"))) {
    return "Access online at ntuc.org.sg or via mobile app"
  }
  if (answers.channel === "physical" && service.channels.includes("physical")) {
    return "Visit your nearest NTUC service centre"
  }
  if (answers.channel === "phone" && 
      (service.channels.includes("hotline") || service.channels.includes("phone"))) {
    return "Call or WhatsApp for personalized assistance"
  }
  return "Multiple access options available - choose what works for you"
}

function getFallbackRecommendations(answers: Record<string, string>, allServices: any[]) {
  const fallbacks = []
  
  // Always suggest membership gifts if not a member
  if (answers.membership !== "yes") {
    const membershipService = allServices.find(s => s.id === "membership-gifts")
    if (membershipService && !allServices.slice(0, 3).find(s => s.id === "membership-gifts")) {
      fallbacks.push({
        ...membershipService,
        score: 5,
        reasons: ["Unlock access to all NTUC benefits"],
        confidence: "medium"
      })
    }
  }
  
  // Suggest workplace advisory for anyone working
  if (answers.persona === "worker" || answers.employment_type) {
    const workplaceService = allServices.find(s => s.id === "workplace-advisory")
    if (workplaceService && !allServices.slice(0, 3).find(s => s.id === "workplace-advisory")) {
      fallbacks.push({
        ...workplaceService,
        score: 4,
        reasons: ["Good to know your workplace rights"],
        confidence: "low"
      })
    }
  }
  
  // Suggest privileges/discounts for members
  if (answers.membership === "yes") {
    const privilegeService = allServices.find(s => s.pillar === "privileges" && s.targetAudience.includes("members"))
    if (privilegeService && !allServices.slice(0, 3).find(s => s.pillar === "privileges")) {
      fallbacks.push({
        ...privilegeService,
        score: 3,
        reasons: ["Make the most of your membership"],
        confidence: "low"
      })
    }
  }
  
  return fallbacks
}