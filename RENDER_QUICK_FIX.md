# Quick Fix for Render Email Issues

## The Problem
Contact form submissions fail on Render because `EMAIL_USER` and `EMAIL_PASSWORD` environment variables are missing.

## The Solution (3 Steps)

### Step 1: Generate Gmail App Password
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification if not already enabled
3. Under "Signing in to Google" → click "2-Step Verification"
4. Scroll down and click "App passwords"
5. Select "Mail" and click "Generate"
6. Copy the 16-character password (ignore spaces)

### Step 2: Set Environment Variables in Render
1. Go to https://dashboard.render.com
2. Select your portfolio web service
3. Click "Environment" tab
4. Add these variables:
   - **EMAIL_USER**: `swarnavasinharay@gmail.com`
   - **EMAIL_PASSWORD**: `[paste the 16-character app password here]`
5. Click "Save Changes"

### Step 3: Test the Fix
Render will automatically redeploy. After deployment:

1. Test with health check: `https://your-app.onrender.com/api/health`
2. Look for: `"email": "configured"` in the response
3. Try the contact form on your live site

## Expected Results

**Before Fix** (in Render logs):
```
❌ Missing required environment variables: ['EMAIL_USER', 'EMAIL_PASSWORD']
❌ Email transporter not configured
```

**After Fix** (in Render logs):
```
✅ All required environment variables are set
✅ Email transporter verified successfully
📧 Attempting to send email notification...
✅ Email sent successfully
```

## Need Help?
Check the detailed guides:
- `render-env-setup.md` - Step-by-step environment setup
- `RENDER_DEPLOYMENT.md` - Complete deployment guide