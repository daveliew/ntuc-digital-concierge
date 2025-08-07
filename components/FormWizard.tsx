"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Loader2, User, Briefcase, Search, Heart } from "lucide-react"
import { questions } from "@/lib/questions"
import { calculateRecommendations } from "@/lib/recommendation-engine"
import ServiceCard from "./ServiceCard"

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    // Check if this is the last question
    if (currentStep === questions.length - 1) {
      calculateResults(newAnswers)
    } else {
      // Move to next question
      setCurrentStep(currentStep + 1)
    }
  }

  const calculateResults = async (finalAnswers: Record<string, string>) => {
    setIsCalculating(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const results = calculateRecommendations(finalAnswers)
      setRecommendations(results)
      setIsCalculating(false)
    }, 1500)
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setRecommendations([])
  }

  // Icons for different personas
  const getIcon = (value: string) => {
    switch (value) {
      case "worker": return <Briefcase className="w-6 h-6" />
      case "job_seeker": return <Search className="w-6 h-6" />
      case "employer": return <User className="w-6 h-6" />
      case "retired": return <Heart className="w-6 h-6" />
      default: return null
    }
  }

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
        <Loader2 className="w-12 h-12 text-ntuc-blue animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Finding Your Best Matches...</h2>
        <p className="text-gray-600">Analyzing your profile against 25+ services</p>
      </div>
    )
  }

  if (recommendations.length > 0) {
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Recommendations</h2>
          <p className="text-gray-600">Based on your profile, here are the top services for you</p>
        </div>

        <div className="space-y-6 mb-8">
          {recommendations.map((service, index) => (
            <ServiceCard key={service.id} service={service} rank={index + 1} />
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={restart}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Start Over
          </button>
          <button className="px-6 py-3 bg-ntuc-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Save Results
          </button>
        </div>

        {/* Hotline reminder */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            Need immediate assistance? Call our 24/7 hotline:{" "}
            <a href="tel:62138008" className="font-bold text-ntuc-blue">6213-8008</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-ntuc-blue rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm p-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtitle && (
          <p className="text-gray-600 mb-6">{currentQuestion.subtitle}</p>
        )}

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-ntuc-blue hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center">
                {option.icon && (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 transition">
                    {getIcon(option.value)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-ntuc-blue transition" />
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition
              ${currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          
          {currentQuestion.showHotline && (
            <a
              href="tel:62138008"
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Call Hotline Now
            </a>
          )}
        </div>
      </div>
    </div>
  )
}