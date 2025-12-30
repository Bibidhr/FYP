import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env manually to be sure
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing Email Configuration...');
console.log('--------------------------------');
console.log(`User: ${process.env.EMAIL_USER}`);
// Mask password to show length
const pass = process.env.EMAIL_PASSWORD || '';
console.log(`Pass: ${pass.substring(0, 2)}...${pass.substring(pass.length - 2)} (Length: ${pass.length})`);
console.log('--------------------------------');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to self
    subject: 'Test Email from Hostel App',
    text: 'If you receive this, your email configuration is working correctly!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('❌ Error sending email:');
        console.error(error);
    } else {
        console.log('✅ Email sent successfully: ' + info.response);
    }
});
