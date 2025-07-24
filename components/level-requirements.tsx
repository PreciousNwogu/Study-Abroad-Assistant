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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Calendar,
  BookOpen,
  Plane,
} from "lucide-react";
import {
  getLevelRequirement,
  getCountrySpecificInfo,
} from "@/lib/level-requirements";

interface LevelRequirementsProps {
  level: string;
  country: "canada" | "uk";
  onSOPOrder: (type: "admission" | "immigration") => void;
  onApplicationHelp: () => void;
}

export function LevelRequirements({
  level,
  country,
  onSOPOrder,
  onApplicationHelp,
}: LevelRequirementsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const requirement = getLevelRequirement(level);
  const countryInfo = getCountrySpecificInfo(level, country);

  if (!requirement || !countryInfo) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">
            Requirements not found for this level and country combination.
          </p>
        </CardContent>
      </Card>
    );
  }

  const countryFlag = country === "canada" ? "🇨🇦" : "🇬🇧";
  const countryName = country === "canada" ? "Canada" : "United Kingdom";

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <GraduationCap className="h-6 w-6" />
                {requirement.displayName}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {countryFlag} {countryName} - {requirement.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {requirement.duration}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="immigration">Immigration</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Financial Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Annual Cost:</p>
                <p className="font-semibold text-lg">
                  {countryInfo.financialRequirement}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Includes tuition fees and living expenses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Language Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Minimum Scores:</p>
                <p className="font-semibold">
                  {countryInfo.languageRequirement}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  IELTS or TOEFL accepted
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-2">
                {requirement.applicationTimeline}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Start preparation early</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Allow time for document processing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Multiple application rounds available
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level-Specific Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requirement.specificRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admission Tab */}
        <TabsContent value="admission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Admission Documents Required
              </CardTitle>
              <CardDescription>
                Complete checklist for university admission application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requirement.admissionDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{doc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admission SOP Focus Areas</CardTitle>
              <CardDescription>
                Key points to emphasize in your admission statement of purpose
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requirement.sopFocus.admission.map((focus, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{focus}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Immigration Tab */}
        <TabsContent value="immigration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-green-600" />
                Immigration Documents Required
              </CardTitle>
              <CardDescription>
                Complete checklist for study permit/visa application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requirement.immigrationDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <FileText className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{doc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Immigration SOP Focus Areas</CardTitle>
              <CardDescription>
                Key points to emphasize in your study permit/visa statement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requirement.sopFocus.immigration.map((focus, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{focus}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  SOP Writing Services
                </CardTitle>
                <CardDescription>
                  Professional statement of purpose writing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button
                    onClick={() => onSOPOrder("admission")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Admission SOP - $149
                  </Button>
                  <Button
                    onClick={() => onSOPOrder("immigration")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plane className="h-4 w-4 mr-2" />
                    Immigration SOP - $149
                  </Button>
                </div>
                <div className="text-xs text-gray-500">
                  <p>✓ Level-specific content</p>
                  <p>✓ Country-specific requirements</p>
                  <p>✓ Professional writing & review</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Application Assistance
                </CardTitle>
                <CardDescription>
                  Complete application support services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={onApplicationHelp}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Application Help - $299
                </Button>
                <div className="text-xs text-gray-500">
                  <p>✓ Document preparation</p>
                  <p>✓ Application review</p>
                  <p>✓ Interview preparation</p>
                  <p>✓ Submission assistance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bundle Package</CardTitle>
              <CardDescription>
                Complete package for your study abroad journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">
                      Complete Journey Package
                    </h4>
                    <p className="text-sm text-gray-600">
                      Admission SOP + Immigration SOP + Application Help
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 line-through">$747</p>
                    <p className="text-2xl font-bold text-green-600">$599</p>
                    <p className="text-xs text-green-600">Save $148</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Complete Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
