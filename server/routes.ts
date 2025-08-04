import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCvFileSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

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

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your.email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || 'noreply@portfolio.com',
          to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER || 'swarnava.ray@email.com',
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
          `
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue execution even if email fails
      }
      
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // CV file upload
  app.post("/api/upload-cv", upload.single('cv'), async (req, res) => {
    try {
      if (!req.file) {
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

  // CV file download
  app.get("/api/download-cv", async (req, res) => {
    try {
      const activeCv = await storage.getActiveCvFile();
      
      if (!activeCv) {
        return res.status(404).json({
          success: false,
          message: "No CV file available for download"
        });
      }

      const filePath = activeCv.filePath;
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "CV file not found on server"
        });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${activeCv.originalName}"`);
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('CV download error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to download CV. Please try again."
      });
    }
  });

  // Get CV status
  app.get("/api/cv-status", async (req, res) => {
    try {
      const activeCv = await storage.getActiveCvFile();
      
      if (activeCv) {
        res.json({
          success: true,
          hasActiveCv: true,
          filename: activeCv.originalName,
          uploadedAt: activeCv.uploadedAt
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
