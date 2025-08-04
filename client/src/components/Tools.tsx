import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Code2, Database, Bot } from "lucide-react";

const toolsData = [
  {
    name: "VS Studio",
    icon: Code2,
    description: "Integrated Development Environment",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    name: "BlueJ",
    icon: Code2,
    description: "Java Development Environment",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    name: "Oracle",
    icon: Database,
    description: "Database Management System",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400"
  },
  {
    name: "ChatGPT",
    icon: Bot,
    description: "AI Assistant",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    name: "Perplexity",
    icon: Bot,
    description: "AI Search Engine",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400"
  },
  {
    name: "Gemini AI",
    icon: Bot,
    description: "Google AI Assistant",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400"
  }
];

export default function Tools() {
  return (
    <section id="tools" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">Tools Familiar</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={index}
                className={`tool-card ${tool.bgColor} border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-fade-in-scale cursor-pointer group`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto ${tool.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${tool.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}