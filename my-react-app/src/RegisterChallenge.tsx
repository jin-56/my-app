//Make students do this
import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RegisterProps { }

const Register: React.FC<RegisterProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        console.log('Logging in with:', { email, password });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h3 className="card-title text-center mb-4">Register</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
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
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Register
                        </button>
                    </div>
                </form>
                <h3 className='d-flex justify-content-center align-items-center'><a href="/">Login</a></h3>
            </div>
        </div>
    );
};

export default Register;
