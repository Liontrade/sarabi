import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage, { validateEmail } from '../../../pages/SignUpPage/SignUpPage';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    createUserWithEmailAndPassword: jest.fn(),
    sendEmailVerification: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                title: 'Sign Up',
                valid_email_error: 'Please enter a valid email address.',
                password_min_length_error: 'Password must be at least 8 characters.',
                password_match_error: 'Passwords do not match',
                email_label: 'Email',
                email_placeholder: 'Enter your email',
                password_label: 'Password',
                password_placeholder: 'Enter your password',
                repeat_password_label: 'Repeat Password',
                repeat_password_placeholder: 'Repeat your password',
                create_account_button: 'Create Account',
                info_text: 'By signing up you agree to our Terms & Privacy.',
                signup_social_button: 'Sign up with Google',
                email_already_in_use_error: 'Email already registered.',
                terms_text: 'By signing up you agree to our <terms>Terms</terms> & <privacy>Privacy</privacy>.',
            };
            return map[key] ?? key;
        },
    }),
    Trans: ({ i18nKey, t }: { i18nKey: string; t: (k: string) => string }) => <>{t(i18nKey)}</>,
}));

jest.mock('../../../components/MinimalNavbar/MinimalNavbar', () => ({
    __esModule: true,
    default: ({ variant }: { variant: string }) => <nav data-testid="minimalnavbar">{variant}</nav>,
}));
jest.mock('../../../components/Spinner/Spinner', () => ({
    __esModule: true,
    default: () => <div data-testid="spinner" />,
}));

describe('validateEmail()', () => {
    it('returns true for valid emails', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });
    it('returns false for invalid emails', () => {
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('foo@bar')).toBe(false);
        expect(validateEmail('')).toBe(false);
    });
});

describe('<SignUpPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows error for invalid email', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'foo' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'abcdefgh' } });

        fireEvent.submit(screen.getByTestId('signup-form'));

        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Please enter a valid email address.');
    });

    it('shows error if password is too short', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument();
    });

    it('shows error when passwords do not match', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'abcdefgi' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it('calls createUserWithEmailAndPassword and navigates on success', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: '123' } });

        render(<SignUpPage />, { wrapper: BrowserRouter });

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'abcdefgh' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
                expect.anything(),
                'test@example.com',
                'abcdefgh',
            );
            expect(sendEmailVerification).toHaveBeenCalledWith({ uid: '123' });
            expect(mockNavigate).toHaveBeenCalledWith('/verify-email');
        });
    });

    it('handles email-already-in-use error', async () => {
        const err = new FirebaseError('auth/email-already-in-use', 'fail');
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(err);

        render(<SignUpPage />, { wrapper: BrowserRouter });

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@a.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'abcdefgh' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(await screen.findByText(/already registered/i)).toBeInTheDocument();
    });

    it('handles Google Sign-In and navigation', async () => {
        (signInWithPopup as jest.Mock).mockResolvedValue({});

        render(<SignUpPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: /Sign up with Google/i }));

        await waitFor(() => {
            expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });
});
