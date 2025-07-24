"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
} from "lucide-react";

interface PremiumSOPWizardProps {
  onSubmit: (sopData: SOPFormData) => void;
  onBack?: () => void;
}

interface SOPFormData {
  // Personal & Academic Background
  fullName: string;
  currentEducation: string;
  gpa: string;
  universityName: string;
  graduationYear: string;

  // Target Program Details
  targetProgram: string;
  targetUniversity: string;
  targetCountry: string;
  applicationDeadline: string;

  // Career & Goals
  careerGoal: string;
  shortTermGoals: string;
  longTermVision: string;
  whyThisProgram: string;
  whyThisUniversity: string;

  // Experience & Achievements
  workExperience: string;
  researchExperience: string;
  projects: string;
  achievements: string;
  extracurriculars: string;

  // Skills & Interests
  technicalSkills: string;
  languageSkills: string;
  personalInterests: string;

  // Story & Motivation
  inspirationStory: string;
  challenges: string;
  uniqueValue: string;

  // Financial & Practical
  fundingPlan: string;
  postGradPlans: string;
}

const initialFormData: SOPFormData = {
  fullName: "",
  currentEducation: "",
  gpa: "",
  universityName: "",
  graduationYear: "",
  targetProgram: "",
  targetUniversity: "",
  targetCountry: "",
  applicationDeadline: "",
  careerGoal: "",
  shortTermGoals: "",
  longTermVision: "",
  whyThisProgram: "",
  whyThisUniversity: "",
  workExperience: "",
  researchExperience: "",
  projects: "",
  achievements: "",
  extracurriculars: "",
  technicalSkills: "",
  languageSkills: "",
  personalInterests: "",
  inspirationStory: "",
  challenges: "",
  uniqueValue: "",
  fundingPlan: "",
  postGradPlans: "",
};

const steps = [
  {
    id: 1,
    title: "Personal & Academic",
    icon: GraduationCap,
    description: "Tell us about your educational background",
  },
  {
    id: 2,
    title: "Target Program",
    icon: Target,
    description: "Details about your dream program",
  },
  {
    id: 3,
    title: "Career Vision",
    icon: Briefcase,
    description: "Your professional goals and aspirations",
  },
  {
    id: 4,
    title: "Experience",
    icon: Award,
    description: "Your achievements and experiences",
  },
  {
    id: 5,
    title: "Personal Story",
    icon: Sparkles,
    description: "What makes you unique",
  },
  {
    id: 6,
    title: "Future Plans",
    icon: Globe,
    description: "Your plans beyond graduation",
  },
];

export function PremiumSOPWizard({ onSubmit, onBack }: PremiumSOPWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SOPFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof SOPFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!formData.currentEducation.trim())
          newErrors.currentEducation = "Current education is required";
        if (!formData.universityName.trim())
          newErrors.universityName = "University name is required";
        break;
      case 2:
        if (!formData.targetProgram.trim())
          newErrors.targetProgram = "Target program is required";
        if (!formData.targetUniversity.trim())
          newErrors.targetUniversity = "Target university is required";
        if (!formData.targetCountry.trim())
          newErrors.targetCountry = "Target country is required";
        break;
      case 3:
        if (!formData.careerGoal.trim())
          newErrors.careerGoal = "Career goal is required";
        if (!formData.whyThisProgram.trim())
          newErrors.whyThisProgram =
            "Reason for choosing this program is required";
        break;
      case 4:
        // At least one experience field should be filled
        if (
          !formData.workExperience.trim() &&
          !formData.researchExperience.trim() &&
          !formData.projects.trim()
        ) {
          newErrors.workExperience =
            "Please provide at least one type of experience";
        }
        break;
      case 5:
        if (!formData.inspirationStory.trim())
          newErrors.inspirationStory = "Your inspiration story is required";
        if (!formData.uniqueValue.trim())
          newErrors.uniqueValue = "What makes you unique is required";
        break;
      case 6:
        if (!formData.postGradPlans.trim())
          newErrors.postGradPlans = "Post-graduation plans are required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Let's start with your academic background
              </h3>
              <p className="text-gray-600">
                This helps us understand your educational journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Your full name as on official documents"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="currentEducation">
                  Current Education Level *
                </Label>
                <Input
                  id="currentEducation"
                  value={formData.currentEducation}
                  onChange={(e) =>
                    updateFormData("currentEducation", e.target.value)
                  }
                  placeholder="e.g., Bachelor's in Computer Science"
                  className={errors.currentEducation ? "border-red-500" : ""}
                />
                {errors.currentEducation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentEducation}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="universityName">Current University *</Label>
                <Input
                  id="universityName"
                  value={formData.universityName}
                  onChange={(e) =>
                    updateFormData("universityName", e.target.value)
                  }
                  placeholder="Name of your current institution"
                  className={errors.universityName ? "border-red-500" : ""}
                />
                {errors.universityName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.universityName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="gpa">GPA/CGPA (Optional)</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => updateFormData("gpa", e.target.value)}
                  placeholder="e.g., 3.8/4.0 or 8.5/10.0"
                />
              </div>

              <div>
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Input
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={(e) =>
                    updateFormData("graduationYear", e.target.value)
                  }
                  placeholder="e.g., 2024"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Tell us about your target program
              </h3>
              <p className="text-gray-600">
                The more specific, the better we can tailor your SOP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="targetProgram">Target Program *</Label>
                <Input
                  id="targetProgram"
                  value={formData.targetProgram}
                  onChange={(e) =>
                    updateFormData("targetProgram", e.target.value)
                  }
                  placeholder="e.g., Master of Science in Data Science"
                  className={errors.targetProgram ? "border-red-500" : ""}
                />
                {errors.targetProgram && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.targetProgram}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetUniversity">Target University *</Label>
                <Input
                  id="targetUniversity"
                  value={formData.targetUniversity}
                  onChange={(e) =>
                    updateFormData("targetUniversity", e.target.value)
                  }
                  placeholder="e.g., Stanford University"
                  className={errors.targetUniversity ? "border-red-500" : ""}
                />
                {errors.targetUniversity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.targetUniversity}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetCountry">Target Country *</Label>
                <Input
                  id="targetCountry"
                  value={formData.targetCountry}
                  onChange={(e) =>
                    updateFormData("targetCountry", e.target.value)
                  }
                  placeholder="e.g., United States"
                  className={errors.targetCountry ? "border-red-500" : ""}
                />
                {errors.targetCountry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.targetCountry}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="applicationDeadline">
                  Application Deadline (Optional)
                </Label>
                <Input
                  id="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={(e) =>
                    updateFormData("applicationDeadline", e.target.value)
                  }
                  placeholder="e.g., December 15, 2024"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                What drives your career vision?
              </h3>
              <p className="text-gray-600">
                Help us understand your professional aspirations
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="careerGoal">Primary Career Goal *</Label>
                <Textarea
                  id="careerGoal"
                  value={formData.careerGoal}
                  onChange={(e) => updateFormData("careerGoal", e.target.value)}
                  placeholder="What do you want to achieve in your career? Be specific about roles, industries, or impact you want to make."
                  className={`min-h-[100px] ${
                    errors.careerGoal ? "border-red-500" : ""
                  }`}
                />
                {errors.careerGoal && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.careerGoal}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="shortTermGoals">
                  Short-term Goals (1-3 years)
                </Label>
                <Textarea
                  id="shortTermGoals"
                  value={formData.shortTermGoals}
                  onChange={(e) =>
                    updateFormData("shortTermGoals", e.target.value)
                  }
                  placeholder="What do you plan to achieve immediately after graduation?"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="longTermVision">
                  Long-term Vision (5-10 years)
                </Label>
                <Textarea
                  id="longTermVision"
                  value={formData.longTermVision}
                  onChange={(e) =>
                    updateFormData("longTermVision", e.target.value)
                  }
                  placeholder="Where do you see yourself in the long run? Leadership roles, entrepreneurship, research?"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="whyThisProgram">
                  Why This Specific Program? *
                </Label>
                <Textarea
                  id="whyThisProgram"
                  value={formData.whyThisProgram}
                  onChange={(e) =>
                    updateFormData("whyThisProgram", e.target.value)
                  }
                  placeholder="What specific aspects of this program align with your goals? Mention courses, faculty, research opportunities."
                  className={`min-h-[100px] ${
                    errors.whyThisProgram ? "border-red-500" : ""
                  }`}
                />
                {errors.whyThisProgram && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whyThisProgram}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="whyThisUniversity">Why This University?</Label>
                <Textarea
                  id="whyThisUniversity"
                  value={formData.whyThisUniversity}
                  onChange={(e) =>
                    updateFormData("whyThisUniversity", e.target.value)
                  }
                  placeholder="What attracts you to this specific institution? Research facilities, culture, location, partnerships?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Showcase your experience
              </h3>
              <p className="text-gray-600">
                Tell us about your achievements and experiences that make you
                stand out
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workExperience">Work Experience</Label>
                <Textarea
                  id="workExperience"
                  value={formData.workExperience}
                  onChange={(e) =>
                    updateFormData("workExperience", e.target.value)
                  }
                  placeholder="Describe your professional experience, internships, part-time jobs. Include specific achievements and learnings."
                  className={`min-h-[100px] ${
                    errors.workExperience ? "border-red-500" : ""
                  }`}
                />
                {errors.workExperience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.workExperience}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="researchExperience">Research Experience</Label>
                <Textarea
                  id="researchExperience"
                  value={formData.researchExperience}
                  onChange={(e) =>
                    updateFormData("researchExperience", e.target.value)
                  }
                  placeholder="Any research projects, publications, conferences, or academic collaborations."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="projects">Key Projects</Label>
                <Textarea
                  id="projects"
                  value={formData.projects}
                  onChange={(e) => updateFormData("projects", e.target.value)}
                  placeholder="Significant academic or personal projects that demonstrate your skills and passion."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="achievements">Awards & Achievements</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) =>
                    updateFormData("achievements", e.target.value)
                  }
                  placeholder="Academic honors, scholarships, competitions, certifications, or recognition."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="extracurriculars">
                  Leadership & Extracurriculars
                </Label>
                <Textarea
                  id="extracurriculars"
                  value={formData.extracurriculars}
                  onChange={(e) =>
                    updateFormData("extracurriculars", e.target.value)
                  }
                  placeholder="Leadership roles, volunteer work, clubs, sports, or community involvement."
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <Textarea
                    id="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={(e) =>
                      updateFormData("technicalSkills", e.target.value)
                    }
                    placeholder="Programming languages, software, tools, technologies"
                    className="min-h-[60px]"
                  />
                </div>

                <div>
                  <Label htmlFor="languageSkills">Language Skills</Label>
                  <Textarea
                    id="languageSkills"
                    value={formData.languageSkills}
                    onChange={(e) =>
                      updateFormData("languageSkills", e.target.value)
                    }
                    placeholder="Languages you speak and proficiency levels"
                    className="min-h-[60px]"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Your personal story
              </h3>
              <p className="text-gray-600">
                What makes you unique and drives your passion?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="inspirationStory">
                  What Inspired Your Academic Journey? *
                </Label>
                <Textarea
                  id="inspirationStory"
                  value={formData.inspirationStory}
                  onChange={(e) =>
                    updateFormData("inspirationStory", e.target.value)
                  }
                  placeholder="Share the story of what sparked your interest in this field. Was it a person, experience, problem you wanted to solve?"
                  className={`min-h-[120px] ${
                    errors.inspirationStory ? "border-red-500" : ""
                  }`}
                />
                {errors.inspirationStory && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.inspirationStory}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="challenges">
                  Challenges & How You Overcame Them
                </Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) => updateFormData("challenges", e.target.value)}
                  placeholder="Describe a significant challenge you faced and how you overcame it. This shows resilience and problem-solving."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="uniqueValue">What Makes You Unique? *</Label>
                <Textarea
                  id="uniqueValue"
                  value={formData.uniqueValue}
                  onChange={(e) =>
                    updateFormData("uniqueValue", e.target.value)
                  }
                  placeholder="What unique perspective, background, or qualities will you bring to the program and university community?"
                  className={`min-h-[100px] ${
                    errors.uniqueValue ? "border-red-500" : ""
                  }`}
                />
                {errors.uniqueValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.uniqueValue}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="personalInterests">
                  Personal Interests & Hobbies
                </Label>
                <Textarea
                  id="personalInterests"
                  value={formData.personalInterests}
                  onChange={(e) =>
                    updateFormData("personalInterests", e.target.value)
                  }
                  placeholder="What do you enjoy outside of academics? This helps show you as a well-rounded individual."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Planning for the future
              </h3>
              <p className="text-gray-600">
                How will this program help you achieve your dreams?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="postGradPlans">Post-Graduation Plans *</Label>
                <Textarea
                  id="postGradPlans"
                  value={formData.postGradPlans}
                  onChange={(e) =>
                    updateFormData("postGradPlans", e.target.value)
                  }
                  placeholder="What are your immediate plans after graduation? Job search strategy, further studies, entrepreneurship?"
                  className={`min-h-[100px] ${
                    errors.postGradPlans ? "border-red-500" : ""
                  }`}
                />
                {errors.postGradPlans && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postGradPlans}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="fundingPlan">Funding Plan</Label>
                <Textarea
                  id="fundingPlan"
                  value={formData.fundingPlan}
                  onChange={(e) =>
                    updateFormData("fundingPlan", e.target.value)
                  }
                  placeholder="How do you plan to fund your education? Scholarships, family support, loans, assistantships?"
                  className="min-h-[80px]"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🎯 Professional Review Process
                </h4>
                <p className="text-blue-700 text-sm">
                  You're about to receive a professionally crafted,
                  human-reviewed SOP. Our expert team will analyze all your
                  responses and create a compelling narrative that:
                </p>
                <ul className="text-blue-700 text-sm mt-2 ml-4 space-y-1">
                  <li>• Tells your unique story with authentic voice</li>
                  <li>
                    • Strategically connects your experiences to your goals
                  </li>
                  <li>
                    • Demonstrates specific knowledge about your target program
                  </li>
                  <li>• Positions you competitively for admission success</li>
                  <li>• Follows university-specific best practices</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded text-xs text-blue-800">
                  <strong>📧 Contact Our Team:</strong>
                  <br />
                  Email: studyabroadasistant@gmail.com
                  <br />
                  WhatsApp: +1 (555) 123-4567
                  <br />
                  Website: www.studysmartai.com
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Professional SOP Service</CardTitle>
            <p className="text-purple-100">
              Human-Reviewed • Expert-Crafted • University-Specific
            </p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-4 bg-white/20" />
      </CardHeader>

      <CardContent className="p-8">
        {/* Step Navigator */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center min-w-[100px] ${
                    index < steps.length - 1 ? "mr-4" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className={`text-xs text-center font-medium ${
                      isActive
                        ? "text-purple-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="flex gap-2">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                ← Back to Chat
              </Button>
            )}
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                <Sparkles size={16} className="mr-2" />
                Submit for Professional Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
