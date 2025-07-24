"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SOPAssistantProps {
  onSubmit: (details: {
    careerGoal: string
    experience: string
    academicBackground: string
    sopType?: string
  }) => void
}

type SOPType = 'free' | 'admission' | 'immigration' | 'application'

export function SOPAssistant({ onSubmit }: SOPAssistantProps) {
  const [selectedSOPType, setSelectedSOPType] = useState<SOPType | null>(null)
  const [details, setDetails] = useState({
    careerGoal: "",
    experience: "",
    academicBackground: "",
  })

  const sopOptions = [
    {
      type: 'free' as SOPType,
      title: 'Free University List',
      description: 'AI-powered university recommendations',
      price: 'Free',
      features: ['Basic AI assistance', 'University recommendations', 'General guidance'],
      buttonText: 'Get Free Recommendations',
      isPrimary: false
    },
    {
      type: 'admission' as SOPType,
      title: 'Admission SOP',
      description: 'University application statements',
      price: '$149',
      features: ['Level-specific content', 'Country-specific requirements', 'Professional writing & review', '2-3 day delivery'],
      buttonText: 'Get Admission SOP',
      isPrimary: true
    },
    {
      type: 'immigration' as SOPType,
      title: 'Immigration SOP',
      description: 'Visa application statements',
      price: '$199',
      features: ['Immigration-focused content', 'Country-specific requirements', 'Legal compliance review', '2-3 day delivery'],
      buttonText: 'Get Immigration SOP',
      isPrimary: true
    },
    {
      type: 'application' as SOPType,
      title: 'Application SOP',
      description: 'Comprehensive application package',
      price: '$249',
      features: ['Complete application suite', 'Multiple document types', 'Premium review process', '1-2 day delivery'],
      buttonText: 'Get Application SOP',
      isPrimary: true
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (details.careerGoal.trim() && details.academicBackground.trim() && selectedSOPType) {
      onSubmit({
        ...details,
        sopType: selectedSOPType
      })
    }
  }

  const handleSOPSelection = (sopType: SOPType) => {
    setSelectedSOPType(sopType)
    if (sopType === 'free') {
      // For free option, route directly to AI assistant
      onSubmit({
        careerGoal: 'Free university recommendations',
        experience: '',
        academicBackground: 'Seeking university recommendations',
        sopType: 'free'
      })
    }
  }

  const isValid = details.careerGoal.trim() && details.academicBackground.trim() && selectedSOPType

  return (
    <div className="space-y-6">
      {/* SOP Type Selection */}
      {!selectedSOPType && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sopOptions.map((option) => (
            <Card 
              key={option.type} 
              className={`p-4 transition-all hover:shadow-lg border-2 ${
                option.isPrimary ? 'border-primary/20 hover:border-primary/40' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <Badge variant={option.type === 'free' ? 'secondary' : 'default'}>
                    {option.price}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600">{option.description}</p>
                
                <ul className="space-y-1">
                  {option.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={option.isPrimary ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSOPSelection(option.type)}
                >
                  {option.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Form for premium options */}
      {selectedSOPType && selectedSOPType !== 'free' && (
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {sopOptions.find(opt => opt.type === selectedSOPType)?.title}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedSOPType(null)}
            >
              Change Option
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="careerGoal">Career Goal *</Label>
              <Textarea
                id="careerGoal"
                value={details.careerGoal}
                onChange={(e) => setDetails((prev) => ({ ...prev, careerGoal: e.target.value }))}
                placeholder="What do you want to achieve in your career after graduation?"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                value={details.experience}
                onChange={(e) => setDetails((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="Describe your work experience, internships, projects, or volunteer work"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="academicBackground">Academic Background *</Label>
              <Textarea
                id="academicBackground"
                value={details.academicBackground}
                onChange={(e) => setDetails((prev) => ({ ...prev, academicBackground: e.target.value }))}
                placeholder="Tell me about your education, achievements, and relevant coursework"
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" disabled={!isValid} className="w-full">
              Generate My SOP ✍️
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}
