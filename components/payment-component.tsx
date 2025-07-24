"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  CreditCard,
  Shield,
  Clock,
  Users,
  Star,
} from "lucide-react";

interface PaymentComponentProps {
  onPaymentSuccess: (paymentDetails: any) => void;
  onPaymentCancel: () => void;
  amount: number;
  urgency: "standard" | "priority" | "urgent";
  deliveryFormat: "pdf" | "word" | "both";
}

export function PaymentComponent({
  onPaymentSuccess,
  onPaymentCancel,
  amount,
  urgency,
  deliveryFormat,
}: PaymentComponentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        amount: amount,
        currency: "USD",
        paymentMethod: paymentMethod,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getDeliveryText = () => {
    switch (urgency) {
      case "standard":
        return "7-10 business days";
      case "priority":
        return "3-5 business days";
      case "urgent":
        return "24-48 hours";
      default:
        return "7-10 business days";
    }
  };

  const getFormatText = () => {
    switch (deliveryFormat) {
      case "pdf":
        return "PDF document";
      case "word":
        return "Word document";
      case "both":
        return "PDF & Word documents";
      default:
        return "PDF document";
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6" />
            <span className="text-xl">Secure Payment</span>
          </div>
          <p className="text-purple-100 text-sm font-normal">
            Professional SOP Writing Service - ${amount} USD
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Service Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            What You're Getting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Human-reviewed by education experts</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600" />
              <span>Deep program research & customization</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Delivery: {getDeliveryText()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Format: {getFormatText()}</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">
            Pricing Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>SOP Writing Service ({urgency})</span>
              <span>
                $
                {urgency === "standard"
                  ? 149
                  : urgency === "priority"
                  ? 199
                  : 299}
              </span>
            </div>
            {deliveryFormat === "both" && (
              <div className="flex justify-between">
                <span>Additional Word Format</span>
                <span>+$10</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-blue-800">
              <span>Total Amount</span>
              <span>${amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">
            Payment Method
          </Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => setPaymentMethod("card")}
              className="flex-1"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Credit Card
            </Button>
            <Button
              type="button"
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              onClick={() => setPaymentMethod("paypal")}
              className="flex-1"
            >
              PayPal
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "card" && (
            <>
              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Card Information
                </Label>

                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Billing Address
                </Label>

                <div>
                  <Label htmlFor="billingAddress">Address *</Label>
                  <Input
                    id="billingAddress"
                    value={formData.billingAddress}
                    onChange={(e) =>
                      handleInputChange("billingAddress", e.target.value)
                    }
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="United States"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center py-8">
              <div className="text-lg font-semibold mb-2">PayPal Payment</div>
              <p className="text-gray-600 mb-4">
                You'll be redirected to PayPal to complete your payment
                securely.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Amount:</strong> $149.00 USD
                  <br />
                  <strong>Service:</strong> Professional SOP Writing
                </p>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="flex justify-between items-center mb-2">
              <span>Professional SOP Service ({urgency})</span>
              <span>
                $
                {urgency === "standard"
                  ? 149
                  : urgency === "priority"
                  ? 199
                  : 299}
                .00
              </span>
            </div>
            {deliveryFormat === "both" && (
              <div className="flex justify-between items-center mb-2">
                <span>Additional Word Format</span>
                <span>$10.00</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <span>Processing Fee</span>
              <span>$0.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>${amount}.00 USD</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 text-green-800">
              <Shield className="w-4 h-4" />
              <span className="font-semibold">Secure Payment</span>
            </div>
            <p className="text-green-700 mt-1">
              Your payment information is encrypted and secure. We never store
              your card details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPaymentCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                `Pay $${amount}.00 USD`
              )}
            </Button>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-6 pt-4 border-t text-center">
          <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              SSL Secured
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Money Back Guarantee
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              3-Day Delivery
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
