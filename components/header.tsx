import { GraduationCap, Globe } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Study Smart AI
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Globe className="h-5 w-5" />
            <span>Canada & UK Education Assistant</span>
          </div>
        </div>
      </div>
    </header>
  );
}
