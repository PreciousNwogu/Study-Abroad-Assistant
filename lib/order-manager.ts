// Simple order management without database
// Uses localStorage for client-side tracking and emails for server-side records

interface Order {
  orderId: string;
  customerEmail: string;
  service: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  transactionId: string;
  urgency: string;
  deliveryFormat: string;
}

export class OrderManager {
  private static ORDERS_KEY = "study_abroad_orders";

  // Client-side order tracking (for customer reference)
  static saveOrder(order: Order): void {
    if (typeof window === "undefined") return;

    const existingOrders = this.getOrders();
    existingOrders.push(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(existingOrders));
  }

  static getOrders(): Order[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(this.ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getOrderById(orderId: string): Order | null {
    const orders = this.getOrders();
    return orders.find((order) => order.orderId === orderId) || null;
  }

  static updateOrderStatus(orderId: string, status: Order["status"]): void {
    if (typeof window === "undefined") return;

    const orders = this.getOrders();
    const orderIndex = orders.findIndex((order) => order.orderId === orderId);

    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    }
  }

  // Generate unique order ID
  static generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `SAA-${timestamp}-${random}`;
  }

  // Email-based order tracking
  static async sendOrderStatusUpdate(
    orderId: string,
    status: string,
    customerEmail: string
  ) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerEmail,
          subject: `Order Update - #${orderId}`,
          html: this.generateStatusUpdateEmail(orderId, status),
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to send order status update:", error);
      return false;
    }
  }

  private static generateStatusUpdateEmail(
    orderId: string,
    status: string
  ): string {
    const statusMessages = {
      pending: {
        title: "⏳ Order Received",
        message: "Your order has been received and is pending review.",
        color: "#ffc107",
      },
      processing: {
        title: "🔄 Order Processing",
        message: "Your order is currently being processed by our team.",
        color: "#17a2b8",
      },
      completed: {
        title: "✅ Order Completed",
        message: "Your order has been completed and delivered to your email.",
        color: "#28a745",
      },
      cancelled: {
        title: "❌ Order Cancelled",
        message:
          "Your order has been cancelled. If you have any questions, please contact support.",
        color: "#dc3545",
      },
    };

    const statusInfo =
      statusMessages[status as keyof typeof statusMessages] ||
      statusMessages.pending;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: ${
            statusInfo.color
          }; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .status-badge { background: ${
            statusInfo.color
          }; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${statusInfo.title}</h1>
          <p>Order #${orderId}</p>
        </div>
        
        <div class="content">
          <p>Hello,</p>
          <p>${statusInfo.message}</p>
          
          <p>Order Status: <span class="status-badge">${status.toUpperCase()}</span></p>
          
          <p>If you have any questions, please contact us at support@studyabroadassistant.com</p>
          
          <p>Thank you for choosing Study Abroad Assistant!</p>
        </div>
      </body>
      </html>
    `;
  }
}

// Payment monitoring without database
export class PaymentMonitor {
  // Track payment in multiple ways since no database
  static async recordPayment(paymentData: any) {
    const orderId = OrderManager.generateOrderId();

    // 1. Save to localStorage (client-side)
    const order: Order = {
      orderId,
      customerEmail: paymentData.customerEmail,
      service: paymentData.service,
      amount: paymentData.amount,
      status: "pending",
      createdAt: new Date().toISOString(),
      transactionId: paymentData.transactionId,
      urgency: paymentData.urgency,
      deliveryFormat: paymentData.deliveryFormat,
    };

    OrderManager.saveOrder(order);

    // 2. Send email notifications (server-side record)
    await fetch("/api/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...paymentData,
        orderId,
      }),
    });

    // 3. Return order details
    return { orderId, success: true };
  }

  // Simple fraud detection
  static validatePayment(paymentData: any): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields
    if (!paymentData.customerEmail) errors.push("Customer email is required");
    if (!paymentData.amount || paymentData.amount <= 0)
      errors.push("Valid amount is required");
    if (!paymentData.transactionId) errors.push("Transaction ID is required");

    // Check amount ranges
    if (paymentData.amount < 10 || paymentData.amount > 1000) {
      errors.push("Amount must be between $10 and $1000");
    }

    // Check for duplicate transaction IDs (in localStorage)
    const existingOrders = OrderManager.getOrders();
    if (
      existingOrders.some(
        (order) => order.transactionId === paymentData.transactionId
      )
    ) {
      errors.push("Duplicate transaction detected");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Alternative: Email-based order status tracking
export const EMAIL_ORDER_TRACKING = {
  // Send order tracking email that customers can reply to
  async sendTrackingEmail(orderId: string, customerEmail: string) {
    const trackingEmail = `
      Subject: Track Your Order #${orderId}
      
      Hello,
      
      Your order #${orderId} is being processed.
      
      To check your order status, simply reply to this email with:
      "STATUS ${orderId}"
      
      Our team will respond with the current status within 24 hours.
      
      Order Commands:
      - STATUS ${orderId} - Get current status
      - CANCEL ${orderId} - Request cancellation
      - MODIFY ${orderId} - Request modifications
      
      Thank you!
      Study Abroad Assistant Team
    `;

    // Implementation would send this email
    return true;
  },
};
