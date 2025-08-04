import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Server, Send, NotebookTabs, NotebookPen, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useNotifications } from "@/hooks/use-notifications";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { showNotification } = useNotifications();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      showNotification("Message sent successfully! I'll get back to you soon.", 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    },
    onError: (error: any) => {
      const errorMessage = error.message || 'Failed to send message. Please try again.';
      showNotification(errorMessage, 'error');
    },
  });

  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name: keyof ContactFormData) => {
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<ContactFormData> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof ContactFormData, formData[key as keyof ContactFormData]);
      if (error) newErrors[key as keyof ContactFormData] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      contactMutation.mutate(formData);
    }
  };

  const copyToClipboard = (text: string, successMessage: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification(successMessage, 'success');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification(successMessage, 'success');
    }
  };

  const handleContactItemClick = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
          window.location.href = `tel:${value}`;
        } else {
          copyToClipboard(value, 'Phone number copied to clipboard!');
        }
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'address':
        const encodedAddress = encodeURIComponent(value);
        window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
        break;
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-gray-200">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and let's discuss how we can work together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-600">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-6 flex items-center">
                  <NotebookTabs className="text-teal-500 mr-3" />
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div
                    className="contact-item flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleContactItemClick('phone', '+91 8240431142')}
                  >
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-gray-200">Phone</p>
                      <span className="text-slate-600 dark:text-gray-300">+91 8240431142</span>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div
                    className="contact-item flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleContactItemClick('email', 'swarnava.ray@email.com')}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-gray-200">Email</p>
                      <span className="text-slate-600 dark:text-gray-300">swarnava.ray@email.com</span>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div
                    className="contact-item flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleContactItemClick('address', 'P-57, Paschim Putiari, Kolkata 700041')}
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <MapPin className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-gray-200">Location</p>
                      <span className="text-slate-600 dark:text-gray-300">P-57, Paschim Putiari, Kolkata 700041</span>
                    </div>
                  </div>
                </div>
                
                {/* Response time indicator */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center text-green-700 dark:text-green-300">
                    <Clock className="mr-3" />
                    <div>
                      <p className="font-medium">Quick Response</p>
                      <p className="text-sm">I typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* API Status */}
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-600">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-200 mb-4 flex items-center">
                  <Server className="text-purple-500 mr-3" />
                  API Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-gray-300">Contact Form API</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-soft"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-gray-300">Email Service</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-soft"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-gray-300">CV Download</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-soft"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-6 flex items-center">
                <NotebookPen className="text-teal-500 mr-3" />
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-gray-300">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Your full name"
                    className={`mt-2 ${errors.name ? 'border-red-300 dark:border-red-600' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-gray-300">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your.email@example.com"
                    className={`mt-2 ${errors.email ? 'border-red-300 dark:border-red-600' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                {/* Subject Field */}
                <div>
                  <Label htmlFor="subject" className="text-slate-700 dark:text-gray-300">
                    Subject *
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className={`mt-2 ${errors.subject ? 'border-red-300 dark:border-red-600' : ''}`}>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collaboration">Collaboration Opportunity</SelectItem>
                      <SelectItem value="project">Project Inquiry</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div>
                  <Label htmlFor="message" className="text-slate-700 dark:text-gray-300">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me about your project or inquiry..."
                    className={`mt-2 resize-vertical ${errors.message ? 'border-red-300 dark:border-red-600' : ''}`}
                    maxLength={500}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                  <div className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>
                
                {/* Privacy Notice */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start">
                    <Info className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium mb-1">Privacy Notice</p>
                      <p>Your information will only be used to respond to your inquiry and will not be shared with third parties.</p>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white px-6 py-4 font-medium"
                >
                  {contactMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
