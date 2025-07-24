"use client";

import { ProfessionalSOPForm } from "@/components/professional-sop-form";

export default function ProfessionalSOPPage() {
  const handleFormSubmit = (data: any) => {
    console.log("SOP Form submitted:", data);
    // Handle successful submission - redirect to success page or show confirmation
    alert(
      "SOP request submitted successfully! You will receive a confirmation email shortly."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Statement of Purpose
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a professionally written statement of purpose from our expert
              agents specialized in your target country and service type.
            </p>
          </div>

          <ProfessionalSOPForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
