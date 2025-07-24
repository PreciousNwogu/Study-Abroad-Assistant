"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MapPin, Star } from "lucide-react";

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: string;
  type: string;
  icon: string;
}

interface UniversitySelectorProps {
  country: string;
  onSelect: (university: University) => void;
}

export function UniversitySelector({
  country,
  onSelect,
}: UniversitySelectorProps) {
  const getUniversitiesByCountry = (country: string): University[] => {
    const universitiesData: Record<string, University[]> = {
      Canada: [
        {
          id: "toronto",
          name: "University of Toronto",
          country: "Canada",
          city: "Toronto, ON",
          ranking: "#1 in Canada",
          type: "Research University",
          icon: "🏛️",
        },
        {
          id: "mcgill",
          name: "McGill University",
          country: "Canada",
          city: "Montreal, QC",
          ranking: "#2 in Canada",
          type: "Research University",
          icon: "🎓",
        },
        {
          id: "ubc",
          name: "University of British Columbia",
          country: "Canada",
          city: "Vancouver, BC",
          ranking: "#3 in Canada",
          type: "Research University",
          icon: "🌊",
        },
        {
          id: "waterloo",
          name: "University of Waterloo",
          country: "Canada",
          city: "Waterloo, ON",
          ranking: "#4 in Canada",
          type: "Tech Focus",
          icon: "💻",
        },
      ],
      UK: [
        {
          id: "oxford",
          name: "University of Oxford",
          country: "UK",
          city: "Oxford",
          ranking: "#1 in UK",
          type: "Ancient University",
          icon: "👑",
        },
        {
          id: "cambridge",
          name: "University of Cambridge",
          country: "UK",
          city: "Cambridge",
          ranking: "#2 in UK",
          type: "Ancient University",
          icon: "🏰",
        },
        {
          id: "imperial",
          name: "Imperial College London",
          country: "UK",
          city: "London",
          ranking: "#3 in UK",
          type: "STEM Focus",
          icon: "🔬",
        },
        {
          id: "lse",
          name: "London School of Economics",
          country: "UK",
          city: "London",
          ranking: "#4 in UK",
          type: "Business & Economics",
          icon: "📊",
        },
      ],
    };

    return universitiesData[country] || [];
  };

  const universities = getUniversitiesByCountry(country);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-3">
        Select a university you're interested in from {country}:
      </div>
      <div className="grid gap-3">
        {universities.map((university) => (
          <Card
            key={university.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
            onClick={() => onSelect(university)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{university.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {university.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs text-gray-600">
                        {university.ranking}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{university.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{university.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-4">
        <Button
          variant="outline"
          onClick={() =>
            onSelect({
              id: "other",
              name: `Other ${country} universities`,
              country: country,
              city: "Various cities",
              ranking: "All levels",
              type: "All types",
              icon: "🎓",
            })
          }
          className="text-sm"
        >
          I'm interested in other {country} universities
        </Button>
      </div>
    </div>
  );
}
