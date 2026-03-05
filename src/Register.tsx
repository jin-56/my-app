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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError(null);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setError(null);
    };

    // Function to check if password and confirm password match
    const validatePasswords = () => {
        if (confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        } else if (password.length > 0 && password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        } else {
            setError(null);
            return true;
        }
    };

    React.useEffect(() => {
        validatePasswords();
    }, [password, confirmPassword]);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            
            setSuccess(`Verification email sent to ${email}. Please check your inbox.`);
            
            // Clear form
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
        } catch (error: any) {
            console.error('Registration error:', error);
            
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center mb-4">Create Account</h3>
                
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                    </div>
                )}
                
                {success && (
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                )}
                
                <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
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
                            placeholder="Enter password (min. 6 characters)"
                            required
                            disabled={isLoading}
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
                            placeholder="Re-enter your password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="d-grid gap-2">
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={isLoading || !email || !password || !confirmPassword || !!error}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating Account...
                                </>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </div>
                    
                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Already have an account?{' '}
                            <a href="/login" className="text-decoration-none">
                                Login here
                            </a>
                        </p>
                    </div>
                </form>       
            </div>
        </div>
    );
};

export default Register;