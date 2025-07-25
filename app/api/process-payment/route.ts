import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

interface PaymentData {
  amount: number;
  currency: string;
  service: string;
  urgency: string;
  deliveryFormat: string;
  customerEmail: string;
  customerName: string;
  paymentMethod: string;
  transactionId: string;
}

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentData = await request.json();

    console.log("💰 Processing payment notification:", paymentData);

    // Generate order ID
    const orderId = `SAA-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;

    // Send confirmation email to customer
    const customerEmailResult = await sendEmail({
      to: paymentData.customerEmail,
      subject: `Payment Confirmed - Order #${orderId}`,
      html: generateCustomerConfirmationEmail(paymentData, orderId),
    });

    // Send notification email to admin/agents
    const adminEmailResult = await sendEmail({
      to: process.env.SENDGRID_FROM_EMAIL || "studyabroadassistant@gmail.com",
      subject: `🔔 New Order Received - #${orderId}`,
      html: generateAdminNotificationEmail(paymentData, orderId),
    });

    // Send to agent assignment system (if applicable)
    if (paymentData.service !== "university-list") {
      const agentEmailResult = await sendEmail({
        to: "agents@studyabroadassistant.com", // Replace with agent email
        subject: `📝 New SOP Assignment - Order #${orderId}`,
        html: generateAgentAssignmentEmail(paymentData, orderId),
      });
    }

    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Payment processed and notifications sent",
      emailResults: {
        customer: customerEmailResult.success,
        admin: adminEmailResult.success,
      },
    });
  } catch (error) {
    console.error("❌ Payment processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment processing failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

function generateCustomerConfirmationEmail(
  payment: PaymentData,
  orderId: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; }
        .highlight { color: #667eea; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Payment Confirmed!</h1>
        <p>Thank you for choosing Study Abroad Assistant</p>
      </div>
      
      <div class="content">
        <h2>Order Confirmation - #${orderId}</h2>
        
        <div class="order-details">
          <h3>📋 Order Details</h3>
          <p><strong>Service:</strong> ${payment.service}</p>
          <p><strong>Amount:</strong> $${payment.amount} ${payment.currency}</p>
          <p><strong>Delivery:</strong> ${payment.urgency}</p>
          <p><strong>Format:</strong> ${payment.deliveryFormat}</p>
          <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
          <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
        </div>

        <h3>⏰ What Happens Next?</h3>
        <ul>
          <li>✅ Your payment has been confirmed</li>
          <li>📧 You'll receive updates via email</li>
          <li>👨‍💼 Our team will review your requirements</li>
          <li>🚀 Work will begin on your order within 24 hours</li>
        </ul>

        <p>If you have any questions, reply to this email or contact us at <span class="highlight">support@studyabroadassistant.com</span></p>
      </div>
      
      <div class="footer">
        <p>Study Abroad Assistant | Making your educational dreams come true</p>
        <p>This is an automated email. Please do not reply directly to this message.</p>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationEmail(
  payment: PaymentData,
  orderId: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .payment-details { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .action-required { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>💰 New Payment Received</h1>
        <p>Order #${orderId}</p>
      </div>
      
      <div class="content">
        <div class="payment-details">
          <h3>💳 Payment Details</h3>
          <p><strong>Customer:</strong> ${payment.customerName} (${
    payment.customerEmail
  })</p>
          <p><strong>Service:</strong> ${payment.service}</p>
          <p><strong>Amount:</strong> $${payment.amount} ${payment.currency}</p>
          <p><strong>Urgency:</strong> ${payment.urgency}</p>
          <p><strong>Format:</strong> ${payment.deliveryFormat}</p>
          <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
          <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>

        <div class="action-required">
          <h3>🔔 Actions Required</h3>
          <ul>
            <li>✅ Verify payment in your payment processor dashboard</li>
            <li>📝 Assign order to appropriate agent/team</li>
            <li>📧 Send customer requirements gathering email</li>
            <li>📊 Update order tracking system</li>
          </ul>
        </div>

        <p><strong>Order Processing Deadline:</strong> ${new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toLocaleDateString()}</p>
      </div>
    </body>
    </html>
  `;
}

function generateAgentAssignmentEmail(
  payment: PaymentData,
  orderId: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #6f42c1; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .assignment-details { background: #f3e5ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📝 New SOP Assignment</h1>
        <p>Order #${orderId}</p>
      </div>
      
      <div class="content">
        <div class="assignment-details">
          <h3>📋 Assignment Details</h3>
          <p><strong>Service:</strong> ${payment.service}</p>
          <p><strong>Priority:</strong> ${payment.urgency}</p>
          <p><strong>Delivery Format:</strong> ${payment.deliveryFormat}</p>
          <p><strong>Customer:</strong> ${payment.customerEmail}</p>
          <p><strong>Commission:</strong> $${(payment.amount * 0.7).toFixed(
            2
          )} (70%)</p>
        </div>

        <h3>📋 Next Steps</h3>
        <ul>
          <li>📧 Contact customer for requirements gathering</li>
          <li>📝 Begin SOP writing process</li>
          <li>🔄 Submit drafts for review</li>
          <li>✅ Deliver final document to customer</li>
        </ul>

        <p><strong>Deadline:</strong> ${
          payment.urgency === "urgent"
            ? "24-48 hours"
            : payment.urgency === "priority"
            ? "3-5 business days"
            : "7-10 business days"
        }</p>
      </div>
    </body>
    </html>
  `;
}
