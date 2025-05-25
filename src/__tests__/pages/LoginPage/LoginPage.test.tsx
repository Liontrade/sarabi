import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../../pages/LoginPage/LoginPage';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                title: 'Login',
                invalid_credentials_error: 'Login failed: Wrong email or password',
                email_label: 'Email',
                email_placeholder: 'Enter your email',
                password_label: 'Password',
                password_placeholder: 'Enter your password',
                login_button: 'Log In',
                or_text: 'or',
                continue_with_google: 'Continue with Google',
                forgot_password_link: 'Forgot password?',
                dont_have_account_text: "Don't have an account?",
                signup_button: 'Sign Up',
            };
            return map[key] ?? key;
        },
    }),
}));

jest.mock('../../../components/MinimalNavbar/MinimalNavbar', () => ({
    __esModule: true,
    default: ({ variant }: { variant: string }) => <nav data-testid="minimalnavbar">{variant}</nav>,
}));
jest.mock('../../../components/Spinner/Spinner', () => ({
    __esModule: true,
    default: () => <div data-testid="spinner" />,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
    };
});

describe('<LoginPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders email and password inputs and buttons', () => {
        render(<LoginPage />, { wrapper: BrowserRouter });

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
        expect(screen.getByText('or')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();

        expect(screen.getByText('Forgot password?')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('navigates to dashboard on successful email login', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
            user: { uid: '1' },
        });

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@user.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@user.com', 'password123');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows error when email login fails', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'bad@user.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'wrongpass' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

        expect(await screen.findByText('Login failed: Wrong email or password')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('navigates to dashboard on successful Google sign-in', async () => {
        (signInWithPopup as jest.Mock).mockResolvedValue({ user: { uid: '2' } });

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));

        await waitFor(() => {
            expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows error when Google sign-in fails', async () => {
        (signInWithPopup as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));

        expect(await screen.findByText('Login failed: Wrong email or password')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
