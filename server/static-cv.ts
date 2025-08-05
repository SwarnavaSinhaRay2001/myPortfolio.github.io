import fs from 'fs';
import path from 'path';

// Static CV file configuration for deployment
export const STATIC_CV_CONFIG = {
  filename: 'SwarnavaCV.pdf',
  originalName: 'Swarnava Sinha Ray - CV.pdf',
  filePath: path.resolve(process.cwd(), 'SwarnavaCV.pdf')
};

export function getStaticCvFile() {
  const cvPath = STATIC_CV_CONFIG.filePath;
  
  if (!fs.existsSync(cvPath)) {
    throw new Error(`Static CV file not found at: ${cvPath}`);
  }
  
  return {
    filename: STATIC_CV_CONFIG.filename,
    originalName: STATIC_CV_CONFIG.originalName,
    filePath: cvPath,
    uploadedAt: new Date('2024-01-01'), // Static date for permanent CV
    isActive: true
  };
}

export function checkStaticCvExists(): boolean {
  return fs.existsSync(STATIC_CV_CONFIG.filePath);
}