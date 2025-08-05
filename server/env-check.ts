// Environment variable checker for deployment
export function checkRequiredEnvVars() {
  const requiredVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_USER: process.env.EMAIL_USER, 
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
  };

  const missing = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    console.error('📋 Set these in your Render dashboard:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    
    if (missing.includes('EMAIL_USER') || missing.includes('EMAIL_PASSWORD')) {
      console.error('📧 Email setup instructions:');
      console.error('   1. Enable 2FA on Gmail');
      console.error('   2. Generate App Password in Gmail Settings');
      console.error('   3. Set EMAIL_USER to your Gmail address');
      console.error('   4. Set EMAIL_PASSWORD to the 16-character app password');
    }
  } else {
    console.log('✅ All required environment variables are set');
  }

  return missing;
}

export function getEmailStatus() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  return {
    configured: !!(emailUser && emailPassword),
    user: emailUser,
    hasPassword: !!emailPassword
  };
}