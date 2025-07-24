import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestEmailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Testing</h1>
          <p className="text-gray-600 mt-2">
            Test email functionality and templates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">University List Email</h3>
            <p className="text-gray-600 mb-4">
              Send test university recommendation emails
            </p>
            <Button className="w-full">Send Test Email</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">SOP Service Email</h3>
            <p className="text-gray-600 mb-4">
              Test professional SOP service emails
            </p>
            <Button className="w-full">Send Test Email</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Payment Confirmation</h3>
            <p className="text-gray-600 mb-4">
              Test payment confirmation emails
            </p>
            <Button className="w-full">Send Test Email</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">SOP Delivery</h3>
            <p className="text-gray-600 mb-4">
              Test SOP delivery emails with attachments
            </p>
            <Button className="w-full">Send Test Email</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
