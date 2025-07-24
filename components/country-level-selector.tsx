"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
} from "lucide-react";
import { LevelRequirements } from "./level-requirements";

interface CountryLevelSelectorProps {
  onSOPOrder?: (
    type: "admission" | "immigration",
    level: string,
    country: string
  ) => void;
  onApplicationHelp?: (level: string, country: string) => void;
}

export function CountryLevelSelector({
  onSOPOrder,
  onApplicationHelp,
}: CountryLevelSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<
    "canada" | "uk" | null
  >(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const countries = [
    {
      id: "canada" as const,
      name: "Canada",
      flag: "🇨🇦",
      description:
        "World-class education with post-graduation work opportunities",
      highlights: [
        "3-year PGWP",
        "Pathway to PR",
        "Multicultural society",
        "High quality of life",
      ],
      popularPrograms: [
        "Computer Science",
        "Business",
        "Engineering",
        "Healthcare",
      ],
    },
    {
      id: "uk" as const,
      name: "United Kingdom",
      flag: "🇬🇧",
      description: "Prestigious universities with rich academic tradition",
      highlights: [
        "2-year PSW visa",
        "World-renowned universities",
        "Cultural diversity",
        "Gateway to Europe",
      ],
      popularPrograms: ["Business", "Law", "Medicine", "Arts & Humanities"],
    },
  ];

  const levels = [
    {
      id: "undergraduate",
      name: "Undergraduate",
      icon: "🎓",
      description: "Bachelor's degree programs",
      duration: "3-4 years",
      popularFor: "First university degree",
    },
    {
      id: "masters",
      name: "Master's",
      icon: "📚",
      description: "Postgraduate specialization",
      duration: "1-2 years",
      popularFor: "Career advancement",
    },
    {
      id: "phd",
      name: "PhD",
      icon: "🔬",
      description: "Research doctorate programs",
      duration: "3-5 years",
      popularFor: "Academic & research careers",
    },
    {
      id: "diploma",
      name: "Diploma",
      icon: "🛠️",
      description: "Professional certification",
      duration: "6 months - 2 years",
      popularFor: "Skill development",
    },
  ];

  const handleSOPOrder = (type: "admission" | "immigration") => {
    if (selectedCountry && selectedLevel && onSOPOrder) {
      onSOPOrder(type, selectedLevel, selectedCountry);
    }
  };

  const handleApplicationHelp = () => {
    if (selectedCountry && selectedLevel && onApplicationHelp) {
      onApplicationHelp(selectedLevel, selectedCountry);
    }
  };

  if (selectedCountry && selectedLevel) {
    return (
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCountry(null);
              setSelectedLevel(null);
            }}
          >
            ← Back to selection
          </Button>
          <span>/</span>
          <span className="font-medium">
            {countries.find((c) => c.id === selectedCountry)?.flag}{" "}
            {countries.find((c) => c.id === selectedCountry)?.name}
          </span>
          <span>/</span>
          <span className="font-medium">
            {levels.find((l) => l.id === selectedLevel)?.icon}{" "}
            {levels.find((l) => l.id === selectedLevel)?.name}
          </span>
        </div>

        {/* Level Requirements Component */}
        <LevelRequirements
          level={selectedLevel}
          country={selectedCountry}
          onSOPOrder={handleSOPOrder}
          onApplicationHelp={handleApplicationHelp}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Study Destination & Level
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select your target country and study level to get personalized
          requirements and services
        </p>
      </div>

      {/* Step 1: Country Selection */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <MapPin className="h-6 w-6 text-blue-600" />
          Step 1: Select Country
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {countries.map((country) => (
            <Card
              key={country.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCountry === country.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedCountry(country.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                    <p className="text-sm text-gray-600 font-normal">
                      {country.description}
                    </p>
                  </div>
                  {selectedCountry === country.id && (
                    <CheckCircle className="h-6 w-6 text-blue-600 ml-auto" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      Key Benefits:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {country.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      Popular Programs:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {country.popularPrograms.map((program, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Step 2: Level Selection */}
      {selectedCountry && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <GraduationCap className="h-6 w-6 text-green-600" />
            Step 2: Select Study Level
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {levels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === level.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{level.icon}</div>
                  <CardTitle className="text-lg">{level.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{level.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500">{level.popularFor}</p>
                    {selectedLevel === level.id && (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedCountry && selectedLevel && (
        <div className="text-center">
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
            onClick={() => {
              // This will trigger the re-render to show LevelRequirements
            }}
          >
            View Requirements & Services
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Why Choose Study Abroad Assistant?
          </h3>
          <p className="text-gray-600">
            Trusted by thousands of students worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <p className="text-sm text-gray-600">Students Helped</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <p className="text-sm text-gray-600">Support Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
