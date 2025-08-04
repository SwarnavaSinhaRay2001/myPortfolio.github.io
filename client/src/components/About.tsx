import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, CheckCircle, Upload, Settings } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useNotifications } from "@/hooks/use-notifications";

interface CvStatus {
  success: boolean;
  hasActiveCv: boolean;
  filename?: string;
  uploadedAt?: string;
}

export default function About() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  // Fetch CV status
  const { data: cvStatus, isLoading: cvStatusLoading } = useQuery<CvStatus>({
    queryKey: ['/api/cv-status'],
  });

  // CV download mutation
  const downloadMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/download-cv');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download CV');
      }
      
      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = cvStatus?.filename || 'Swarnava_Sinha_Ray_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => {
      showNotification('CV downloaded successfully!', 'success');
    },
    onError: (error: Error) => {
      showNotification(error.message, 'error');
    },
  });

  // CV upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('cv', file);
      const response = await apiRequest('POST', '/api/upload-cv', formData);
      return response.json();
    },
    onSuccess: () => {
      showNotification('CV uploaded successfully!', 'success');
      queryClient.invalidateQueries({ queryKey: ['/api/cv-status'] });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error: Error) => {
      showNotification(error.message, 'error');
    },
  });

  const handleFileUpload = (file: File) => {
    if (!file.type.includes('pdf')) {
      showNotification('Please upload a PDF file only.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size must be less than 5MB.', 'error');
      return;
    }

    uploadMutation.mutate(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
          </div>
          
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Profile Picture */}
                <div className="lg:col-span-1 flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                      <img 
                        src="/PP.jpg" 
                        alt="Swarnava Sinha Ray" 
                        className="w-44 h-44 lg:w-60 lg:h-60 object-cover rounded-xl shadow-inner"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-44 h-44 lg:w-60 lg:h-60 bg-white dark:bg-gray-700 rounded-xl shadow-inner flex items-center justify-center">
                                <span class="text-2xl lg:text-4xl text-slate-400 dark:text-gray-500">SR</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* About Content */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                    Hello, I am a BCA graduate and a MCA Post-Graduate, I have a profound knowledge of Core JAVA and also developing my skills on AI/ML. I have done projects both on JAVA, HTML/CSS, SQL. I am very good at taking responsibilities and problem solving situations. I am looking for job opportunities as a frontend developer , software engineer and so on.
                  </p>
                  <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                    With experience in various programming languages and technologies, I am passionate about creating innovative solutions and contributing to meaningful projects that make a difference.
                  </p>
                  
                  {/* Skills highlights */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-200">Core Competencies</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-sm font-medium">Software Development</span>
                      <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">JAVA</span>
                      <span className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium">SQL</span>
                      <span className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">Web Technologies</span>
                      <span className="px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium">Problem Solving</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CV Download section - Full width below */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-100 dark:border-teal-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-200 mb-4 flex items-center">
                        <FileText className="text-red-500 mr-3" />
                        Curriculum Vitae
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 mb-6">Download my latest CV to learn more about my experience and qualifications.</p>
                      
                      {/* CV Status */}
                      {cvStatusLoading ? (
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span className="text-sm">Checking CV status...</span>
                          </div>
                        </div>
                      ) : cvStatus?.hasActiveCv ? (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center text-green-700 dark:text-green-300">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <div className="text-sm">
                              <div>CV Available: {cvStatus.filename}</div>
                              {cvStatus.uploadedAt && (
                                <div className="text-xs opacity-75">
                                  Last updated: {formatDate(cvStatus.uploadedAt)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <div className="flex items-center text-yellow-700 dark:text-yellow-300">
                            <FileText className="w-4 h-4 mr-2" />
                            <span className="text-sm">No CV currently available</span>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => downloadMutation.mutate()}
                        disabled={downloadMutation.isPending || !cvStatus?.hasActiveCv}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        {downloadMutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                            Preparing CV...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download CV
                          </>
                        )}
                      </Button>
                      
                      {/* Download stats */}
                      <div className="mt-4 text-center text-sm text-slate-500 dark:text-gray-400">
                        <span>Professional portfolio document</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Admin CV Upload */}
                  <Card className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-gray-200 mb-4 flex items-center">
                        <Settings className="text-gray-500 mr-3" />
                        CV Management
                      </h4>
                      <div
                        className={`file-upload-area rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                          isDragOver ? 'dragover' : ''
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-12 h-12 text-teal-500 mx-auto mb-3" />
                        <p className="text-slate-600 dark:text-gray-300 mb-2">
                          {uploadMutation.isPending ? 'Uploading...' : 'Upload new CV file'}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-gray-400">
                          Drag & drop or click to select (PDF only, max 5MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                        />
                        {uploadMutation.isPending && (
                          <div className="mt-3">
                            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
