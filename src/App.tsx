import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import HomeDashboardPage from './pages/HomeDashboardPage/HomeDashboardPage';
import VerifyEmailPage from './pages/VerifyEmailPage/VerifyEmailPage';
import MarketPage from './pages/MarketPage/MarketPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Spinner from './components/Spinner/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import NotFound from './pages/NotFound/NotFound';

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
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <HomeDashboardPage />
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
