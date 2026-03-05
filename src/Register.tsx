import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { auth } from './firebase/config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    // Function to check if password and confirm password match
    const validatePasswords = () => {
        // Only validate if confirmPassword field is not empty
        if (confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError(null); // Clear error if passwords match or confirmPassword is empty
        }
    };

    // Validate passwords on every render, when password or confirmPassword changes
    React.useEffect(() => {
        validatePasswords();
    }, [password, confirmPassword]);

    const handleRegister = async () => {
        if (error) {
            console.log('Please fix the errors');
            return;
        }

        try {
            // Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Send verification email
            await sendEmailVerification(userCredential.user);
            
            setSuccess(`Verification email sent to ${email}. Please check your inbox.`);
            console.log('Registration successful:', { email });
            
        } catch (error: any) {
            console.error('Registration error:', error);
            
            // Handle specific Firebase errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email already registered. Please login or use another email.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. Please use a stronger password.');
                    break;
                default:
                    setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h3 className="card-title text-center mb-4">Register</h3>
                {success && <div className="alert alert-success mb-3">{success}</div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleRegister}
                            disabled={!!error || !email || !password || !confirmPassword}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <h3 className="d-flex justify-content-center align-items-center">
                    <a href="/">Login</a>
                </h3>
            </div>
        </div>
    );
};

export default Register;