"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Crown,
} from "lucide-react";
import { EnhancedCountrySelector } from "./enhanced-country-selector";
import { PaymentComponent } from "./payment-component";
import { hasAgentSupport, getCountryWithFlag } from "@/lib/country-utils";

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),

  // Educational Background
  currentEducation: z
    .string()
    .min(1, "Please select your current education level"),
  institution: z.string().min(2, "Please enter your institution name"),
  gpa: z.string().optional(),
  graduationYear: z.string().min(4, "Please enter graduation year"),

  // Target Destination
  targetCountry: z.string().min(1, "Please select your target country"),
  serviceType: z.enum(["admission", "visa"], {
    required_error: "Please select a service type",
  }),

  // Program Details
  intendedProgram: z.string().min(2, "Please describe your intended program"),
  targetUniversities: z.string().optional(),

  // Personal Statement Details
  careerGoals: z
    .string()
    .min(
      50,
      "Please provide more details about your career goals (minimum 50 characters)"
    ),
  whyCountry: z
    .string()
    .min(
      50,
      "Please explain why you chose this country (minimum 50 characters)"
    ),
  academicBackground: z
    .string()
    .min(
      50,
      "Please describe your academic background (minimum 50 characters)"
    ),
  workExperience: z.string().optional(),
  extracurriculars: z.string().optional(),
  challenges: z.string().optional(),

  // Additional Information
  hasWorkExperience: z.boolean().default(false),
  hasResearchExperience: z.boolean().default(false),
  hasVolunteerExperience: z.boolean().default(false),
  additionalInfo: z.string().optional(),

  // Preferences
  urgency: z.enum(["standard", "priority", "urgent"]),
  deliveryFormat: z.enum(["pdf", "word", "both"]),

  // Terms
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeToContact: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface ProfessionalSOPFormProps {
  onSubmit?: (data: FormData & { paymentDetails: any }) => void;
}

export function ProfessionalSOPForm({ onSubmit }: ProfessionalSOPFormProps) {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasWorkExperience: false,
      hasResearchExperience: false,
      hasVolunteerExperience: false,
      agreeToContact: false,
      urgency: "standard",
      deliveryFormat: "pdf",
    },
  });

  // Handle URL parameters for pre-selecting tier and service
  useEffect(() => {
    const tier = searchParams.get("tier");
    const service = searchParams.get("service");

    if (
      tier &&
      (tier === "standard" || tier === "priority" || tier === "urgent")
    ) {
      setValue("urgency", tier);
    }

    // Handle complete package service
    if (service === "complete") {
      setValue("urgency", "priority"); // Default to priority for complete package
      setValue("deliveryFormat", "both"); // Include both formats
    }
  }, [searchParams, setValue]);

  const watchedServiceType = watch("serviceType");
  const watchedCountry = watch("targetCountry");
  const agentSupported = formData?.targetCountry
    ? hasAgentSupport(formData.targetCountry)
    : false;

  const calculateTotalAmount = (urgency: string, deliveryFormat: string) => {
    const service = searchParams.get("service");

    // Handle complete package pricing
    if (service === "complete") {
      return 599; // Fixed price for complete package
    }

    let baseAmount = 0;

    // Base pricing based on urgency
    switch (urgency) {
      case "standard":
        baseAmount = 149;
        break;
      case "priority":
        baseAmount = 199;
        break;
      case "urgent":
        baseAmount = 299;
        break;
      default:
        baseAmount = 149;
    }

    // Add extra cost for both formats
    if (deliveryFormat === "both") {
      baseAmount += 10;
    }

    return baseAmount;
  };

  const currentFormData = watch();
  const totalAmount = calculateTotalAmount(
    currentFormData.urgency || "standard",
    currentFormData.deliveryFormat || "pdf"
  );

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setValue("targetCountry", country);
  };

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentDetails: any) => {
    if (!formData) return;

    setIsSubmitting(true);

    try {
      // Process the form submission with payment
      const submissionData = {
        ...formData,
        paymentDetails,
        submissionDate: new Date().toISOString(),
        agentSupported,
      };

      // Call API to create SOP request and assign agent
      const response = await fetch("/api/submit-sop-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        onSubmit?.(submissionData);

        // Show success step briefly
        setStep(4);

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const getFieldsForStep = (stepNumber: number): (keyof FormData)[] => {
    switch (stepNumber) {
      case 1:
        return ["firstName", "lastName", "email", "phone"];
      case 2:
        return [
          "currentEducation",
          "institution",
          "graduationYear",
          "targetCountry",
          "serviceType",
        ];
      case 3:
        return [
          "intendedProgram",
          "careerGoals",
          "whyCountry",
          "academicBackground",
          "agreeToTerms",
        ];
      default:
        return [];
    }
  };

  if (showPayment) {
    const finalAmount = formData
      ? calculateTotalAmount(formData.urgency, formData.deliveryFormat)
      : 149;
    return (
      <PaymentComponent
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentCancel={() => setShowPayment(false)}
        amount={finalAmount}
        urgency={formData?.urgency || "standard"}
        deliveryFormat={formData?.deliveryFormat || "pdf"}
      />
    );
  }

  // Success Step
  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">
                  Payment Successful! 🎉
                </h2>
                <p className="text-green-700 text-lg">
                  Your SOP request has been submitted successfully.
                </p>
              </div>

              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  What happens next?
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>
                      Your request has been assigned to a specialist agent
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>You'll receive an email confirmation shortly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Your SOP will be delivered within the selected timeframe
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-green-600">
                <p>Redirecting to home page in 3 seconds...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      step >= stepNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`
                      w-20 h-1 mx-2
                      ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={
                step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Personal Info
            </span>
            <span
              className={
                step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Education & Target
            </span>
            <span
              className={
                step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Statement Details
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Complete Package Indicator */}
      {searchParams.get("service") === "complete" && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <Crown className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Complete Study Abroad Package Selected</strong> - This
            includes all services at a fixed price of $599 (Free university
            list, Premium university research, Professional SOP writing,
            Immigration SOP, Complete application support, Document preparation
            help, Interview preparation, and Priority support)
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Education & Target Country */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentEducation">
                    Current Education Level *
                  </Label>
                  <select
                    id="currentEducation"
                    {...register("currentEducation")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select your current level</option>
                    <option value="high-school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="professional">Professional</option>
                  </select>
                  {errors.currentEducation && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.currentEducation.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="institution">Institution Name *</Label>
                    <Input
                      id="institution"
                      {...register("institution")}
                      placeholder="Your current/most recent institution"
                    />
                    {errors.institution && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.institution.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Input
                      id="graduationYear"
                      {...register("graduationYear")}
                      placeholder="2024"
                    />
                    {errors.graduationYear && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.graduationYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="gpa">GPA/Grades (Optional)</Label>
                  <Input
                    id="gpa"
                    {...register("gpa")}
                    placeholder="3.8/4.0 or 85%"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Target Destination & Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Target Country *</Label>
                  <div className="mt-2">
                    <EnhancedCountrySelector
                      onSelect={handleCountrySelect}
                      selectedCountry={selectedCountry}
                    />
                  </div>
                  {errors.targetCountry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.targetCountry.message}
                    </p>
                  )}
                </div>

                {selectedCountry && (
                  <div>
                    <Label>Service Type *</Label>
                    <RadioGroup
                      value={watchedServiceType}
                      onValueChange={(value) =>
                        setValue("serviceType", value as "admission" | "visa")
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admission" id="admission" />
                        <Label htmlFor="admission" className="cursor-pointer">
                          University Admission SOP
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visa" id="visa" />
                        <Label htmlFor="visa" className="cursor-pointer">
                          Student Visa SOP
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.serviceType && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.serviceType.message}
                      </p>
                    )}
                  </div>
                )}

                {agentSupported && selectedCountry && watchedServiceType && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Great! We have dedicated {watchedServiceType} specialists
                      for {getCountryWithFlag(selectedCountry)}. Your SOP will
                      be handled by an expert agent with deep knowledge of{" "}
                      {selectedCountry} requirements.
                    </AlertDescription>
                  </Alert>
                )}

                {selectedCountry && !agentSupported && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      We don't currently have dedicated agents for{" "}
                      {getCountryWithFlag(selectedCountry)}, but our general
                      team can still help you create a high-quality SOP.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Statement Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Statement of Purpose Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="intendedProgram">
                  Intended Program/Field of Study *
                </Label>
                <Input
                  id="intendedProgram"
                  {...register("intendedProgram")}
                  placeholder="e.g., Master's in Computer Science"
                />
                {errors.intendedProgram && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.intendedProgram.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetUniversities">
                  Target Universities (Optional)
                </Label>
                <Textarea
                  id="targetUniversities"
                  {...register("targetUniversities")}
                  placeholder="List your target universities or institution types"
                  rows={2}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Personal Statement Content
                </h3>

                <div>
                  <Label htmlFor="careerGoals">
                    Career Goals & Objectives *
                  </Label>
                  <Textarea
                    id="careerGoals"
                    {...register("careerGoals")}
                    placeholder="Describe your short-term and long-term career goals..."
                    rows={4}
                  />
                  {errors.careerGoals && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.careerGoals.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="whyCountry">Why This Country? *</Label>
                  <Textarea
                    id="whyCountry"
                    {...register("whyCountry")}
                    placeholder="Explain why you chose this specific country for your studies..."
                    rows={4}
                  />
                  {errors.whyCountry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.whyCountry.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="academicBackground">
                    Academic Background & Achievements *
                  </Label>
                  <Textarea
                    id="academicBackground"
                    {...register("academicBackground")}
                    placeholder="Describe your academic journey, key achievements, relevant coursework..."
                    rows={4}
                  />
                  {errors.academicBackground && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.academicBackground.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="workExperience">
                    Work Experience (Optional)
                  </Label>
                  <Textarea
                    id="workExperience"
                    {...register("workExperience")}
                    placeholder="Describe any relevant work experience..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="extracurriculars">
                    Extracurricular Activities (Optional)
                  </Label>
                  <Textarea
                    id="extracurriculars"
                    {...register("extracurriculars")}
                    placeholder="Mention clubs, societies, volunteer work, hobbies..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="challenges">
                    Challenges Overcome (Optional)
                  </Label>
                  <Textarea
                    id="challenges"
                    {...register("challenges")}
                    placeholder="Any personal or academic challenges you've overcome..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasWorkExperience"
                      checked={watch("hasWorkExperience")}
                      onCheckedChange={(checked) =>
                        setValue("hasWorkExperience", !!checked)
                      }
                    />
                    <Label htmlFor="hasWorkExperience">
                      I have relevant work experience
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasResearchExperience"
                      checked={watch("hasResearchExperience")}
                      onCheckedChange={(checked) =>
                        setValue("hasResearchExperience", !!checked)
                      }
                    />
                    <Label htmlFor="hasResearchExperience">
                      I have research experience
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasVolunteerExperience"
                      checked={watch("hasVolunteerExperience")}
                      onCheckedChange={(checked) =>
                        setValue("hasVolunteerExperience", !!checked)
                      }
                    />
                    <Label htmlFor="hasVolunteerExperience">
                      I have volunteer experience
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="urgency">Delivery Timeline</Label>
                  {searchParams.get("service") === "complete" ? (
                    <div className="mt-2 p-3 border rounded-md bg-yellow-50 border-yellow-200">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <Crown className="h-4 w-4" />
                        <span className="font-medium">
                          Complete Package - Priority Delivery Included
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your complete package includes priority delivery (3-5
                        business days) and both PDF & Word formats at no extra
                        cost.
                      </p>
                    </div>
                  ) : (
                    <RadioGroup
                      value={watch("urgency")}
                      onValueChange={(value) =>
                        setValue(
                          "urgency",
                          value as "standard" | "priority" | "urgent"
                        )
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          Standard (7-10 business days) - $149
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="priority" id="priority" />
                        <Label htmlFor="priority" className="cursor-pointer">
                          Priority (3-5 business days) - $199
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="cursor-pointer">
                          Urgent (24-48 hours) - $299
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>

                <div>
                  <Label htmlFor="deliveryFormat">Delivery Format</Label>
                  {searchParams.get("service") === "complete" ? (
                    <div className="mt-2 p-3 border rounded-md bg-yellow-50 border-yellow-200">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <Crown className="h-4 w-4" />
                        <span className="font-medium">
                          Complete Package - Both Formats Included
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your complete package includes both PDF and Word
                        document formats at no extra cost.
                      </p>
                    </div>
                  ) : (
                    <RadioGroup
                      value={watch("deliveryFormat")}
                      onValueChange={(value) =>
                        setValue(
                          "deliveryFormat",
                          value as "pdf" | "word" | "both"
                        )
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="pdf" />
                        <Label htmlFor="pdf" className="cursor-pointer">
                          PDF only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="word" id="word" />
                        <Label htmlFor="word" className="cursor-pointer">
                          Word document only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="cursor-pointer">
                          Both PDF and Word (+$10)
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={watch("agreeToTerms")}
                    onCheckedChange={(checked) =>
                      setValue("agreeToTerms", !!checked)
                    }
                  />
                  <Label htmlFor="agreeToTerms" className="cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 underline">
                      terms and conditions
                    </a>{" "}
                    *
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">
                    {errors.agreeToTerms.message}
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToContact"
                    checked={watch("agreeToContact")}
                    onCheckedChange={(checked) =>
                      setValue("agreeToContact", !!checked)
                    }
                  />
                  <Label htmlFor="agreeToContact" className="cursor-pointer">
                    I agree to receive updates about my application via email
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing Summary - Show on Step 3 */}
        {step === 3 && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {searchParams.get("service") === "complete" ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Complete Study Abroad Package</span>
                    <span className="font-medium">$599</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Timeline</span>
                    <span>Priority (3-5 business days)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Format</span>
                    <span>PDF & Word (included)</span>
                  </div>
                  <div className="text-xs text-green-700 mt-2 p-2 bg-green-100 rounded">
                    <strong>Package Includes:</strong> Free university list,
                    Premium university research, Professional SOP writing,
                    Immigration SOP, Complete application support, Document
                    preparation help, Interview preparation, Priority support &
                    consultation
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold text-green-800">
                    <span>Total Amount</span>
                    <span>$599</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      SOP Writing Service ({watch("urgency") || "standard"})
                    </span>
                    <span className="font-medium">
                      $
                      {watch("urgency") === "standard"
                        ? 149
                        : watch("urgency") === "priority"
                        ? 199
                        : 299}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Timeline</span>
                    <span>
                      {watch("urgency") === "standard"
                        ? "7-10 business days"
                        : watch("urgency") === "priority"
                        ? "3-5 business days"
                        : "24-48 hours"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Format</span>
                    <span>
                      {watch("deliveryFormat") === "pdf"
                        ? "PDF only"
                        : watch("deliveryFormat") === "word"
                        ? "Word only"
                        : "PDF & Word"}
                    </span>
                  </div>
                  {watch("deliveryFormat") === "both" && (
                    <div className="flex justify-between text-sm">
                      <span>Additional Word Format</span>
                      <span className="font-medium">+$10</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold text-green-800">
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}

          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto flex items-center gap-2"
              disabled={isSubmitting}
            >
              <CreditCard className="h-4 w-4" />
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
