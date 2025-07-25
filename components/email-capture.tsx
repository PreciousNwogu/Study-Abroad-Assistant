"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

interface EmailCaptureProps {
  onSubmit: (email: string) => void
  userPreferences?: {
    country?: string
    course?: string
    level?: string
    budget?: string
  }
}

export function EmailCapture({ onSubmit, userPreferences }: EmailCaptureProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes("@")) {
      onSubmit(email.trim())
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country?.toLowerCase()) {
      case 'canada': return '🇨🇦'
      case 'uk': case 'united kingdom': return '🇬🇧'
      case 'usa': case 'united states': return '🇺🇸'
      case 'australia': return '🇦🇺'
      case 'germany': return '🇩🇪'
      case 'france': return '🇫🇷'
      default: return '🌍'
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          🎯 <strong>Your University List is Ready!</strong>
        </h3>
      </div>

      {userPreferences && (
        <div className="bg-white rounded-lg p-3 space-y-2">
          <p className="text-sm font-medium text-gray-700">Based on your preferences:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {userPreferences.country && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Country:</span> 
                <span>{getCountryFlag(userPreferences.country)} {userPreferences.country}</span>
              </div>
            )}
            {userPreferences.course && userPreferences.course !== 'undefined' && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Course:</span> 
                <span>{userPreferences.course}</span>
              </div>
            )}
            {userPreferences.level && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Level:</span> 
                <span>{userPreferences.level}</span>
              </div>
            )}
            {userPreferences.budget && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Budget:</span> 
                <span>{userPreferences.budget}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-3">
        <div className="flex items-start gap-2 mb-3">
          <span className="text-lg">📧</span>
          <div>
            <p className="font-medium text-gray-800">Get your university list:</p>
            <p className="text-sm text-gray-600">
              I'll send you a curated list of universities that match your criteria:
            </p>
          </div>
        </div>
        
        <ul className="text-sm text-gray-600 space-y-1 mb-4 ml-6">
          <li>• University names and locations {userPreferences?.country ? `within ${userPreferences.country}` : ''}</li>
          <li>• Programs available {userPreferences?.course && userPreferences.course !== 'undefined' ? `in ${userPreferences.course}` : ''}</li>
          <li>• Tuition fees {userPreferences?.budget ? `within your ${userPreferences.budget} budget` : 'information'}</li>
          <li>• Contact details for direct inquiry</li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm font-medium text-gray-700">
            Enter your email to receive your personalized university list:
          </p>
          <div className="flex space-x-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1"
              required
            />
            <Button type="submit" disabled={!email.trim() || !email.includes("@")}>
              <Mail className="w-4 h-4 mr-1" />
              Send List
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            We'll send you a comprehensive list of recommended universities and visa information.
          </p>
        </form>
      </div>
    </div>
  )
}
