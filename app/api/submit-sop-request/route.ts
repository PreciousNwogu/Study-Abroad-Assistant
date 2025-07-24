import { NextRequest, NextResponse } from "next/server";
import {
  createSOPRequest,
  addSOPRequest,
  updateSOPRequestStatus,
  getAgentById,
} from "@/lib/agent-assignment";
import { sendAgentAssignment } from "@/lib/email-service";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Extract form data
    const {
      firstName,
      lastName,
      email,
      phone,
      targetCountry,
      serviceType,
      intendedProgram,
      careerGoals,
      whyCountry,
      academicBackground,
      workExperience,
      extracurriculars,
      challenges,
      urgency,
      deliveryFormat,
      paymentDetails,
      agentSupported,
    } = data;

    // Determine pricing based on urgency
    const pricing = {
      standard: 149,
      priority: 199,
      urgent: 299,
    };

    const baseAmount = pricing[urgency as keyof typeof pricing] || 149;
    const formatFee = deliveryFormat === "both" ? 10 : 0;
    const totalAmount = baseAmount + formatFee;

    // Create SOP request and assign agent
    const sopRequest = createSOPRequest(
      {
        email,
        name: `${firstName} ${lastName}`,
        country: targetCountry,
        serviceType,
      },
      totalAmount
    );

    if (!sopRequest) {
      return NextResponse.json(
        {
          error: "No agent available for the selected country and service type",
        },
        { status: 400 }
      );
    }

    // Add additional request details
    const enhancedRequest = {
      ...sopRequest,
      clientDetails: {
        firstName,
        lastName,
        phone,
        intendedProgram,
        careerGoals,
        whyCountry,
        academicBackground,
        workExperience,
        extracurriculars,
        challenges,
        urgency,
        deliveryFormat,
        hasWorkExperience: data.hasWorkExperience,
        hasResearchExperience: data.hasResearchExperience,
        hasVolunteerExperience: data.hasVolunteerExperience,
        additionalInfo: data.additionalInfo,
      },
      paymentDetails: {
        transactionId: paymentDetails.transactionId,
        amount: totalAmount,
        paymentMethod: paymentDetails.paymentMethod,
        paymentDate: new Date().toISOString(),
      },
    };

    // Store the SOP request
    addSOPRequest(enhancedRequest);

    // Update status to assigned
    updateSOPRequestStatus(sopRequest.id, "assigned");

    // Get assigned agent details
    const assignedAgent = getAgentById(sopRequest.agentId);

    if (assignedAgent) {
      // Generate AI SOP draft
      let sopContent = "";
      try {
        const sopPrompt =
          serviceType === "visa"
            ? `Create a compelling Immigration Statement of Purpose (SOP) for a visa application with the following information:

Application Details:
- Country: ${targetCountry}
- Service Type: Student Visa Application
- Urgency: ${urgency}

Student Information:
- Name: ${firstName} ${lastName}
- Intended Program: ${intendedProgram}
- Career Goals: ${careerGoals}
- Why this Country: ${whyCountry}
- Academic Background: ${academicBackground}
- Work Experience: ${workExperience || "Limited professional experience"}
- Extracurricular Activities: ${extracurriculars || "Various activities"}
- Challenges/Unique Circumstances: ${challenges || "None specified"}

Please write a well-structured Immigration SOP (500-700 words) that addresses:
1. Intent to study and return to home country
2. Financial stability and capability
3. Strong ties to home country
4. Academic qualifications and program fit
5. Career progression after studies
6. Compliance with immigration requirements

Focus on immigration officer concerns and make it authentic and persuasive.`
            : `Create a compelling Admission Statement of Purpose (SOP) with the following information:

Application Details:
- Country: ${targetCountry}
- Intended Program: ${intendedProgram}
- Career Goals: ${careerGoals}

Student Background:
- Name: ${firstName} ${lastName}
- Why this Country: ${whyCountry}
- Academic Background: ${academicBackground}
- Work Experience: ${workExperience || "Limited professional experience"}
- Extracurricular Activities: ${extracurriculars || "Various activities"}
- Challenges/Unique Circumstances: ${challenges || "None specified"}

Please write a well-structured Admission SOP (500-700 words) that includes:
1. Strong opening paragraph
2. Academic background and achievements
3. Professional/relevant experience
4. Why this specific program and country
5. Career goals and how the program aligns
6. Compelling conclusion

Make it personal, authentic, and persuasive while maintaining professional tone.`;

        const { text } = await generateText({
          model: openai("gpt-3.5-turbo"),
          prompt: sopPrompt,
          system:
            serviceType === "visa"
              ? "You are an expert immigration SOP writer who creates compelling statements of purpose for visa applications. Write in first person, address immigration officer concerns, and emphasize strong ties to home country and intent to return."
              : "You are an expert admission SOP writer who creates compelling, personalized statements of purpose for university applications. Write in first person and make it authentic and engaging.",
        });

        sopContent = text;
      } catch (sopError) {
        console.error("Failed to generate AI SOP:", sopError);
        sopContent =
          "AI SOP generation failed. Please create SOP manually based on client information provided.";
      }

      // Send enhanced email to agent with client data and AI-generated SOP
      try {
        const clientData = {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          country: targetCountry,
          studyLevel: data.studyLevel || "Not specified",
          program: intendedProgram,
          universities: data.universities || [],
          urgency,
          deliveryFormat,
          serviceType,
          careerGoals,
          whyCountry,
          academicBackground,
          workExperience,
          extracurriculars,
          challenges,
        };

        await sendAgentAssignment(
          assignedAgent.email,
          assignedAgent.name,
          clientData,
          sopContent,
          sopRequest.id
        );
      } catch (emailError) {
        console.error("Failed to send agent assignment email:", emailError);
        // Continue processing even if email fails
      }

      // Send confirmation email to client
      try {
        await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/send-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "client_confirmation",
              to: email,
              clientName: `${firstName} ${lastName}`,
              agentName: assignedAgent.name,
              agentSpecialty: assignedAgent.specialty,
              serviceType,
              country: targetCountry,
              urgency,
              requestId: sopRequest.id,
              estimatedDelivery: getEstimatedDelivery(urgency),
            }),
          }
        );
      } catch (emailError) {
        console.error("Failed to send client confirmation email:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      requestId: sopRequest.id,
      agentAssigned: assignedAgent
        ? {
            name: assignedAgent.name,
            specialty: assignedAgent.specialty,
            email: assignedAgent.email,
          }
        : null,
      estimatedDelivery: getEstimatedDelivery(urgency),
      totalAmount,
      agentCommission: sopRequest.agentCommission,
    });
  } catch (error) {
    console.error("SOP request submission error:", error);
    return NextResponse.json(
      { error: "Failed to process SOP request" },
      { status: 500 }
    );
  }
}

function getEstimatedDelivery(urgency: string): string {
  const now = new Date();
  let deliveryDate = new Date(now);

  switch (urgency) {
    case "urgent":
      deliveryDate.setDate(now.getDate() + 2); // 48 hours
      break;
    case "priority":
      deliveryDate.setDate(now.getDate() + 4); // 4 days
      break;
    default:
      deliveryDate.setDate(now.getDate() + 8); // 8 days
  }

  return deliveryDate.toLocaleDateString();
}
