'use client';

import { questions } from '@/lib/questions';
import { Briefcase, Search, User, Heart, ChevronRight, Phone, AlertCircle, Home } from 'lucide-react';
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
          <h1 className="text-3xl font-bold mb-2">NTUC Service Finder - Current Question Flow</h1>
          <p className="text-gray-600 mb-8">Linear flow implementation from questions.ts (7 steps)</p>
          
          {/* Current Implementation Flow */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Current Implementation (Linear)</h2>
            
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
                  <h3 className="text-lg font-semibold text-green-900">Recommendations Generated</h3>
                  <p className="text-sm text-green-700 mt-1">Top 3 services from 25+ available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison with YAML Design */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Note: Linear vs Branching Implementation</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  The current implementation uses a <strong>linear flow</strong> (all users answer all 7 questions), 
                  while the YAML specification defines a <strong>branching flow</strong> where different user types get different questions.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Current (Linear)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• All users: 7 questions</li>
                      <li>• Same path for everyone</li>
                      <li>• Simpler implementation</li>
                      <li>• May ask irrelevant questions</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">YAML Design (Branching)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• 3-7 questions based on persona</li>
                      <li>• Different paths (2A/2B/2C)</li>
                      <li>• More targeted questions</li>
                      <li>• Better user experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-2xl font-bold text-ntuc-blue">7</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Persona Types</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-2xl font-bold text-purple-600">25+</div>
              <div className="text-sm text-gray-600">Services Available</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Top Recommendations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}