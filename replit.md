# Overview

This is a personal portfolio website for Swarnava Sinha Ray, a computer science professional. The application is built as a full-stack web application with a React frontend and Express.js backend, featuring a modern design system using shadcn/ui components. The portfolio includes sections for personal information, education history, CV management, and a contact form with email functionality.

## Recent Changes (August 2025)

### Deployment Fixes for Render.com
- **Fixed CV Mechanism**: Now uses static CV file (SwarnavaCV.pdf) instead of ephemeral uploads
- **Improved Email Handling**: Added graceful fallback for missing email credentials
- **Enhanced Error Handling**: Better production-ready error messages and logging
- **Deployment Configuration**: Added Render-specific build and deployment instructions

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI System**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and theme support (light/dark mode)
- **State Management**: TanStack Query for server state and React Context for client state
- **Routing**: Wouter for lightweight client-side routing
- **Build System**: Vite with hot module replacement and TypeScript support

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **File Upload**: Multer middleware for CV file handling with local storage
- **Email Service**: Nodemailer for contact form submissions
- **Session Management**: express-session with PostgreSQL session store
- **Development**: Hot reload with tsx for development server

## Database Design
- **Database**: PostgreSQL with Neon serverless provider
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**:
  - `users`: User authentication with username/password
  - `contacts`: Contact form submissions with read status tracking
  - `cv_files`: CV file metadata with active status management

## Authentication & Security
- **Authentication**: Session-based authentication with PostgreSQL session storage
- **File Security**: PDF-only uploads with 5MB size limit and secure file naming
- **Input Validation**: Zod schemas for type-safe validation on both client and server
- **CORS**: Configured for development with credential support

## Development Workflow
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Hot Reload**: Vite HMR for frontend and tsx for backend development
- **Build Process**: Separate build commands for frontend (Vite) and backend (esbuild)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations and migrations

## Email Services
- **Nodemailer**: SMTP email sending for contact form notifications
- **Gmail SMTP**: Email service provider (configurable via environment variables)

## UI/UX Libraries
- **Radix UI**: Headless UI primitives for accessibility and interactions
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **TanStack Query**: Server state management and caching

## Development Tools
- **Vite**: Build tool with HMR and TypeScript support
- **TypeScript**: Type safety across the entire application
- **Zod**: Runtime type validation and schema definition
- **ESBuild**: Fast bundling for production backend builds

## File Management
- **Multer**: File upload middleware for CV management
- **Node.js fs**: File system operations for local file storage

## Deployment
- **Replit**: Development and hosting platform with integrated tools
- **Environment Variables**: Configuration for database URLs and email credentials