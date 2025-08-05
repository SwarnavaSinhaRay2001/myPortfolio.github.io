# Render Environment Variables Setup Guide

## Step-by-Step Instructions

### 1. Go to Your Render Dashboard
- Open https://dashboard.render.com
- Select your portfolio web service

### 2. Navigate to Environment Variables
- Click on "Environment" tab in the left sidebar
- You'll see a list of environment variables

### 3. Add Required Variables

#### Add EMAIL_USER:
- Click "Add Environment Variable"
- **Key**: `EMAIL_USER`
- **Value**: `swarnavasinharay@gmail.com` (your full Gmail address)
- Click "Save Changes"

#### Add EMAIL_PASSWORD:
- Click "Add Environment Variable" 
- **Key**: `EMAIL_PASSWORD`
- **Value**: Your 16-character Gmail App Password (see below)
- Click "Save Changes"

### 4. Generate Gmail App Password

**Important**: You MUST use an App Password, not your regular Gmail password.

1. **Enable 2-Factor Authentication**:
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", enable "2-Step Verification"

2. **Generate App Password**:
   - Still in Security settings, click "2-Step Verification"
   - Scroll down and click "App passwords"
   - Select "Mail" from the dropdown
   - Click "Generate"
   - Copy the 16-character password (ignore spaces)

3. **Use the App Password**:
   - Paste the 16-character code as EMAIL_PASSWORD value in Render
   - Example: `abcdabcdabcdabcd` (without spaces)

### 5. Verify Database URL
Make sure `DATABASE_URL` is also set (usually auto-configured by Render)

### 6. Deploy and Test
- After saving environment variables, Render will automatically redeploy
- Wait for deployment to complete
- Test the contact form on your live site
- Check logs in Render Dashboard → Logs for success/error messages

## Quick Test Commands

After deployment, test your API endpoints:

```bash
# Test health endpoint
curl https://your-app.onrender.com/api/health

# Test contact form
curl -X POST https://your-app.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Testing email functionality"}'
```

## Expected Log Messages

**Success**: You should see these in Render logs:
```
✅ All required environment variables are set
✅ Email transporter verified successfully
📧 Attempting to send email notification...
✅ Email sent successfully
```

**Failure**: If you see these, check your environment variables:
```
❌ Missing required environment variables: ['EMAIL_USER', 'EMAIL_PASSWORD']
❌ Email transporter not configured
```