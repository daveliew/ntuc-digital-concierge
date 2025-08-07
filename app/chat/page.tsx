"use client"

import Link from "next/link"
import { Home, Info } from "lucide-react"
import ChatInterface from "@/components/ChatInterface"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ntuc-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-gray-900">NTUC Digital Concierge</span>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-ntuc-red transition"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Chat with NTUC Assistant
            </h1>
            <p className="text-lg text-gray-600">
              Tell me about your situation and I&apos;ll help you find the right services.
              Feel free to ask anything!
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">AI-Powered Assistance</p>
              <p>This chat uses AI to understand your needs and provide personalized recommendations. 
                 Your conversation is private and not stored. For urgent matters, please call our hotline at 6213-8008.</p>
            </div>
          </div>

          <ChatInterface />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Not getting the help you need?
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/form" className="text-ntuc-blue hover:underline">
                Try Guided Questions
              </Link>
              <span className="text-gray-400">|</span>
              <a href="tel:62138008" className="text-ntuc-blue hover:underline">
                Call Hotline: 6213-8008
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}