import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Du kan bruge en anden email service
    auth: {
        user: "ProStatica1@gmail.com",
        pass: "eprw xdjm omgp ovob"
    }
});

export const sendResetCode = (email, code) => {
    const mailOptions = {
        from: "ProStatica1@gmail.com",
        to: email,
        subject: 'Password Reset Code',
        text: `You have requested to reset your password. Please use the following code to proceed with the reset process:

Your Reset Code: ${code}

If you did not request a password reset, please ignore this email, and no changes will be made to your account.

If you encounter any issues or require further assistance, please do not hesitate to contact our support team at this email.

Best regards,
ProStatica`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export const sendWelcomeEmail = (email, username) => {
    const mailOptions = {
        from: "ProStatica1@gmail.com",
        to: email,
        subject: 'Welcome to ProStatica',
        text: `Dear ${username},

Welcome to ProStatica!

We’re thrilled to have you as part of our gaming community. Whether you're here to track your progress, analyze your stats, or connect with fellow gamers, we’re here to help you take your gaming to the next level.

What You Can Do on ProStatica:
Track Your Stats: Get detailed insights into your gaming performance across multiple titles.

Analyze Your Gameplay: Dive deep into your data to identify strengths, weaknesses, and areas for improvement.

Join the Community: Engage with other gamers, share tips, and stay updated on the latest trends.

Thank you for joining us. We can't wait to see you dominate the leaderboards!

Happy Gaming,
The ProStatica Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
};