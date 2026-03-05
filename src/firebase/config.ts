import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Fallback values in case env vars don't load
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "AIzaSyABMZW0zLK0opZvYafFXTysqGI4kA1V1_4",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "internet-66.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECT_ID || "internet-66",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "internet-66.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "1088643736320",
  appId: import.meta.env.VITE_APP_ID || "1:1088643736320:web:c89097ec783abe3c7f09e5"
};

console.log('🔥 Firebase Config:', firebaseConfig); // Add this to debug

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);