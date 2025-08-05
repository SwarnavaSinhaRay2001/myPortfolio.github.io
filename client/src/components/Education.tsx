import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle } from "lucide-react";
import { useState } from "react";

const educationData = [
  {
    title: "Master of Computer Applications (MCA)",
    year: "2025",
    status: "Completed",
    description: "Completed my Master's Degree with a CGPA of 8.07, during this tenure I gained knowledge about DAA(Design Algorithm and Analysis), advanced knowledge of SQL on ORACLE and Operating System, brushed my knowledge on Core JAVA, basics of HTML and CSS. I have done projects on 'Blood Bank Management System' and 'Message Transmission using Steganography Approach'.",
    statusColor: "text-green-600 dark:text-green-400",
    statusBg: "bg-green-100 dark:bg-green-900/30",
    yearBg: "bg-green-100 dark:bg-green-900/30",
    yearText: "text-green-700 dark:text-green-300"
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    year: "2023",
    status: "Completed",
    description: "Completed my Bachelor's Degree with a CGPA of 8.95, during this time I acquired knowledge about DSA(Data Structures and Algorithm), DBMS basics of SQL on ORACLE and Networking , also gained a profound knowledge on Core JAVA, I also built a project on 'Ethical Hacking' and 'Graph Colouring Problem using stimulated annealing'.",
    statusColor: "text-green-600 dark:text-green-400",
    statusBg: "bg-green-100 dark:bg-green-900/30",
    yearBg: "bg-green-100 dark:bg-green-900/30",
    yearText: "text-green-700 dark:text-green-300"
  },
  {
    title: "Higher Secondary",
    year: "2020",
    status: "Completed",
    description: "Completed my class 12th from Mansur Habibullah Memorial School, Kolkata with a total of 77.5 %, and also have immense interest in Computer Science and Applications so I applied for pursuing BCA",
    statusColor: "text-blue-600 dark:text-blue-400",
    statusBg: "bg-blue-100 dark:bg-blue-900/30",
    yearBg: "bg-blue-100 dark:bg-blue-900/30",
    yearText: "text-blue-700 dark:text-blue-300"
  },
  {
    title: "Secondary",
    year: "2018",
    status: "Completed",
    description: "Completed my class 10th from Mansur Habibullah Memorial School, Kolkata with a total of 86.8 %",
    statusColor: "text-purple-600 dark:text-purple-400",
    statusBg: "bg-purple-100 dark:bg-purple-900/30",
    yearBg: "bg-purple-100 dark:bg-purple-900/30",
    yearText: "text-purple-700 dark:text-purple-300"
  }
];

export default function Education() {
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setClickedCard(index);
    setTimeout(() => setClickedCard(null), 300); // Reset after animation
  };

  return (
    <section id="education" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">Education Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Animated Timeline line */}
            <div className="timeline-line animate-timeline-draw" style={{ animationDelay: '0.5s' }}></div>
            
            {educationData.map((item, index) => (
              <div
                key={index}
                className="timeline-item relative pl-20 pb-12 animate-fade-in-scale"
                style={{ animationDelay: `${0.8 + index * 0.3}s` }}
              >
                <div 
                  className="absolute left-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-pulse-dot"
                  style={{ animationDelay: `${1.2 + index * 0.3}s` }}
                ></div>
                <Card 
                  className={`education-card relative overflow-hidden bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:border-teal-300 dark:hover:border-teal-500 cursor-pointer ${
                    clickedCard === index ? 'animate-zoom-click' : ''
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Code Molecules Background Animation */}
                  <div className="code-molecules-bg">
                    {/* Floating code molecules */}
                    <div className="code-molecule" style={{ 
                      width: '32px', 
                      height: '32px', 
                      top: '15%', 
                      left: '10%',
                      animationDelay: `${index * 0.5}s` 
                    }}>
                      <span className="code-text">{'{ }'}</span>
                    </div>
                    <div className="code-molecule" style={{ 
                      width: '28px', 
                      height: '28px', 
                      top: '25%', 
                      right: '15%',
                      animationDelay: `${index * 0.5 + 1}s` 
                    }}>
                      <span className="code-text">{'<>'}</span>
                    </div>
                    <div className="code-molecule" style={{ 
                      width: '24px', 
                      height: '24px', 
                      bottom: '20%', 
                      left: '20%',
                      animationDelay: `${index * 0.5 + 0.5}s` 
                    }}>
                      <span className="code-text">{'[]'}</span>
                    </div>
                    <div className="code-molecule" style={{ 
                      width: '30px', 
                      height: '30px', 
                      bottom: '30%', 
                      right: '10%',
                      animationDelay: `${index * 0.5 + 1.5}s` 
                    }}>
                      <span className="code-text">{'()'}</span>
                    </div>
                    <div className="code-molecule" style={{ 
                      width: '26px', 
                      height: '26px', 
                      top: '50%', 
                      left: '5%',
                      animationDelay: `${index * 0.5 + 2}s` 
                    }}>
                      <span className="code-text">{'/*'}</span>
                    </div>
                    <div className="code-molecule" style={{ 
                      width: '34px', 
                      height: '34px', 
                      top: '40%', 
                      right: '5%',
                      animationDelay: `${index * 0.5 + 2.5}s` 
                    }}>
                      <span className="code-text">{'=>'}</span>
                    </div>

                    {/* Orbital animation in center */}
                    <div className="orbital-container" style={{ opacity: 0.3 }}>
                      <div className="orbital-molecule orbital-1"></div>
                      <div className="orbital-molecule orbital-2"></div>
                      <div className="orbital-molecule orbital-3"></div>
                    </div>
                  </div>

                  <CardContent className="relative z-10 p-6 lg:p-8">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {item.title}
                      </h3>
                      <span className={`px-4 py-2 ${item.yearBg} ${item.yearText} rounded-full text-sm font-medium hover:scale-105 transition-transform`}>
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
