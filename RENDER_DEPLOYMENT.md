# Portfolio Deployment Guide for Render.com

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Database (Required)
- `DATABASE_URL` - Your Neon PostgreSQL connection string

### Email (Required for contact form)
- `EMAIL_USER` - Your Gmail address (e.g., youremail@gmail.com)
- `EMAIL_PASSWORD` - Your Gmail app password (not regular password)

### System (Auto-set by Render)
- `PORT` - Automatically set by Render
- `NODE_ENV` - Set to "production"

## Render.com Configuration

### Build Settings
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18 or higher

### Files to Deploy
Make sure these files are in your repository:
- `SwarnavaCV.pdf` (your CV file in the root directory)
- All source code and dependencies
- `package.json` with correct build scripts

## Key Features Fixed for Deployment

### ✅ CV Mechanism
- Now uses static CV file (`SwarnavaCV.pdf`) from root directory
- No longer relies on ephemeral file uploads
- Works reliably across deployments

### ✅ Contact Form
- Improved error handling for missing email credentials
- Graceful fallback when email service is unavailable
- Still saves contact submissions to database

### ✅ Database
- Uses Neon PostgreSQL (serverless, deployment-friendly)
- Automatic schema management with Drizzle ORM
- Connection pooling for better performance

## Common Issues & Solutions

### Contact Form Not Sending Emails
**Cause**: Missing EMAIL_USER or EMAIL_PASSWORD environment variables
**Solution**: 
1. Go to Gmail settings
2. Enable 2-factor authentication
3. Generate an app password
4. Set EMAIL_USER and EMAIL_PASSWORD in Render dashboard

### CV Download/View Not Working
**Cause**: SwarnavaCV.pdf file missing from deployment
**Solution**: Ensure SwarnavaCV.pdf is in your Git repository root

### Database Connection Issues
**Cause**: Missing or incorrect DATABASE_URL
**Solution**: 
1. Create a Neon database
2. Copy the connection string
3. Set DATABASE_URL in Render environment variables

## Testing Before Deployment

Run these commands locally to verify everything works:

```bash
# Build the application
npm run build

# Test production mode
NODE_ENV=production npm start

# Test database connection
npm run db:push
```

## Deployment Checklist

- [ ] Environment variables set in Render dashboard
- [ ] SwarnavaCV.pdf file exists in repository
- [ ] Build command configured: `npm ci && npm run build`
- [ ] Start command configured: `npm start`
- [ ] Database (Neon) is provisioned and URL is set
- [ ] Gmail app password is generated and set