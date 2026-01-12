import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create transporter
    // Note: For production, you should use environment variables
    // For dev, if env vars are missing, we'll log the email content

    // Check for missing OR placeholder credentials
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD;
    const isPlaceholder = user?.includes('your_email') || pass?.includes('your_gmail');

    if (!user || !pass || isPlaceholder) {
        console.log('====================================================');
        console.log('⚠️  EMAIL MOCK MODE (Credentials not configured) ⚠️');
        console.log('----------------------------------------------------');
        console.log(`To:      ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message: \n${options.message}`);
        console.log('====================================================');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your preferred service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const message = {
        from: `${process.env.FROM_NAME || 'HostelHub'} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${options.subject}</h2>
        <p>${options.message}</p>
        <p>If you did not request this email, please ignore it.</p>
      </div>
    `
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('❌ Email send failed:', error.message);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
