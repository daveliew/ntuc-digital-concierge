export interface Question {
  id: string
  question: string
  subtitle?: string
  options: {
    value: string
    label: string
    description?: string
    icon?: boolean
  }[]
  showHotline?: boolean
}

export const questions: Question[] = [
  {
    id: "persona",
    question: "What best describes you?",
    subtitle: "This helps us understand your needs better",
    options: [
      { value: "worker", label: "I'm currently working", description: "Employee, freelancer, or self-employed", icon: true },
      { value: "job_seeker", label: "I'm looking for work", description: "Unemployed or between jobs", icon: true },
      { value: "employer", label: "I'm an employer/HR", description: "Business owner or HR professional", icon: true },
      { value: "retired", label: "I'm retired", description: "No longer in workforce but interested", icon: true }
    ]
  },
  {
    id: "employment_type",
    question: "What's your employment type?",
    subtitle: "Different employment types have different support available",
    options: [
      { value: "full_time", label: "Full-time employee" },
      { value: "part_time", label: "Part-time/Contract" },
      { value: "freelancer", label: "Freelancer/Self-employed" },
      { value: "gig_worker", label: "Gig worker", description: "Grab, delivery, etc." }
    ]
  },
  {
    id: "immediate_need",
    question: "What brings you here today?",
    subtitle: "We'll match you with the right services",
    options: [
      { value: "workplace_issue", label: "Workplace issue", description: "Disputes, unfair treatment" },
      { value: "career_growth", label: "Career development", description: "Skills, progression, training" },
      { value: "financial", label: "Financial pressures", description: "Cost of living, savings" },
      { value: "community", label: "Give back", description: "Volunteer, help others" },
      { value: "personal", label: "Personal enrichment", description: "Hobbies, wellness, learning" }
    ]
  },
  {
    id: "urgency",
    question: "How urgent is this?",
    subtitle: "We can provide immediate help if needed",
    options: [
      { value: "immediate", label: "Need help now" },
      { value: "soon", label: "Within this week" },
      { value: "planning", label: "Planning ahead" }
    ],
    showHotline: true
  },
  {
    id: "life_stage",
    question: "Which best describes your life stage?",
    subtitle: "Optional - helps us personalize recommendations",
    options: [
      { value: "young", label: "Young adult (Under 30)" },
      { value: "mid_career", label: "Mid-career (30-50)" },
      { value: "senior", label: "Senior (50+)" },
      { value: "parent", label: "Parent/Caregiver" },
      { value: "skip", label: "Prefer not to say" }
    ]
  },
  {
    id: "membership",
    question: "Are you an NTUC member?",
    subtitle: "Members get access to exclusive benefits",
    options: [
      { value: "yes", label: "Yes, I'm a member" },
      { value: "no_interested", label: "No, but interested" },
      { value: "not_sure", label: "Not sure" },
      { value: "no", label: "No, just browsing" }
    ]
  },
  {
    id: "channel",
    question: "How would you prefer to connect?",
    subtitle: "We'll show services available through your preferred channel",
    options: [
      { value: "digital", label: "Online/App" },
      { value: "physical", label: "In-person" },
      { value: "phone", label: "Phone/WhatsApp" },
      { value: "any", label: "Any method" }
    ]
  }
]