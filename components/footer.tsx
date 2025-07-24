export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Study Smart AI</h3>
            <p className="text-gray-400 leading-relaxed">
              Your AI-powered study abroad assistant helping students achieve
              their dreams in Canada & UK.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>University Recommendations</li>
              <li>SOP Writing Assistance</li>
              <li>Application Guidance</li>
              <li>Scholarship Information</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>📧 studyabroadasistant@gmail.com</p>
              <p>📱 +1 (555) 123-4567</p>
              <p>🌐 www.studysmartai.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2025 Study Smart AI. All rights reserved. Made with ❤️ for
            students pursuing education in Canada & UK.
          </p>
        </div>
      </div>
    </footer>
  );
}
