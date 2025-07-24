import { GraduationCap, Globe } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              Study Smart AI
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-gray-600">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">
              Global Education Assistant
            </span>
          </div>
          <div className="flex sm:hidden items-center">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
