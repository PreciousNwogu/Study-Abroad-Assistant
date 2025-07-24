"use client";

import { CheckCircle, Circle } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: string;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: "greeting", label: "Welcome", icon: "👋" },
    { id: "country", label: "Country", icon: "🌍" },
    { id: "university", label: "University", icon: "🏛️" },
    { id: "course", label: "Course", icon: "📚" },
    { id: "level", label: "Level", icon: "🎓" },
    { id: "budget", label: "Budget", icon: "💰" },
    { id: "recommendations", label: "Results", icon: "✨" },
    { id: "email_capture", label: "Email", icon: "📧" },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  if (currentIndex < 1) return null; // Don't show progress on greeting

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-800">Progress</span>
        <span className="text-xs text-blue-600">
          {currentIndex}/{steps.length - 1}
        </span>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        {steps.slice(1).map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < currentIndex;
          const isCurrent = stepIndex === currentIndex;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              {index < steps.length - 2 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-blue-600">
        {currentIndex < steps.length - 1
          ? `Current: ${steps[currentIndex]?.label}`
          : "Complete!"}
      </div>
    </div>
  );
}
