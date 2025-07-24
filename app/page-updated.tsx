"use client";
import { useState } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CountryLevelSelector } from "@/components/country-level-selector";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">
                  Study Abroad Assistant 🎓
                </h1>
                <p className="text-xl text-gray-600">
                  Level-Specific Guidance for Canada & UK
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
              Get personalized requirements, SOPs, and application assistance
              tailored to your specific study level and destination country
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            {/* Requirements Tab */}
            <TabsContent value="requirements">
              <CountryLevelSelector
                onSOPOrder={handleSOPOrder}
                onApplicationHelp={handleApplicationHelp}
              />
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        Study Abroad Assistant
                      </CardTitle>
                      <CardDescription>
                        Chat with our AI assistant for personalized guidance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px]">
                      <ChatInterface />
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Side Panel */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">AI Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Smart Matching</h4>
                          <p className="text-sm text-gray-600">
                            University recommendations based on your profile
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Document Guidance</h4>
                          <p className="text-sm text-gray-600">
                            Step-by-step document preparation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Real-time Support</h4>
                          <p className="text-sm text-gray-600">
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
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our Services
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Complete support for your study abroad journey to Canada and
                    UK
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <span>Level-specific content</span>
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
                          <span>2-3 day delivery</span>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                        $179
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Immigration-focused writing</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Visa officer concerns addressed</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Strong home ties emphasis</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>2-3 day delivery</span>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
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
                          <span>Document preparation</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Application review</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Interview preparation</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Submission assistance</span>
                        </div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Get Application Help
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Bundle Package */}
                <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 relative max-w-2xl mx-auto">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white px-3 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Best Value
                    </Badge>
                  </div>
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl text-yellow-800">
                      Complete Journey Package
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                      Admission SOP + Immigration SOP + Application Help
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-lg text-gray-500 line-through">
                        $627
                      </span>
                      <span className="text-4xl font-bold text-yellow-800">
                        $499
                      </span>
                      <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                        Save $128
                      </span>
                    </div>
                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Complete admission & immigration SOPs</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Full application support</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Priority support & review</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>End-to-end journey guidance</span>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-3">
                      <Gift className="h-5 w-5 mr-2" />
                      Get Complete Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
