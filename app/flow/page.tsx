'use client';

import { questions } from '@/lib/questions';
import { Briefcase, Search, User, Heart, Phone, Home } from 'lucide-react';
import Link from 'next/link';

export default function FlowVisualization() {
  const getIcon = (value: string) => {
    switch (value) {
      case 'worker': return <Briefcase className="w-5 h-5" />;
      case 'job_seeker': return <Search className="w-5 h-5" />;
      case 'employer': return <User className="w-5 h-5" />;
      case 'retired': return <Heart className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">How Our Smart Recommendation System Works</h1>
          <p className="text-gray-600 mb-8">7 quick questions to match you with the perfect NTUC services</p>
          
          {/* Why 7 Questions */}
          <div className="bg-white border rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Why These 7 Questions?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Each Question Serves a Purpose:</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li><strong>Q1 (Persona):</strong> Identifies your user type</li>
                  <li><strong>Q2 (Employment):</strong> Determines eligibility for specific programs</li>
                  <li><strong>Q3 (Need):</strong> Matches services to your immediate concern</li>
                  <li><strong>Q4 (Urgency):</strong> Prioritizes time-sensitive services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Smart Scoring System:</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li><strong>Q5 (Life Stage):</strong> Personalizes age-appropriate services</li>
                  <li><strong>Q6 (Membership):</strong> Unlocks member-exclusive benefits</li>
                  <li><strong>Q7 (Channel):</strong> Shows services in your preferred format</li>
                </ul>
                <p className="text-sm mt-3 font-semibold text-ntuc-blue">Result: Precision-matched recommendations!</p>
              </div>
            </div>
          </div>

          {/* Simple Explanation Box */}
          <div className="bg-blue-50 border-2 border-ntuc-blue/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-ntuc-blue mb-3">Our Recommendation Approach</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-ntuc-blue mb-2">7</div>
                <div className="text-lg font-semibold mb-1">Quick Questions</div>
                <p className="text-sm text-gray-600">About your situation and needs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">→</div>
                <div className="text-lg font-semibold mb-1">Smart Analysis</div>
                <p className="text-sm text-gray-600">AI matches your profile to services</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Top 3</div>
                <div className="text-lg font-semibold mb-1">Best Matches</div>
                <p className="text-sm text-gray-600">From 25+ NTUC services</p>
              </div>
            </div>
          </div>

          {/* Current Implementation Flow */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">The 7-Question Journey</h2>
            
            <div className="relative">
              {/* Flow Line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gray-300"></div>
              
              {/* Questions */}
              {questions.map((q, index) => (
                <div key={q.id} className="relative mb-8 last:mb-0">
                  {/* Step Number */}
                  <div className="absolute left-4 w-8 h-8 bg-ntuc-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Question Card */}
                  <div className="ml-16 border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{q.question}</h3>
                        {q.subtitle && (
                          <p className="text-sm text-gray-500 mt-1">{q.subtitle}</p>
                        )}
                        {q.showHotline && (
                          <div className="flex items-center gap-2 mt-2 text-red-600">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-medium">Hotline shown: 6213-8008</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{q.id}</span>
                    </div>
                    
                    {/* Options Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                      {q.options.map((option) => (
                        <div 
                          key={option.value}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm"
                        >
                          {q.id === 'persona' && getIcon(option.value)}
                          <div>
                            <div className="font-medium">{option.label}</div>
                            {option.description && (
                              <div className="text-xs text-gray-500">{option.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Final Result */}
              <div className="relative">
                <div className="absolute left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div className="ml-16 bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900">Your Personalized Recommendations</h3>
                  <p className="text-sm text-green-700 mt-2">Based on your answers, we identify:</p>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Your user persona (worker, job seeker, employer, retiree)</li>
                    <li>• Your specific needs and urgency level</li>
                    <li>• Top 3 most relevant services from our 25+ offerings</li>
                  </ul>
                  <p className="text-sm font-semibold text-green-800 mt-3">Each recommendation includes confidence level (High/Medium/Low) and clear next steps</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}