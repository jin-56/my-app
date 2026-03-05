import React, { useEffect, useState } from 'react';
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in and verified
    if (!auth.currentUser) {
      navigate('/login');
    } else if (!auth.currentUser.emailVerified) {
      navigate('/login');
    } else {
      setUserEmail(auth.currentUser.email || '');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="card-title text-center mb-4">Welcome to Dashboard</h3>
        
        <div className="mb-4">
          <p><strong>Email:</strong> {userEmail}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className="badge bg-success">Email Verified</span>
          </p>
        </div>

        <div className="d-grid gap-2">
          <button 
            className="btn btn-primary" 
            onClick={handleBackToLogin}
          >
            Back to Login
          </button>
          <button 
            className="btn btn-outline-danger" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;