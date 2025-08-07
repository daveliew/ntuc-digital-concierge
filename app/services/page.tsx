"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, TrendingUp, Briefcase, Gift, Search, Filter } from "lucide-react"
import servicesData from "@/lib/services-data.json"

const pillarConfig = {
  protection: {
    name: "Protection",
    icon: Shield,
    color: "bg-red-100 text-red-700 border-red-200",
    bgGradient: "from-red-50 to-red-100",
    description: "Worker rights, insurance, workplace safety"
  },
  progression: {
    name: "Progression", 
    icon: TrendingUp,
    color: "bg-green-100 text-green-700 border-green-200",
    bgGradient: "from-green-50 to-green-100",
    description: "Skills training, career development, education"
  },
  placement: {
    name: "Placement",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    bgGradient: "from-blue-50 to-blue-100",
    description: "Jobs, career transitions, employment matching"
  },
  privileges: {
    name: "Privileges",
    icon: Gift,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    bgGradient: "from-yellow-50 to-yellow-100",
    description: "Discounts, member benefits, lifestyle perks"
  }
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPillar, setSelectedPillar] = useState<string>("all")
  const [selectedAudience, setSelectedAudience] = useState<string>("all")

  // Filter services based on search and filters
  const filteredServices = servicesData.services.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPillar = selectedPillar === "all" || service.pillar === selectedPillar
    
    const matchesAudience = selectedAudience === "all" || 
      service.targetAudience.includes(selectedAudience)
    
    return matchesSearch && matchesPillar && matchesAudience
  })

  // Group services by pillar
  const servicesByPillar = filteredServices.reduce((acc, service) => {
    if (!acc[service.pillar]) {
      acc[service.pillar] = []
    }
    acc[service.pillar].push(service)
    return acc
  }, {} as Record<string, typeof servicesData.services>)

  // Get unique audiences
  const allAudiences = Array.from(new Set(servicesData.services.flatMap(s => s.targetAudience)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">All NTUC Services</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ntuc-blue to-blue-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore All NTUC Services
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl">
            Browse our complete catalog of {servicesData.services.length} services across the 4Ps model. 
            Find exactly what you need to support your work life journey.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ntuc-blue"
                />
              </div>
            </div>

            {/* Pillar Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ntuc-blue"
              >
                <option value="all">All Pillars</option>
                {Object.entries(pillarConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>

            {/* Audience Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ntuc-blue"
              >
                <option value="all">All Audiences</option>
                {allAudiences.map(audience => (
                  <option key={audience} value={audience}>
                    {audience.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredServices.length} of {servicesData.services.length} services
          </div>
        </div>
      </section>

      {/* Services Grid by Pillar */}
      <section className="container mx-auto px-4 py-8">
        {Object.keys(pillarConfig).map(pillarKey => {
          const services = servicesByPillar[pillarKey] || []
          const config = pillarConfig[pillarKey as keyof typeof pillarConfig]
          const Icon = config.icon

          if (services.length === 0) return null

          return (
            <div key={pillarKey} className="mb-12">
              {/* Pillar Header */}
              <div className={`bg-gradient-to-r ${config.bgGradient} rounded-lg p-6 mb-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${config.color} border`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{config.name}</h3>
                  <span className="text-sm text-gray-600">({services.length} services)</span>
                </div>
                <p className="text-gray-700">{config.description}</p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-900 flex-1">
                        {service.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${config.color} border`}>
                        {config.name}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      {/* Benefit */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-500">Benefit:</span>
                        <span className="text-xs text-gray-700">{service.benefit}</span>
                      </div>

                      {/* Target Audience */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-500">For:</span>
                        <div className="flex flex-wrap gap-1">
                          {service.targetAudience.map(audience => (
                            <span
                              key={audience}
                              className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
                            >
                              {audience.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Channels */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-500">Access:</span>
                        <div className="flex flex-wrap gap-1">
                          {service.channels.map(channel => (
                            <span
                              key={channel}
                              className="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-600"
                            >
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <div className="mt-4 pt-4 border-t">
                      <Link
                        href={`/chat?service=${service.id}`}
                        className="text-sm text-ntuc-blue hover:text-blue-700 font-medium"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedPillar("all")
                setSelectedAudience("all")
              }}
              className="mt-4 text-ntuc-blue hover:text-blue-700 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Not sure which service you need?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Try our personalized recommendation tools to find the perfect services for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/form"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Take the Quiz
            </Link>
            <Link
              href="/chat"
              className="px-8 py-3 bg-ntuc-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Chat with Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}