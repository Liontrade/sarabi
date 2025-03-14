// App.tsx
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
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Spinner from './components/Spinner/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import TwoFactorPrompt from './pages/TwoFactorPage/TwoFactorPromptPage/TwoFactorPromptPage';
import TwoFactorSetup from './pages/TwoFactorPage/TwoFactorSetupPage/TwoFactorSetupPage';


function App() {
    const { user, loading } = useAuth();
    console.log('App: user =', user, 'loading =', loading);

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
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
            {/* Dodaj ToastContainer */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/twofactor/prompt"
                    element={
                        <ProtectedRoute>
                            <TwoFactorPrompt />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/twofactor/setup"
                    element={
                        <ProtectedRoute>
                            <TwoFactorSetup />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
