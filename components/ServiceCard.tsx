"use client"

import { Star, ArrowRight, Shield, Users, Gift, Heart, Sparkles } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    pillar: string
    description: string
    reasons: string[]
    benefit: string
    access: string
    confidence: "high" | "medium" | "low"
  }
  rank: number
}

export default function ServiceCard({ service, rank }: ServiceCardProps) {
  // Get pillar color and icon
  const getPillarStyle = (pillar: string) => {
    switch (pillar) {
      case "protection":
        return { color: "text-red-600 bg-red-50", icon: <Shield className="w-5 h-5" /> }
      case "placement":
        return { color: "text-blue-600 bg-blue-50", icon: <Users className="w-5 h-5" /> }
      case "privileges":
        return { color: "text-yellow-600 bg-yellow-50", icon: <Gift className="w-5 h-5" /> }
      case "cdc_project":
        return { color: "text-green-600 bg-green-50", icon: <Heart className="w-5 h-5" /> }
      case "passion":
        return { color: "text-purple-600 bg-purple-50", icon: <Sparkles className="w-5 h-5" /> }
      default:
        return { color: "text-gray-600 bg-gray-50", icon: null }
    }
  }

  const pillarStyle = getPillarStyle(service.pillar)

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${rank === 1 ? 'border-ntuc-blue' : 'border-gray-200'} p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {rank === 1 && (
            <div className="flex items-center bg-ntuc-blue text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
              <Star className="w-4 h-4 mr-1" />
              TOP MATCH
            </div>
          )}
          {rank === 2 && (
            <div className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
              RECOMMENDED
            </div>
          )}
          {rank === 3 && (
            <div className="flex items-center bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
              ALSO CONSIDER
            </div>
          )}
        </div>
        <div className={`flex items-center px-3 py-1 rounded-lg ${pillarStyle.color}`}>
          {pillarStyle.icon}
          <span className="ml-2 text-sm font-medium capitalize">{service.pillar.replace('_', ' ')}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>

      {/* Why it's recommended */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Why this helps you:</p>
        <ul className="space-y-1">
          {service.reasons.map((reason, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-ntuc-blue mr-2">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Benefit highlight */}
      {service.benefit && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-gray-700">{service.benefit}</p>
        </div>
      )}

      {/* Access method */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-1">How to access:</p>
        <p className="text-sm text-gray-600">{service.access}</p>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-ntuc-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center group">
        {rank === 1 ? "Get Started Now" : "Learn More"}
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}