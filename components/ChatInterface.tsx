"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Phone, RefreshCw } from "lucide-react"
import ServiceCard from "./ServiceCard"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  services?: any[]
}

const quickActions = [
  "I lost my job",
  "Need legal help",
  "Want to save money",
  "Looking for training",
  "I'm a freelancer"
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your NTUC Digital Assistant. I can help you find the right services based on your needs. What brings you here today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const botResponse = generateBotResponse(input)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    // Check for urgent keywords
    if (input.includes("urgent") || input.includes("help now") || input.includes("emergency")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I understand this is urgent. Please call our 24/7 hotline at 6213-8008 for immediate assistance. They can help you right away. Is there anything else I can help you with?",
        timestamp: new Date()
      }
    }

    // Check for job loss
    if (input.includes("lost") && input.includes("job") || input.includes("retrenched")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I'm sorry to hear about your job loss. Let me find the best services to help you get back on track.",
        timestamp: new Date(),
        services: [
          {
            id: "job-security-council",
            name: "Job Security Council",
            pillar: "placement",
            description: "Get matched with new job opportunities quickly",
            reasons: ["Priority placement for retrenched workers", "AI-powered job matching"],
            benefit: "Fast-track to new employment",
            access: "Register online or visit any career centre",
            confidence: "high"
          },
          {
            id: "employment-support",
            name: "Employment Support Services",
            pillar: "placement",
            description: "Comprehensive support for your job search",
            reasons: ["Resume writing assistance", "Interview preparation"],
            benefit: "End-to-end job search support",
            access: "Book an appointment online",
            confidence: "high"
          }
        ]
      }
    }

    // Check for freelancer
    if (input.includes("freelancer") || input.includes("self-employed") || input.includes("contract")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "As a freelancer, you have unique needs. Here are services specifically designed to protect and support self-employed individuals:",
        timestamp: new Date(),
        services: [
          {
            id: "workplace-advisory",
            name: "Workplace Advisory",
            pillar: "protection",
            description: "Contract review and dispute resolution",
            reasons: ["TS-SEP compliance guidance", "Free consultation on contracts"],
            benefit: "Protect yourself from unfair contracts",
            access: "Call hotline or book online consultation",
            confidence: "high"
          }
        ]
      }
    }

    // Default response for unmatched queries
    return {
      id: Date.now().toString(),
      type: "bot",
      content: "I can help you find the right NTUC services. Could you tell me more about:\n• Your employment status (working, job seeking, employer)\n• What specific help you need (workplace issues, career growth, financial support)\n• Whether this is urgent or you're planning ahead?",
      timestamp: new Date()
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    handleSend()
  }

  const restart = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Hello! I'm your NTUC Digital Assistant. I can help you find the right services based on your needs. What brings you here today?",
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="bg-ntuc-blue text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">NTUC Digital Assistant</h3>
            <p className="text-sm text-blue-100">Powered by AI • Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={restart}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            title="Start over"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <a
            href="tel:62138008"
            className="flex items-center px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <Phone className="w-4 h-4 mr-1" />
            Hotline
          </a>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div className={`flex max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "user" ? "bg-gray-600 ml-2" : "bg-ntuc-blue mr-2"
              }`}>
                {message.type === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div>
                <div className={`rounded-lg p-3 ${
                  message.type === "user" 
                    ? "bg-gray-600 text-white" 
                    : "bg-gray-100 text-gray-900"
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.services && (
                  <div className="mt-4 space-y-4">
                    {message.services.map((service, index) => (
                      <ServiceCard key={service.id} service={service} rank={index + 1} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="text-gray-600">Assistant is typing...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => handleQuickAction(action)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ntuc-blue"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-ntuc-blue text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a demo using rule-based responses. Production version would use LLM for natural conversation.
        </p>
      </div>
    </div>
  )
}