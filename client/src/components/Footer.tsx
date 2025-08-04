import { Linkedin, Facebook, Instagram, Send } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Swarnava Sinha Ray</h3>
            <p className="text-gray-300 mb-4">
              Computer Science Professional passionate about creating innovative solutions and contributing to meaningful projects.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open('https://telegram.me', '_blank')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
                title="Telegram"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-teal-400 transition-colors"
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('education')}
                  className="text-gray-300 hover:text-teal-400 transition-colors"
                >
                  Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-teal-400 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <span className="text-gray-300">Projects (Coming Soon)</span>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <span className="text-teal-400 mr-3">📞</span>
                <span>+91 8240431142</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-teal-400 mr-3">✉️</span>
                <span>swarnava.ray@email.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <span className="text-teal-400 mr-3 mt-1">📍</span>
                <span>P-57, Paschim Putiari,<br />Kolkata 700041</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">&copy; 2025 Swarnava Sinha Ray. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Built with modern web technologies and love for clean design.</p>
        </div>
      </div>
    </footer>
  );
}
