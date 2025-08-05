// Email configuration test utility
import nodemailer from 'nodemailer';

async function testEmailConfiguration() {
  console.log('🔧 Testing email configuration...');
  
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  console.log('Environment variables:', {
    EMAIL_USER: emailUser ? `${emailUser.substring(0, 3)}***@${emailUser.split('@')[1]}` : 'NOT SET',
    EMAIL_PASSWORD: emailPassword ? `${emailPassword.length} characters` : 'NOT SET'
  });
  
  if (!emailUser || !emailPassword) {
    console.error('❌ Missing email credentials');
    return false;
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  try {
    // Verify connection
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    
    // Test email send
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: emailUser,
      to: emailUser, // Send to self for testing
      subject: 'Portfolio Email Test',
      text: 'This is a test email from your portfolio application.'
    });
    
    console.log('✅ Test email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    return true;
  } catch (error: any) {
    console.error('❌ Email test failed:', {
      error: error.message,
      code: error.code,
      command: error.command
    });
    return false;
  }
}

// Run test if called directly
if (require.main === module) {
  testEmailConfiguration()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test script error:', error);
      process.exit(1);
    });
}

export { testEmailConfiguration };