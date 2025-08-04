import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Monitor, Lightbulb } from "lucide-react";

const skillsData = [
  {
    category: "Languages",
    icon: Code,
    skills: ["Core JAVA", "HTML", "CSS"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    category: "Operating Systems",
    icon: Monitor,
    skills: ["Linux", "Unix"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["SQL", "DBMS", "DSA"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    category: "Concepts",
    icon: Lightbulb,
    skills: ["OOPs"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index}
                className={`skill-card ${category.bgColor} border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-fade-in-scale`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto ${category.bgColor} rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-gray-200">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg text-center text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}