import React, { useState } from 'react';
import '/src/Css/FogotPassword.css';

const FogotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/requestPasswordReset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setMessage(`A reset code has been sent to ${email}`);
                setStep(2);
            } else {
                setMessage('User not found.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/verifyResetCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: resetCode }),
            });
            if (response.ok) {
                setMessage('Code verified. You can now reset your password.');
                setStep(3);
            } else {
                setMessage('Invalid code.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: resetCode, newPassword }),
            });
            if (response.ok) {
                setMessage('Password reset successfully.');
                setStep(1);
                setEmail('');
                setResetCode('');
                setNewPassword('');
            } else {
                setMessage('Failed to reset password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {step === 1 && (
                <form onSubmit={handleSubmitEmail}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleVerifyCode}>
                    <label htmlFor="resetCode">Reset Code:</label>
                    <input
                        type="text"
                        id="resetCode"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        required
                    />
                    <button type="submit">Verify Code</button>
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handleResetPassword}>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FogotPassword;
