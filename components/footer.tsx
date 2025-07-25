export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Study Smart AI
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Your AI-powered study abroad assistant helping students achieve
              their international education dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li>University Recommendations</li>
              <li>SOP Writing Assistance</li>
              <li>Application Guidance</li>
              <li>Scholarship Information</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left lg:text-right sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Contact
            </h4>
            <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <p className="break-all sm:break-normal">
                📧 studyabroadasistant@gmail.com
              </p>
              <p>
                📱 <span className="text-gray-500 italic">WhatsApp support coming soon</span>
              </p>
              <p>
                🌐 <a
                  href="https://www.studysmartai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  www.studysmartai.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            © 2025 Study Smart AI. All rights reserved. Dedicated to supporting students in achieving their international education goals.
          </p>
        </div>
      </div>
    </footer>
  );
}
