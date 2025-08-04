import Header from "@/components/Header";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NotificationContainer from "@/components/NotificationContainer";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        className="theme-toggle"
        size="sm"
        variant="outline"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      {/* Main Content */}
      <Header />
      <About />
      <Education />
      <Skills />
      <Tools />
      <Contact />
      <Footer />
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}
