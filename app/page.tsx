"use client"

import { MessageSquare, ClipboardList, Phone, Clock, Users, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center">
        <p className="text-sm font-medium">
          Need urgent help? Call our 24/7 hotline:{" "}
          <a href="tel:62138008" className="font-bold underline">
            6213-8008
          </a>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ntuc-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-gray-900">NTUC Digital Concierge</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-gray-600 hover:text-ntuc-red transition">Services</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-ntuc-red transition">How It Works</a>
            <a href="#contact" className="text-gray-600 hover:text-ntuc-red transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ntuc-blue to-blue-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Find Your NTUC Services in 2 Minutes
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get personalized recommendations from 25+ services across Protection, Placement, Privileges and more.
            Tailored just for you.
          </p>
          
          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            {/* Form Option */}
            <Link href="/form" className="group">
              <div 
                className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer
                  ${hoveredCard === 'form' ? 'transform -translate-y-2 shadow-2xl' : ''}
                  hover:shadow-2xl`}
                onMouseEnter={() => setHoveredCard('form')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col items-center text-gray-900">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                    <ClipboardList className="w-10 h-10 text-ntuc-blue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Quick Questions</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Answer 5-7 guided questions for instant recommendations
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      2 min
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Most popular
                    </span>
                  </div>
                  <button className="mt-6 bg-ntuc-blue text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-blue-700 transition">
                    Start Questions →
                  </button>
                </div>
              </div>
            </Link>

            {/* Chat Option */}
            <Link href="/chat" className="group">
              <div 
                className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-300 cursor-pointer
                  ${hoveredCard === 'chat' ? 'transform -translate-y-2 shadow-2xl' : ''}
                  hover:shadow-2xl`}
                onMouseEnter={() => setHoveredCard('chat')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col items-center text-gray-900">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                    <MessageSquare className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Chat with Assistant</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Have a natural conversation about your needs
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Flexible
                    </span>
                    <span className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      AI-Powered
                    </span>
                  </div>
                  <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-green-700 transition">
                    Start Chat →
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-ntuc-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-ntuc-red">1</span>
              </div>
              <h3 className="font-bold mb-2">Tell Us About You</h3>
              <p className="text-gray-600">Share your employment status, needs, and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ntuc-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-ntuc-red">2</span>
              </div>
              <h3 className="font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-600">Our system analyzes your profile against 25+ services</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ntuc-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-ntuc-red">3</span>
              </div>
              <h3 className="font-bold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive your top 3 services with clear next steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4P Model Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Services Across 4P+1 Model</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            NTUC services are organized to support every aspect of your work life
          </p>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-ntuc-red mb-2">Protection</h3>
              <p className="text-sm text-gray-600">Worker rights, training, insurance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-ntuc-blue mb-2">Placement</h3>
              <p className="text-sm text-gray-600">Jobs, career transitions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-yellow-600 mb-2">Privileges</h3>
              <p className="text-sm text-gray-600">Discounts, member benefits</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-green-600 mb-2">CDC Project</h3>
              <p className="text-sm text-gray-600">Community, volunteering</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-purple-600 mb-2">Passion</h3>
              <p className="text-sm text-gray-600">Hobbies, wellness, learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2025 NTUC Digital Concierge</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-ntuc-red transition">Privacy</a>
            <a href="#" className="hover:text-ntuc-red transition">Terms</a>
            <a href="#" className="hover:text-ntuc-red transition">Contact</a>
            <a href="tel:62138008" className="hover:text-ntuc-red transition flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Hotline: 6213-8008
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}