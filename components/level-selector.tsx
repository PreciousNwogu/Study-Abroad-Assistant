"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Award,
  Clock,
  DollarSign,
} from "lucide-react";

interface LevelSelectorProps {
  onSelect: (level: string) => void;
}

interface Level {
  id: string;
  name: string;
  icon: React.ReactNode;
  duration: string;
  description: string;
  avgCost: string;
  requirements: string[];
  popular: boolean;
}

export function LevelSelector({ onSelect }: LevelSelectorProps) {
  const levels: Level[] = [
    {
      id: "undergraduate",
      name: "Undergraduate",
      icon: <GraduationCap className="h-5 w-5" />,
      duration: "3-4 years",
      description: "Bachelor's degree programs",
      avgCost: "$15,000-$40,000/year",
      requirements: [
        "High school diploma",
        "Language test",
        "Application essays",
      ],
      popular: true,
    },
    {
      id: "masters",
      name: "Masters",
      icon: <BookOpen className="h-5 w-5" />,
      duration: "1-2 years",
      description: "Master's degree programs",
      avgCost: "$20,000-$50,000/year",
      requirements: ["Bachelor's degree", "GRE/GMAT", "Work experience"],
      popular: true,
    },
    {
      id: "phd",
      name: "PhD",
      icon: <FlaskConical className="h-5 w-5" />,
      duration: "3-5 years",
      description: "Doctoral research programs",
      avgCost: "$25,000-$60,000/year",
      requirements: [
        "Master's degree",
        "Research proposal",
        "Academic references",
      ],
      popular: false,
    },
    {
      id: "diploma",
      name: "Diploma/Certificate",
      icon: <Award className="h-5 w-5" />,
      duration: "6 months-2 years",
      description: "Professional certifications",
      avgCost: "$10,000-$25,000/year",
      requirements: [
        "High school/Bachelor's",
        "Professional experience",
        "Portfolio",
      ],
      popular: false,
    },
  ];

  const popularLevels = levels.filter((level) => level.popular);
  const otherLevels = levels.filter((level) => !level.popular);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-3">
        What level of study are you planning?
      </div>

      {/* Popular Levels */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Most Popular</h4>
        <div className="grid gap-3">
          {popularLevels.map((level) => (
            <Card
              key={level.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => onSelect(level.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">{level.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {level.name}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {level.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {level.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{level.avgCost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{level.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Levels */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Other Options
        </h4>
        <div className="grid gap-3">
          {otherLevels.map((level) => (
            <Card
              key={level.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => onSelect(level.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">{level.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {level.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {level.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {level.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{level.avgCost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{level.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
