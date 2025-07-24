"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calculator, HelpCircle } from "lucide-react";

interface BudgetSelectorProps {
  onSelect: (budget: string) => void;
}

interface Budget {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  suitable: string;
  color: string;
}

export function BudgetSelector({ onSelect }: BudgetSelectorProps) {
  const budgets: Budget[] = [
    {
      id: "low",
      label: "< $15,000",
      value: "under $15,000",
      icon: <DollarSign className="h-5 w-5" />,
      description: "Budget-friendly options",
      suitable: "Community colleges, some state universities",
      color: "border-green-300 hover:border-green-400",
    },
    {
      id: "medium",
      label: "$15,000 – $30,000",
      value: "$15,000 - $30,000",
      icon: <Calculator className="h-5 w-5" />,
      description: "Mid-range investment",
      suitable: "State universities, some private colleges",
      color: "border-blue-300 hover:border-blue-400",
    },
    {
      id: "high",
      label: "$30,000 – $60,000",
      value: "$30,000 - $60,000",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Premium education",
      suitable: "Top universities, private institutions",
      color: "border-purple-300 hover:border-purple-400",
    },
    {
      id: "premium",
      label: "$60,000+",
      value: "over $60,000",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Elite institutions",
      suitable: "Ivy League, top global universities",
      color: "border-gold-300 hover:border-yellow-400",
    },
    {
      id: "flexible",
      label: "Not sure yet",
      value: "flexible budget",
      icon: <HelpCircle className="h-5 w-5" />,
      description: "Explore all options",
      suitable: "Show me universities across all price ranges",
      color: "border-gray-300 hover:border-gray-400",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-3">
        What's your annual tuition budget? (Costs vary by country - this helps
        us recommend suitable universities)
      </div>

      <div className="grid gap-3">
        {budgets.map((budget) => (
          <Card
            key={budget.id}
            className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${budget.color}`}
            onClick={() => onSelect(budget.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">{budget.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {budget.label}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {budget.description}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{budget.suitable}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">💡 Budget Tips:</p>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• Consider living costs (add $10,000-$20,000/year)</li>
              <li>• Look for scholarships and financial aid</li>
              <li>
                • Some countries offer lower tuition for international students
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
