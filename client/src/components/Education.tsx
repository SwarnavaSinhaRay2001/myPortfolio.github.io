import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle } from "lucide-react";

const educationData = [
  {
    title: "Master of Computer Applications (MCA)",
    year: "2025",
    status: "In Progress",
    description: "Currently pursuing advanced studies in computer applications and software development. Focusing on modern technologies and industry best practices.",
    statusColor: "text-teal-600 dark:text-teal-400",
    statusBg: "bg-teal-100 dark:bg-teal-900/30",
    yearBg: "bg-teal-100 dark:bg-teal-900/30",
    yearText: "text-teal-700 dark:text-teal-300"
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    year: "2023",
    status: "Completed",
    description: "Completed undergraduate studies with focus on computer science fundamentals and programming. Built strong foundation in software development.",
    statusColor: "text-green-600 dark:text-green-400",
    statusBg: "bg-green-100 dark:bg-green-900/30",
    yearBg: "bg-green-100 dark:bg-green-900/30",
    yearText: "text-green-700 dark:text-green-300"
  },
  {
    title: "Higher Secondary",
    year: "2020",
    status: "Completed",
    description: "Completed higher secondary education with strong academic performance. Developed interest in computer science and technology.",
    statusColor: "text-blue-600 dark:text-blue-400",
    statusBg: "bg-blue-100 dark:bg-blue-900/30",
    yearBg: "bg-blue-100 dark:bg-blue-900/30",
    yearText: "text-blue-700 dark:text-blue-300"
  },
  {
    title: "Secondary",
    year: "2018",
    status: "Completed",
    description: "Completed secondary education with excellent grades. Foundation for further academic and professional development.",
    statusColor: "text-purple-600 dark:text-purple-400",
    statusBg: "bg-purple-100 dark:bg-purple-900/30",
    yearBg: "bg-purple-100 dark:bg-purple-900/30",
    yearText: "text-purple-700 dark:text-purple-300"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">Education Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-teal-600"></div>
            
            {educationData.map((item, index) => (
              <div
                key={index}
                className="timeline-item relative pl-20 pb-12 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute left-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                <Card className="bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-gray-200">
                        {item.title}
                      </h3>
                      <span className={`px-4 py-2 ${item.yearBg} ${item.yearText} rounded-full text-sm font-medium`}>
                        {item.year}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className={`flex items-center ${item.statusColor}`}>
                      {item.status === "In Progress" ? (
                        <GraduationCap className="w-4 h-4 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      <span className="text-sm">{item.status}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
