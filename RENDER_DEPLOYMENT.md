# Portfolio Deployment Guide for Render.com

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Database (Required)
- `DATABASE_URL` - Your Neon PostgreSQL connection string

### Email (Required for contact form)
- `EMAIL_USER` - Your Gmail address (e.g., youremail@gmail.com)
- `EMAIL_PASSWORD` - Your Gmail app password (not regular password)

**Important**: Gmail app passwords are required:
1. Enable 2-factor authentication on Gmail
2. Go to Gmail Settings > Security > 2-Step Verification  
3. Click "App passwords" and generate one for "Mail"
4. Use the 16-character app password (not your regular Gmail password)

### System (Auto-set by Render)
- `PORT` - Automatically set by Render
- `NODE_ENV` - Set to "production"

## Render.com Configuration

### Build Settings
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18 or higher
- **Health Check Path**: `/api/cv-status` (optional but recommended)

### Alternative: Use render.yaml
I've included a `render.yaml` file for automated deployment. This file contains all the configuration settings needed for Render.com deployment.

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

### Contact Form Not Sending Emails ❌
**Symptoms**: Form submits but no email is received, user sees error message
**Diagnosis**: Check Render logs for these messages:
- `❌ Email credentials missing` = Environment variables not set
- `❌ Email transporter verification failed` = Invalid credentials or Gmail settings
- `❌ Failed to send email notification` = SMTP connection issues

**Solutions**:
1. **Missing Environment Variables**:
   - Go to Render Dashboard → Environment
   - Add `EMAIL_USER` (your Gmail address)
   - Add `EMAIL_PASSWORD` (16-character app password from Gmail)

2. **Invalid Gmail App Password**:
   - Gmail Settings → Security → 2-Step Verification
   - Click "App passwords" → Generate new password for "Mail"
   - Use the 16-character password (spaces don't matter)
   - Make sure 2FA is enabled first

3. **Gmail Security Issues**:
   - Check for "suspicious activity" emails from Google
   - Temporarily disable less secure app access if enabled
   - Use app passwords instead of regular password

### CV Download/View Not Working ❌
**Cause**: SwarnavaCV.pdf file missing from deployment
**Solution**: Ensure SwarnavaCV.pdf is in your Git repository root

### Database Connection Issues ❌
**Cause**: Missing or incorrect DATABASE_URL
**Solution**: 
1. Create a Neon database
2. Copy the connection string
3. Set DATABASE_URL in Render environment variables

### Form Submits But Nothing Happens ❌
**Cause**: JavaScript/Network errors
**Solution**: 
1. Check browser console for errors
2. Check Render application logs
3. Verify API endpoints are responding (test `/api/cv-status`)

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

## Debugging Steps for Render

### 1. Check Application Logs
In Render Dashboard → Logs, look for:
```
✅ Email transporter verified successfully  (Good!)
❌ Email credentials missing              (Fix: Add env vars)
❌ Email transporter verification failed  (Fix: Check Gmail settings)
📧 Attempting to send email notification... (Good!)
✅ Email sent successfully               (Good!)
```

### 2. Test Email Configuration
After deployment, test with:
```bash
curl -X POST https://your-app.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### 3. Verify Environment Variables
In Render Dashboard, confirm these are set:
- `EMAIL_USER` = your full Gmail address
- `EMAIL_PASSWORD` = 16-character app password (not regular password)
- `DATABASE_URL` = your Neon connection string