"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Crown,
  Zap,
} from "lucide-react";

export function ProfessionalServicesSection() {
  const [selectedTier, setSelectedTier] = useState<
    "standard" | "priority" | "urgent"
  >("standard");

  const handleTierSelect = (tier: "standard" | "priority" | "urgent") => {
    setSelectedTier(tier);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 Professional SOP Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get expertly crafted statements of purpose from specialized agents
          with deep knowledge of your target country requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Agent Partnership Highlight */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Agent Partnership Program
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                New
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">$149</p>
                <p className="text-sm text-gray-600">Standard SOP</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold">7-10 Days</p>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Dedicated country specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">
                  Automated payment & agent assignment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Professional email handling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Agent commission system</span>
              </div>
            </div>

            <Link href="/professional-sop">
              <Button className="w-full" size="lg">
                <FileText className="h-5 w-5 mr-2" />
                Order Professional SOP
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Service Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-purple-600" />
              Service Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Standard */}
              <button
                onClick={() => handleTierSelect("standard")}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedTier === "standard"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Standard</h4>
                  <Badge
                    variant={
                      selectedTier === "standard" ? "default" : "outline"
                    }
                  >
                    $149
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">7-10 business days</p>
                <ul className="text-sm space-y-1">
                  <li>• Professional SOP writing</li>
                  <li>• Country-specific expert</li>
                  <li>• PDF or Word format</li>
                </ul>
              </button>

              {/* Priority */}
              <button
                onClick={() => handleTierSelect("priority")}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedTier === "priority"
                    ? "border-orange-500 bg-orange-100 ring-2 ring-orange-200"
                    : "border-orange-200 bg-orange-50 hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 text-orange-500" />
                    Priority
                  </h4>
                  <Badge
                    className={
                      selectedTier === "priority"
                        ? "bg-orange-600"
                        : "bg-orange-500"
                    }
                  >
                    $199
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">3-5 business days</p>
                <ul className="text-sm space-y-1">
                  <li>• Everything in Standard</li>
                  <li>• Priority agent assignment</li>
                  <li>• Faster delivery</li>
                </ul>
              </button>

              {/* Urgent */}
              <button
                onClick={() => handleTierSelect("urgent")}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedTier === "urgent"
                    ? "border-red-500 bg-red-100 ring-2 ring-red-200"
                    : "border-red-200 bg-red-50 hover:border-red-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-1">
                    <Zap className="h-4 w-4 text-red-500" />
                    Urgent
                  </h4>
                  <Badge
                    className={
                      selectedTier === "urgent" ? "bg-red-600" : "bg-red-500"
                    }
                  >
                    $299
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">24-48 hours</p>
                <ul className="text-sm space-y-1">
                  <li>• Everything in Priority</li>
                  <li>• Express delivery</li>
                  <li>• Top priority handling</li>
                </ul>
              </button>
            </div>

            <Link href={`/professional-sop?tier=${selectedTier}`}>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started with{" "}
                {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} -
                $
                {selectedTier === "standard"
                  ? "149"
                  : selectedTier === "priority"
                  ? "199"
                  : "299"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Agent Support Countries */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Countries with Dedicated Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🇨🇦</div>
              <p className="text-sm font-medium">Canada</p>
              <p className="text-xs text-gray-500">2 specialists</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🇬🇧</div>
              <p className="text-sm font-medium">UK</p>
              <p className="text-xs text-gray-500">2 specialists</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🇩🇪</div>
              <p className="text-sm font-medium">Germany</p>
              <p className="text-xs text-gray-500">2 specialists</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🇦🇺</div>
              <p className="text-sm font-medium">Australia</p>
              <p className="text-xs text-gray-500">2 specialists</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🇺🇸</div>
              <p className="text-sm font-medium">USA</p>
              <p className="text-xs text-gray-500">2 specialists</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            More countries and specialists being added regularly
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
