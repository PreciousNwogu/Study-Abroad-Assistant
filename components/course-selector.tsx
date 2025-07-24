"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Briefcase,
  FlaskConical,
  Stethoscope,
  Code,
  Palette,
  Calculator,
  Globe,
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  category: string;
  icon: JSX.Element;
  popular: boolean;
}

interface CourseSelectorProps {
  onSelect: (course: Course) => void;
}

export function CourseSelector({ onSelect }: CourseSelectorProps) {
  const courses: Course[] = [
    {
      id: "computer-science",
      name: "Computer Science",
      category: "Technology",
      icon: <Code className="h-5 w-5" />,
      popular: true,
    },
    {
      id: "business-administration",
      name: "Business Administration",
      category: "Business",
      icon: <Briefcase className="h-5 w-5" />,
      popular: true,
    },
    {
      id: "medicine",
      name: "Medicine",
      category: "Health Sciences",
      icon: <Stethoscope className="h-5 w-5" />,
      popular: true,
    },
    {
      id: "engineering",
      name: "Engineering",
      category: "Technology",
      icon: <FlaskConical className="h-5 w-5" />,
      popular: true,
    },
    {
      id: "international-relations",
      name: "International Relations",
      category: "Social Sciences",
      icon: <Globe className="h-5 w-5" />,
      popular: false,
    },
    {
      id: "arts-design",
      name: "Arts & Design",
      category: "Creative Arts",
      icon: <Palette className="h-5 w-5" />,
      popular: false,
    },
    {
      id: "mathematics",
      name: "Mathematics",
      category: "STEM",
      icon: <Calculator className="h-5 w-5" />,
      popular: false,
    },
    {
      id: "literature",
      name: "Literature",
      category: "Humanities",
      icon: <BookOpen className="h-5 w-5" />,
      popular: false,
    },
  ];

  const popularCourses = courses.filter((course) => course.popular);
  const otherCourses = courses.filter((course) => !course.popular);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-3">
        What field of study are you interested in?
      </div>

      {/* Popular Courses */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Popular Courses
        </h4>
        <div className="grid gap-2">
          {popularCourses.map((course) => (
            <Card
              key={course.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => onSelect(course)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">{course.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Courses */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Other Fields</h4>
        <div className="grid gap-2">
          {otherCourses.map((course) => (
            <Card
              key={course.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => onSelect(course)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">{course.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <Button
          variant="outline"
          onClick={() =>
            onSelect({
              id: "any",
              name: "Any field - show me all options",
              category: "All fields",
              icon: <BookOpen className="h-5 w-5" />,
              popular: false,
            })
          }
          className="text-sm"
        >
          I'm open to any field of study
        </Button>
      </div>
    </div>
  );
}
