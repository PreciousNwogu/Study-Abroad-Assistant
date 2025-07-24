"use client";
import { useState } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CountryLevelSelector } from "@/components/country-level-selector";
import { ProfessionalServicesSection } from "@/components/professional-services-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Star,
  Zap,
  Clock,
  Phone,
  FileText,
  GraduationCap,
  DollarSign,
  Crown,
  Gift,
  Bot,
  MessageCircle,
  Users,
  Shield,
  Globe,
  Plane,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("requirements");

  const handleSOPOrder = (
    type: "admission" | "immigration",
    level: string,
    country: string
  ) => {
    // Handle SOP order logic
    console.log(`Ordering ${type} SOP for ${level} in ${country}`);
    // You can add navigation or modal logic here
  };

  const handleApplicationHelp = (level: string, country: string) => {
    // Handle application help logic
    console.log(`Requesting application help for ${level} in ${country}`);
    // You can add navigation or modal logic here
  };

  const handleServiceClick = (serviceType: string) => {
    switch (serviceType) {
      case "free":
        // Start the chat interface for free university list
        setActiveTab("chat");
        break;
      case "admission":
        // Redirect to professional SOP form with admission type
        window.location.href = "/professional-sop?service=admission";
        break;
      case "immigration":
        // Redirect to professional SOP form with visa type
        window.location.href = "/professional-sop?service=visa";
        break;
      case "application":
        // Redirect to professional SOP form with application help
        window.location.href =
          "/professional-sop?service=admission&tier=urgent";
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-grow">
        <div className="max-w-7xl mx-auto mb-8">
          {/* Hero Section - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  Study Abroad Assistant 🎓
                </h1>
                <p className="text-lg sm:text-xl text-gray-600">
                  Level-Specific Guidance for Canada & UK
                </p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Get personalized requirements, SOPs, and application assistance
              tailored to your specific study level and destination country
            </p>
          </div>

          {/* Main Content Tabs - Mobile Optimized */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6 sm:space-y-8"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
              <TabsTrigger value="requirements" className="text-xs sm:text-sm">
                Requirements
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-xs sm:text-sm">
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="services" className="text-xs sm:text-sm">
                Services
              </TabsTrigger>
            </TabsList>

            {/* Requirements Tab */}
            <TabsContent value="requirements">
              <CountryLevelSelector
                onSOPOrder={handleSOPOrder}
                onApplicationHelp={handleApplicationHelp}
              />
            </TabsContent>

            {/* Chat Tab - Mobile Optimized */}
            <TabsContent value="chat">
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <Card className="h-[450px] sm:h-[550px]">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Bot className="h-5 w-5 text-blue-600" />
                        Study Abroad Assistant
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Chat with our AI assistant for personalized guidance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] sm:h-[450px] p-3 sm:p-6">
                      <ChatInterface />
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Side Panel - Mobile Responsive */}
                <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg sm:text-xl">
                        AI Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            Smart Matching
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            University recommendations based on your profile
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            Document Guidance
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Step-by-step document preparation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            Real-time Support
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Instant answers to your questions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Success Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          95%
                        </div>
                        <div className="text-sm text-gray-600">
                          Admission Success Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          1000+
                        </div>
                        <div className="text-sm text-gray-600">
                          Students Helped
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          24/7
                        </div>
                        <div className="text-sm text-gray-600">
                          AI Support Available
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="space-y-12">
                {/* Professional Services Section */}
                <ProfessionalServicesSection />

                {/* Original Services Section */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Additional Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      From free university lists to premium consultation
                      services
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Free Service */}
                    <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">🆓</div>
                        <CardTitle className="text-lg text-green-700">
                          Free University List
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Basic university recommendations
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-green-700 mb-4">
                          FREE
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>10+ university names & locations</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Basic program information</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Tuition fee ranges</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Instant email delivery</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleServiceClick("free")}
                        >
                          Get Free List
                        </Button>
                      </CardContent>
                    </Card>
                    {/* Admission SOP */}
                    <Card className="border-2 border-blue-200 bg-blue-50/50 hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">📝</div>
                        <CardTitle className="text-lg text-blue-700">
                          Admission SOP
                        </CardTitle>
                        <CardDescription className="text-blue-600">
                          University application statements
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-blue-700 mb-4">
                          $149
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Level-specific content writing</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Country-specific requirements</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Professional writing & review</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>7-10 business days delivery</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleServiceClick("admission")}
                        >
                          Order Admission SOP
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Immigration SOP */}
                    <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">✈️</div>
                        <CardTitle className="text-lg text-green-700">
                          Immigration SOP
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Study permit & visa statements
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-green-700 mb-4">
                          $149
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Immigration officer concerns</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Financial stability demonstration</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Strong home ties & return intent</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>7-10 business days delivery</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleServiceClick("immigration")}
                        >
                          Order Immigration SOP
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Application Help */}
                    <Card className="border-2 border-purple-200 bg-purple-50/50 hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">🎯</div>
                        <CardTitle className="text-lg text-purple-700">
                          Application Help
                        </CardTitle>
                        <CardDescription className="text-purple-600">
                          Complete application assistance
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-purple-700 mb-4">
                          $299
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Complete document preparation</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Full application review</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Interview preparation sessions</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>24-48 hours urgent delivery</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleServiceClick("application")}
                        >
                          Get Application Help
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bundle Package */}
                  <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 relative max-w-3xl mx-auto">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-500 text-white px-3 py-1">
                        <Crown className="h-3 w-3 mr-1" />
                        Best Value - Most Popular
                      </Badge>
                    </div>
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl text-yellow-800">
                        Complete Study Abroad Package
                      </CardTitle>
                      <CardDescription className="text-yellow-700">
                        Everything you need from university selection to
                        application success
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-lg text-gray-500 line-through">
                          $747
                        </span>
                        <span className="text-4xl font-bold text-yellow-800">
                          $599
                        </span>
                        <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          Save $148
                        </span>
                      </div>
                      <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
                        <p className="text-sm text-yellow-800 font-medium">
                          ⚡ Priority Delivery (3-5 business days) + Both PDF &
                          Word formats included
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Free university list (included)</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Premium university research</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Professional admission SOP</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Immigration SOP included</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Complete application support</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Document preparation help</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Interview preparation sessions</span>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Priority support & consultation</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-3"
                        onClick={() =>
                          (window.location.href =
                            "/professional-sop?service=complete&tier=priority")
                        }
                      >
                        <Gift className="h-5 w-5 mr-2" />
                        Get Complete Package
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
