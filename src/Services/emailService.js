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
        text: `Your password reset code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};