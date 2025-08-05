import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCvFileSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { getStaticCvFile, checkStaticCvExists } from "./static-cv";
import { getEmailStatus } from "./env-check";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), "server", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage_multer,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Configure nodemailer with enhanced error handling and logging
const createEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  console.log('Email configuration check:', {
    hasEmailUser: !!emailUser,
    emailUser: emailUser ? `${emailUser.substring(0, 3)}***@${emailUser.split('@')[1] || 'unknown'}` : 'not set',
    hasEmailPassword: !!emailPassword,
    passwordLength: emailPassword ? emailPassword.length : 0
  });
  
  if (!emailUser || !emailPassword) {
    console.error('❌ Email credentials missing:', {
      EMAIL_USER: emailUser ? 'SET' : 'MISSING',
      EMAIL_PASSWORD: emailPassword ? 'SET' : 'MISSING'
    });
    return null;
  }
  
  // Create transporter with enhanced configuration for better reliability
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email transporter verification failed:', error);
    } else {
      console.log('✅ Email transporter verified successfully');
    }
  });
  
  return transporter;
};

const transporter = createEmailTransporter();

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint with environment status
  app.get("/api/health", async (req, res) => {
    const emailStatus = getEmailStatus();
    const dbConnected = !!process.env.DATABASE_URL;
    const cvAvailable = checkStaticCvExists();
    
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: dbConnected ? "connected" : "not configured",
        email: emailStatus.configured ? "configured" : "not configured",
        cv: cvAvailable ? "available" : "missing"
      },
      email: {
        hasUser: !!emailStatus.user,
        hasPassword: emailStatus.hasPassword,
        user: emailStatus.user ? `${emailStatus.user.substring(0, 3)}***@${emailStatus.user.split('@')[1]}` : null
      }
    });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification with enhanced error handling
      try {
        if (!transporter) {
          const emailStatus = getEmailStatus();
          console.error('❌ Email transporter not configured:', {
            hasEmailUser: !!emailStatus.user,
            hasEmailPassword: emailStatus.hasPassword,
            emailUser: emailStatus.user || 'NOT SET'
          });
          console.error('📧 Contact saved to database but email notification failed');
          console.error('🔧 To fix: Set EMAIL_USER and EMAIL_PASSWORD in Render environment variables');
          // Don't return error - contact is still saved
        } else {
          console.log('📧 Attempting to send email notification...');
          
          const emailOptions = {
            from: process.env.EMAIL_USER,
            to: 'swarnavasinharay@gmail.com',
            subject: `New Contact Form Submission: ${validatedData.subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #21808d;">New Contact Form Submission</h2>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                  <p><strong>Name:</strong> ${validatedData.name}</p>
                  <p><strong>Email:</strong> ${validatedData.email}</p>
                  <p><strong>Subject:</strong> ${validatedData.subject}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                    ${validatedData.message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  This email was sent from your portfolio contact form.
                </p>
              </div>
            `,
            text: `New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}

This email was sent from your portfolio contact form.`
          };
          
          console.log('📧 Email options configured:', {
            from: emailOptions.from,
            to: emailOptions.to,
            subject: emailOptions.subject
          });
          
          const info = await transporter.sendMail(emailOptions);
          console.log('✅ Email sent successfully:', {
            messageId: info.messageId,
            response: info.response
          });
        }
      } catch (emailError: any) {
        console.error('❌ Failed to send email notification:', {
          error: emailError.message,
          code: emailError.code,
          command: emailError.command,
          stack: emailError.stack
        });
        // Continue execution - contact is still saved even if email fails
      }
      
      // Determine response message based on email configuration
      const emailStatus = getEmailStatus();
      if (!emailStatus.configured) {
        res.json({ 
          success: true, 
          message: "Message received! I'll get back to you soon. (Note: Email notifications are being configured)" 
        });
      } else {
        res.json({ 
          success: true, 
          message: "Message sent successfully! I'll get back to you soon." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error('Contact form error:', error);
        const emailStatus = getEmailStatus();
        
        // Provide specific error message based on configuration
        let errorMessage = "Failed to send message. Please try again.";
        if (!emailStatus.configured) {
          errorMessage = "Message could not be sent due to server configuration. Please try again later or contact directly via email.";
        }
        
        res.status(500).json({ 
          success: false, 
          message: errorMessage
        });
      }
    }
  });

  // CV file upload
  app.post("/api/upload-cv", upload.single('cv'), async (req, res) => {
    try {
      console.log('Upload request received:', {
        hasFile: !!req.file,
        bodyKeys: Object.keys(req.body || {}),
        headers: req.headers['content-type']
      });
      
      if (!req.file) {
        console.error('No file in request:', req.file);
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const cvFile = await storage.createCvFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path
      });

      // Activate this CV file (deactivates others)
      await storage.activateCvFile(cvFile.id);

      res.json({
        success: true,
        message: "CV uploaded successfully!",
        file: cvFile
      });
    } catch (error) {
      console.error('CV upload error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to upload CV. Please try again."
      });
    }
  });

  // CV file download - uses static CV file
  app.get("/api/download-cv", async (req, res) => {
    try {
      if (!checkStaticCvExists()) {
        return res.status(404).json({
          success: false,
          message: "CV file not available for download"
        });
      }

      const staticCv = getStaticCvFile();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${staticCv.originalName}"`);
      
      const fileStream = fs.createReadStream(staticCv.filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('CV download error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to download CV. Please try again."
      });
    }
  });

  // CV file viewer (public) - uses static CV file
  app.get("/api/view-cv", async (req, res) => {
    try {
      if (!checkStaticCvExists()) {
        return res.status(404).json({
          success: false,
          message: "CV file not available for viewing"
        });
      }

      const staticCv = getStaticCvFile();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${staticCv.originalName}"`);
      
      const fileStream = fs.createReadStream(staticCv.filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('CV view error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to view CV. Please try again."
      });
    }
  });

  // Get CV status - uses static CV file
  app.get("/api/cv-status", async (req, res) => {
    try {
      if (checkStaticCvExists()) {
        const staticCv = getStaticCvFile();
        res.json({
          success: true,
          hasActiveCv: true,
          filename: staticCv.originalName,
          uploadedAt: staticCv.uploadedAt
        });
      } else {
        res.json({
          success: true,
          hasActiveCv: false
        });
      }
    } catch (error) {
      console.error('CV status error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to get CV status"
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve contacts"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
