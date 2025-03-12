// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDAMXlIKlmTDKntyG3m5T73Y0tmDjJaMYM',
    authDomain: 'liontrade-1efba.firebaseapp.com',
    projectId: 'liontrade-1efba',
    storageBucket: 'liontrade-1efba.firebasestorage.app',
    messagingSenderId: '712313659942',
    appId: '1:712313659942:web:7a7a7486c34ff8e44afce7',
    measurementId: 'G-8LYH5H1TK4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
