"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Mail,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Copy,
} from "lucide-react";

export default function OrderTrackingPage() {
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");

  // In a real app, this would come from your email/database system
  const mockOrders = [
    {
      orderId: "SAA-1704123456-ABC123",
      customerEmail: "student@example.com",
      service: "Professional SOP Writing",
      amount: 149,
      status: "processing",
      createdAt: "2024-01-15T10:30:00Z",
      urgency: "standard",
      deliveryFormat: "both",
    },
    {
      orderId: "SAA-1704123457-DEF456",
      customerEmail: "another@example.com",
      service: "Immigration SOP",
      amount: 149,
      status: "completed",
      createdAt: "2024-01-14T15:45:00Z",
      urgency: "urgent",
      deliveryFormat: "pdf",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sendStatusUpdate = async (
    orderId: string,
    customerEmail: string,
    status: string
  ) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerEmail,
          subject: `Order Update - #${orderId}`,
          html: `
            <h2>Order Status Update</h2>
            <p>Your order #${orderId} status has been updated to: <strong>${status}</strong></p>
            <p>Thank you for choosing Study Abroad Assistant!</p>
          `,
        }),
      });

      if (response.ok) {
        alert("Status update sent successfully!");
      } else {
        alert("Failed to send status update");
      }
    } catch (error) {
      console.error("Error sending status update:", error);
      alert("Error sending status update");
    }
  };

  const copyOrderDetails = (order: any) => {
    const details = `
Order ID: ${order.orderId}
Customer: ${order.customerEmail}
Service: ${order.service}
Amount: $${order.amount}
Status: ${order.status}
Urgency: ${order.urgency}
Format: ${order.deliveryFormat}
Created: ${new Date(order.createdAt).toLocaleString()}
    `.trim();

    navigator.clipboard.writeText(details);
    alert("Order details copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Tracking Dashboard
          </h1>
          <p className="text-gray-600">
            Email-based order management system (No database required)
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Search by Order ID
                </label>
                <Input
                  placeholder="SAA-1704123456-ABC123"
                  value={orderIdSearch}
                  onChange={(e) => setOrderIdSearch(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Search by Email
                </label>
                <Input
                  placeholder="customer@example.com"
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Tracking Instructions */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Mail className="w-5 h-5" />
              Email-Based Order Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-700">
              <p className="mb-3">
                Since this app uses email-based order tracking:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All order details are sent via email notifications</li>
                <li>Customer confirmations are automatically sent</li>
                <li>Agent assignments are emailed to relevant teams</li>
                <li>Status updates can be sent manually using buttons below</li>
                <li>
                  Check your email (studyabroadassistant@gmail.com) for all
                  order notifications
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card
              key={order.orderId}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.orderId}
                    </h3>
                    <p className="text-gray-600">{order.customerEmail}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">${order.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{order.urgency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>{order.deliveryFormat}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Service:</strong> {order.service}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Created:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      sendStatusUpdate(
                        order.orderId,
                        order.customerEmail,
                        "processing"
                      )
                    }
                    className="flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Mark Processing
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      sendStatusUpdate(
                        order.orderId,
                        order.customerEmail,
                        "completed"
                      )
                    }
                    className="flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Mark Completed
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyOrderDetails(order)}
                    className="flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual Order Creation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Manual Order Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              For orders received outside the app (phone, direct contact), you
              can manually send order confirmations:
            </p>
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                const orderId = prompt("Enter Order ID:");
                const customerEmail = prompt("Enter Customer Email:");
                if (orderId && customerEmail) {
                  sendStatusUpdate(orderId, customerEmail, "pending");
                }
              }}
            >
              <Mail className="w-4 h-4" />
              Send Manual Order Confirmation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
