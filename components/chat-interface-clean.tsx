"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { CountrySelector } from "@/components/country-selector";
import { LevelSelector } from "@/components/level-selector";
import { BudgetSelector } from "@/components/budget-selector";
import { EmailCapture } from "@/components/email-capture";
import { SOPAssistant } from "@/components/sop-assistant";
import { PremiumSOPWizard } from "@/components/premium-sop-wizard";
import { PaymentComponent } from "@/components/payment-component";
import { UniversitySelector } from "@/components/university-selector";
import { CourseSelector } from "@/components/course-selector";
import { ProgressIndicator } from "@/components/progress-indicator";
import { getCountryWithFlag } from "@/lib/country-utils";

export type ChatStep =
  | "greeting"
  | "country"
  | "university"
  | "course"
  | "level"
  | "budget"
  | "recommendations"
  | "email_capture"
  | "email_for_feedback"
  | "sop_offer"
  | "sop_payment"
  | "premium_sop_wizard"
  | "sop_feedback_offer"
  | "completed";

export interface UserData {
  country: string;
  university?: string;
  course?: string;
  level: string;
  budget: string;
  email?: string;
  recommendations?: string;
  sopDetails?: {
    careerGoal: string;
    experience: string;
    academicBackground: string;
  };
  generatedSOP?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  component?: React.ReactNode;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>("greeting");
  const [userData, setUserData] = useState<UserData>({
    country: "",
    level: "",
    budget: "",
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLevelDuration = (level: string): string => {
    const durations: Record<string, string> = {
      Undergraduate: "3-4 years",
      Masters: "1-2 years",
      PhD: "3-5 years",
      "Diploma/Certificate": "6 months - 2 years",
    };
    return durations[level] || "Varies";
  };

  const getLevelRequirements = (level: string): string => {
    const requirements: Record<string, string> = {
      Undergraduate: "High school diploma, language test, essays",
      Masters: "Bachelor's degree, GRE/GMAT, work experience",
      PhD: "Master's degree, research proposal, academic references",
      "Diploma/Certificate": "High school/Bachelor's, professional experience",
    };
    return requirements[level] || "Standard academic requirements";
  };

  const getLevelCost = (level: string): string => {
    const costs: Record<string, string> = {
      Undergraduate: "$15,000-$40,000/year",
      Masters: "$20,000-$50,000/year",
      PhD: "$25,000-$60,000/year",
      "Diploma/Certificate": "$10,000-$25,000/year",
    };
    return costs[level] || "Varies by program";
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting - only add once
    if (!initializedRef.current) {
      initializedRef.current = true;
      addMessage(
        "assistant",
        "👋 Hi there! Welcome to *Study Abroad Assistant* — your AI-powered study abroad consultant for **Canada & UK** 🎓\n\n🆓 **Free Service**: I'll help you find universities in Canada or UK that match your course and budget preferences, then send you a basic university list via email.\n\n💎 **Premium Services**: For detailed admission requirements, scholarship opportunities, and professional SOP writing specifically for Canada & UK applications, check out our paid packages!\n\nLet's start with the basics - would you like to study in Canada or UK?",
        "greeting",
        <CountrySelector onSelect={handleCountrySelect} />
      );
    }
  }, []);

  const addMessage = (
    role: "user" | "assistant",
    content: string,
    step?: ChatStep,
    component?: React.ReactNode
  ) => {
    const message: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      component,
    };
    setMessages((prev) => [...prev, message]);
    if (step) setCurrentStep(step);
  };

  const handleCountrySelect = (country: string) => {
    setUserData((prev) => ({ ...prev, country }));
    addMessage("user", `I want to study in ${getCountryWithFlag(country)}`);
    addMessage(
      "assistant",
      `Excellent choice! ${getCountryWithFlag(
        country
      )} has many world-class universities. \n\n🏛️ **Popular ${country} Universities:**\n\nWhich university interests you most, or would you like to see universities across all ${country} institutions?`,
      "university",
      <UniversitySelector country={country} onSelect={handleUniversitySelect} />
    );
  };

  const handleUniversitySelect = (university: any) => {
    setUserData((prev) => ({ ...prev, university: university.name }));
    addMessage("user", `I'm interested in ${university.name}`);

    // If user selects "Other universities", skip to course selection directly
    if (university.id === "other") {
      addMessage(
        "assistant",
        `Perfect! I'll help you find the best ${university.country} universities for your field of study. What subject are you interested in?`,
        "course",
        <CourseSelector onSelect={handleCourseSelect} />
      );
    } else {
      addMessage(
        "assistant",
        `Great choice! ${university.name} is an excellent institution. What field of study are you interested in?`,
        "course",
        <CourseSelector onSelect={handleCourseSelect} />
      );
    }
  };

  const handleCourseSelect = (course: any) => {
    setUserData((prev) => ({ ...prev, course: course.name }));
    addMessage("user", `I want to study ${course.name}`);
    addMessage(
      "assistant",
      `Excellent! ${course.name} is a popular field with great career prospects. What level of study are you planning?`,
      "level",
      <LevelSelector onSelect={handleLevelSelect} />
    );
  };

  const handleLevelSelect = (level: string) => {
    setUserData((prev) => ({ ...prev, level }));
    addMessage("user", `I'm applying for ${level}`);
    addMessage(
      "assistant",
      `Perfect! ${level} is a great choice. Now let's talk budget - this helps me find universities within your price range.`,
      "budget",
      <BudgetSelector onSelect={handleBudgetSelect} />
    );
  };

  const handleBudgetSelect = async (budget: string) => {
    setUserData((prev) => ({ ...prev, budget }));
    addMessage("user", `My budget is ${budget}`);

    setIsLoading(true);
    addMessage(
      "assistant",
      `Perfect! Let me find universities in ${getCountryWithFlag(
        userData.country
      )} that match your criteria... 🔍`
    );

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: userData.country,
          university: userData.university,
          course: userData.course,
          level: userData.level,
          budget: budget,
          focusCountry: userData.country, // Ensure country-specific results
        }),
      });

      const data = await response.json();

      // Store the recommendations for later use in email
      setUserData((prev) => ({
        ...prev,
        recommendations: data.recommendations,
      }));

      addMessage("assistant", data.recommendations, "recommendations");

      setTimeout(() => {
        addMessage(
          "assistant",
          `🎯 **Your ${
            userData.country
          } University List is Ready!**\n\nBased on your preferences:\n• **Country**: ${getCountryWithFlag(
            userData.country
          )}\n• **Course**: ${userData.course}\n• **Level**: ${
            userData.level
          }\n• **Budget**: ${budget}\n\n📧 **Get your ${
            userData.country
          } university list:**\nI'll send you a curated list of ${
            userData.country
          } universities that match your criteria:\n• University names and locations within ${
            userData.country
          }\n• Programs available in ${
            userData.course
          }\n• Tuition fees within your ${budget} budget\n• Contact details for direct inquiry\n\nEnter your email to receive your personalized ${
            userData.country
          } university list:`,
          "email_capture",
          <EmailCapture onSubmit={handleEmailSubmit} />
        );
      }, 1000);
    } catch (error) {
      addMessage(
        "assistant",
        "Sorry, I encountered an error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setUserData((prev) => ({ ...prev, email }));
    addMessage("user", `My email is ${email}`);

    setIsLoading(true);
    addMessage("assistant", "Sending your free university list... 📧");

    try {
      console.log("🔍 Sending email request with:", {
        email,
        userData: { ...userData, email },
        recommendations: userData.recommendations,
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          userData: {
            ...userData,
            email,
            country: userData.country,
            university: userData.university,
            course: userData.course,
            level: userData.level,
            budget: userData.budget,
          },
          recommendations: userData.recommendations,
        }),
      });

      const data = await response.json();
      console.log("📧 Email API response:", data);

      if (data.success) {
        addMessage(
          "assistant",
          `✅ **${userData.country} University List Sent Successfully!**\n\n📧 **Sent to**: ${email}\n\n📋 **Your ${userData.country} university package includes:**\n• ${userData.country} university names and locations\n• Programs available in ${userData.course}\n• Tuition fees within your budget range\n• University contact details for direct inquiry\n• Application requirements overview\n\n📥 **Check your inbox** (and spam folder)!\n\n🚀 **Ready to take the next step?**\n\nOur **Premium Service** offers much more:\n\n💎 **Professional SOP Writing ($149)**\n• Tailored for ${userData.country} universities\n• Expert knowledge of ${userData.country} admission requirements\n• University-specific strategy\n• 3-day delivery with revisions\n\nInterested in upgrading to our premium SOP service for your ${userData.country} applications?`,
          "sop_offer",
          <ProfessionalSOPOffer />
        );
      } else {
        addMessage(
          "assistant",
          `❌ There was an issue sending your university list: ${
            data.message || "Unknown error"
          }\n\nPlease try again or contact us directly at contact@studyabroadassistant.com`
        );
      }
    } catch (error) {
      console.error("❌ Email request failed:", error);
      addMessage(
        "assistant",
        "Sorry, I encountered an error sending your university list. Please try again or contact us directly at contact@studyabroadassistant.com"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOPOffer = (serviceType: "professional" | "decline") => {
    if (serviceType === "professional") {
      addMessage("user", "I want the professional SOP service");
      addMessage(
        "assistant",
        "Excellent choice! 🌟 Our professional service includes:\n\n✅ **Human-reviewed writing** by education experts\n✅ **Deep program research** and customization\n✅ **Authentic storytelling** that showcases your unique value\n✅ **3-day delivery** with revision support\n✅ **University-specific insights** and strategy\n\nTo proceed, please complete the secure payment of **$149 USD**:",
        "sop_payment",
        <PaymentComponent
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentCancel={() => setCurrentStep("sop_offer")}
        />
      );
    } else {
      addMessage("user", "No, maybe later");
      addMessage(
        "assistant",
        "No problem! You've received your free university list via email. 📧\n\n🆓 **Free Service Complete:**\n• University recommendations based on your preferences\n• Basic program information\n• Contact details for each university\n\n💡 **Next Steps:**\n1. Review the universities in your email\n2. Visit their websites for detailed information\n3. Contact them directly for admission requirements\n4. Start preparing your applications\n\n🎯 **Need Help Later?**\nIf you need professional assistance with SOPs, application guidance, or detailed research, we're here to help!\n\n📧 **Contact us anytime:**\n• Email: studyabroadasistant@gmail.com\n• WhatsApp: +1 (555) 123-4567\n• Website: www.studysmartai.com\n\nGood luck with your study abroad journey! 🎓✨",
        "completed"
      );
    }
  };

  const handlePaymentSuccess = (paymentDetails: any) => {
    addMessage("user", "Payment completed successfully");
    addMessage(
      "assistant",
      "🎉 **Payment Confirmed!** Thank you for choosing our professional SOP service.\n\nNow let's gather the detailed information needed to craft your exceptional Statement of Purpose:",
      "premium_sop_wizard",
      <PremiumSOPWizard
        onSubmit={handlePremiumSOPSubmit}
        onBack={() => setCurrentStep("sop_payment")}
      />
    );
  };

  const handlePremiumSOPSubmit = async (sopData: any) => {
    addMessage("user", "Submitted comprehensive SOP information");

    setIsLoading(true);
    addMessage(
      "assistant",
      "Our expert writing team is now crafting your professional Statement of Purpose... ✨\n\n⏱️ **Expected completion:** 2-3 business days\n📧 **You'll receive:** Professional SOP + Strategic consultation"
    );

    try {
      const response = await fetch("/api/generate-premium-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sopData),
      });

      const data = await response.json();

      if (data.success) {
        // Store the premium SOP for future reference
        setUserData((prev) => ({
          ...prev,
          generatedSOP: data.sop,
          premiumSOPData: data,
        }));

        addMessage(
          "assistant",
          `🎉 **Your Professional SOP is Complete!**\n\nOur expert team has crafted your Statement of Purpose with deep research and strategic positioning:\n\n${data.sop}\n\n📊 **Document Details**: ${data.wordCount} words (optimized for university requirements)`,
          "completed"
        );

        // Send the premium SOP via email with PDF
        if (userData.email) {
          addMessage(
            "assistant",
            "Sending your complete SOP package to your email... 📧"
          );

          try {
            const emailResponse = await fetch("/api/send-premium-sop", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userData.email,
                sopData: data,
                userData: userData,
              }),
            });

            const emailData = await emailResponse.json();

            if (emailData.success) {
              addMessage(
                "assistant",
                `✅ **Professional SOP Package Delivered!**\n\n📦 **Sent to:** ${userData.email}\n\n📎 **Your package includes:**\n• Professional SOP document (PDF)\n• Strategic consultation report\n• University-specific insights\n• Revision guidelines\n\n📧 Check your inbox and spam folder.\n\n**Questions? Contact our team:**\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n🌐 www.studysmartai.com`
              );
            } else {
              addMessage(
                "assistant",
                `📧 Your SOP has been completed successfully! However, there was an issue with email delivery.\n\n**Please contact us directly to receive your package:**\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n\nWe'll send your complete SOP package immediately.`
              );
            }
          } catch (emailError) {
            addMessage(
              "assistant",
              `📧 Your professional SOP is ready! Please contact us to receive your complete package:\n\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n🌐 www.studysmartai.com\n\nWe'll deliver your SOP package within 24 hours.`
            );
          }
        }

        addMessage(
          "assistant",
          "🌟 **Thank you for choosing our Professional SOP Service!**\n\nYour Statement of Purpose has been expertly crafted by our education consultants with:\n\n• **Human expertise** from senior admissions specialists\n• **Deep research** into your target program and university\n• **Strategic positioning** to maximize your admission chances\n• **Authentic storytelling** that showcases your unique journey\n• **Professional consultation** for ongoing application support\n\n**Next steps:**\n1. Review your SOP and consultation report\n2. Apply any suggested personalizations\n3. Submit with confidence to your target university\n4. Contact us for interview preparation support\n\n**Our team is here to support your success:**\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n🌐 www.studysmartai.com\n\nGood luck with your application! 🎓",
          "completed"
        );
      } else {
        addMessage(
          "assistant",
          "We encountered an issue processing your SOP request. Please contact our team directly:\n\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n\nWe'll resolve this immediately and ensure you receive your professional SOP."
        );
      }
    } catch (error) {
      addMessage(
        "assistant",
        "We encountered a technical issue. Please contact our team directly:\n\n📧 studyabroadasistant@gmail.com\n💬 WhatsApp: +1 (555) 123-4567\n\nWe'll process your SOP request immediately."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOPSubmit = async (sopDetails: UserData["sopDetails"]) => {
    setUserData((prev) => ({ ...prev, sopDetails }));
    addMessage("user", "Submitted SOP details");

    setIsLoading(true);
    addMessage("assistant", "Creating your personalized SOP... ✍️");

    try {
      const response = await fetch("/api/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: { ...userData, sopDetails } }),
      });

      const data = await response.json();
      addMessage("assistant", data.sop, "completed");

      // Store the SOP content for feedback
      setUserData((prev) => ({ ...prev, generatedSOP: data.sop }));

      addMessage(
        "assistant",
        `🎉 Your personalized SOP is ready! This is a draft version.\n\n📧 **Want Professional Feedback?**\nGet expert review of your SOP with detailed suggestions for improvement.`,
        "sop_feedback_offer",
        <SOPFeedbackButtons />
      );
    } catch (error) {
      addMessage(
        "assistant",
        "Sorry, I encountered an error generating your SOP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOPFeedback = async (requestFeedback: boolean) => {
    if (requestFeedback) {
      addMessage("user", "Yes, I want professional feedback");

      // Check if we have the required data
      if (!userData.generatedSOP) {
        addMessage(
          "assistant",
          "Sorry, I couldn't find your generated SOP. Please generate a new SOP first."
        );
        return;
      }

      // If no email is provided, ask for email
      if (!userData.email) {
        addMessage(
          "assistant",
          "Please provide your email address to receive the feedback:",
          "email_for_feedback",
          <EmailCapture onSubmit={(email) => handleEmailForFeedback(email)} />
        );
        return;
      }

      // Proceed with feedback generation
      await generateSOPFeedback();
    } else {
      addMessage("user", "No, I'll handle it myself");
      addMessage(
        "assistant",
        `No problem! Here are our contact details if you change your mind:\n\n📧 **Contact Information:**\n• Email: studyabroadasistant@gmail.com\n• WhatsApp: +1 (555) 123-4567\n• Website: www.studysmartai.com\n\n📋 **Quick SOP Tips:**\n• Keep it 500-650 words\n• Be specific about your goals\n• Research the university thoroughly\n• Show your unique value\n\nGood luck with your application! 🎓`,
        "completed"
      );
    }
  };

  const handleEmailForFeedback = async (email: string) => {
    setUserData((prev) => ({ ...prev, email }));
    addMessage("user", `My email is ${email}`);
    await generateSOPFeedback(email);
  };

  const generateSOPFeedback = async (email?: string) => {
    const emailToUse = email || userData.email;

    addMessage(
      "assistant",
      "Generating professional feedback for your SOP... 📝"
    );

    setIsLoading(true);

    try {
      const response = await fetch("/api/sop-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToUse,
          sopContent: userData.generatedSOP,
          userData: { ...userData, email: emailToUse },
          feedbackType: "comprehensive",
        }),
      });

      const data = await response.json();

      if (data.success) {
        addMessage(
          "assistant",
          `✅ Professional SOP feedback sent to ${emailToUse}!\n\n📊 **Quick Overview:**\n• Comprehensive analysis completed\n• Grammar and structure reviewed\n• Specific improvement suggestions provided\n• Professional scoring included\n\nCheck your email for the detailed feedback report! 📧`,
          "completed"
        );
      } else {
        addMessage(
          "assistant",
          `❌ There was an issue sending the feedback: ${
            data.message || "Unknown error"
          }\n\nPlease try again or contact us directly at studyabroadasistant@gmail.com`
        );
      }
    } catch (error) {
      console.error("SOP Feedback Error:", error);
      addMessage(
        "assistant",
        "Sorry, I encountered an error sending the feedback. Please try again or contact us directly at studyabroadasistant@gmail.com"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const ProfessionalSOPOffer = () => (
    <div className="space-y-3 mt-3">
      <div className="grid gap-3">
        <Button
          onClick={() => handleSOPOffer("professional")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-6 h-auto"
        >
          <div className="text-left w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">✨</span>
              <span className="font-bold text-lg">
                Professional SOP Writing - $149
              </span>
            </div>
            <div className="text-sm opacity-90 space-y-1">
              <div>• Human-reviewed by education experts</div>
              <div>• Deep program research & customization</div>
              <div>• 3-day delivery with revision support</div>
              <div>• University-specific strategy included</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => handleSOPOffer("decline")}
          variant="ghost"
          size="sm"
          className="text-gray-500"
        >
          Maybe later - I'll stick with the free service for now
        </Button>
      </div>
    </div>
  );

  const SOPServiceOptions = () => (
    <div className="space-y-3 mt-3">
      <div className="grid gap-3">
        <Button
          onClick={() => handleSOPOffer("professional")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 h-auto"
        >
          <div className="text-left w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">✨</span>
              <span className="font-bold">Premium SOP Service</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">
                RECOMMENDED
              </span>
            </div>
            <div className="text-sm opacity-90">
              Comprehensive questionnaire • Deep research • Professional writing
              • Expert feedback
            </div>
          </div>
        </Button>

        <Button
          onClick={() => handleSOPOffer("decline")}
          variant="ghost"
          size="sm"
          className="text-gray-500"
        >
          Maybe later
        </Button>
      </div>
    </div>
  );

  const SOPOfferButtons = () => (
    <div className="flex gap-2 mt-2">
      <Button
        onClick={() => handleSOPOffer("professional")}
        className="bg-green-600 hover:bg-green-700"
      >
        Yes, write for me
      </Button>
      <Button onClick={() => handleSOPOffer("decline")} variant="outline">
        No, maybe later
      </Button>
    </div>
  );

  const SOPFeedbackButtons = () => (
    <div className="flex gap-2 mt-2">
      <Button
        onClick={() => handleSOPFeedback(true)}
        className="bg-purple-600 hover:bg-purple-700"
      >
        Yes, get feedback
      </Button>
      <Button onClick={() => handleSOPFeedback(false)} variant="outline">
        No thanks
      </Button>
    </div>
  );

  return (
    <Card className="h-[550px] flex flex-col">
      {" "}
      {/* Reduced height to prevent footer overlap */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ProgressIndicator currentStep={currentStep} />
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.component && (
                  <div className="mt-3">{message.component}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div
                    key="dot-1"
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  ></div>
                  <div
                    key="dot-2"
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    key="dot-3"
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  );
}
