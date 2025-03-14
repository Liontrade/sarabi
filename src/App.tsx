import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Dashboard from './pages/Dashboard/Dashboard';
import MarketPage from './pages/MarketPage/MarketPage';
import Spinner from './components/Spinner/Spinner';

import './styles/global.css';

function App() {
    const { user, loading } = useAuth();
    console.log('App: user =', user, 'loading =', loading);

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        console.log('ProtectedRoute: loading =', loading, ', user =', user);
        if (loading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Spinner />
                </div>
            );
        }
        if (!user) {
            console.log('ProtectedRoute: user is null, redirecting to /login');
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/market"
                    element={
                        <ProtectedRoute>
                            <MarketPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
