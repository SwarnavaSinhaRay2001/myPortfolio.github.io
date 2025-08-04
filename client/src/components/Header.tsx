import { Button } from "@/components/ui/button";
import { User, Linkedin, Facebook, Instagram, Send } from "lucide-react";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 dark:from-gray-800 dark:via-gray-700 dark:to-slate-900"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-teal-500 to-transparent transform rotate-12 scale-150"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center">
          {/* Header Image */}
          <div className="inline-block relative mb-6">
            <div className="w-64 h-40 lg:w-80 lg:h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <img 
                src="/SP.jpg" 
                alt="Header Image" 
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 10%' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center text-white text-4xl lg:text-5xl">
                <User className="w-16 h-16 lg:w-20 lg:h-20" />
              </div>
            </div>
          </div>
          
          {/* Name and title */}
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-teal-700 to-slate-900 dark:from-gray-200 dark:via-teal-300 dark:to-gray-200 bg-clip-text text-transparent animate-slide-up">
            Swarnava Sinha Ray
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            IT Professional
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              variant="outline"
              size="icon"
              className="social-link group p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=swarnava-sinha-ray-06151a1a0', '_blank')}
              title="LinkedIn"
            >
              <Linkedin className="w-7 h-7 text-white fill-white group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="social-link group p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://www.facebook.com/swarnava.sinharay', '_blank')}
              title="Facebook"
            >
              <Facebook className="w-7 h-7 text-white fill-white group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="social-link group p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://www.instagram.com/_drishyomaan_/?hl=en', '_blank')}
              title="Instagram"
            >
              <Instagram className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="social-link group p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://t.me/iamRAY20', '_blank')}
              title="Telegram"
            >
              <Send className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          
          {/* Quick navigation */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium"
            >
              About Me
            </Button>
            <Button
              onClick={() => window.open('/api/view-cv', '_blank')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              View CV
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('education')}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium border border-gray-200 dark:border-gray-600"
            >
              Education
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('skills')}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium border border-gray-200 dark:border-gray-600"
            >
              Skills
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('tools')}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium border border-gray-200 dark:border-gray-600"
            >
              Tools
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium border border-gray-200 dark:border-gray-600"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
