"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import FormWizard from "@/components/FormWizard"

export default function FormPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Let&apos;s Find Your NTUC Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the most relevant services for your needs.
            This should take less than 2 minutes.
          </p>
        </div>

        <FormWizard />
      </div>
    </main>
  )
}