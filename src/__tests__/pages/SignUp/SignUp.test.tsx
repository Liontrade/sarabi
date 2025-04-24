import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp, { validateEmail } from '../../../pages/SignUp/SignUp';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

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

describe('SignUp Component & validateEmail()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateEmail()', () => {
        it('should return true for a valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        it('should return false for an invalid email', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('foo@bar')).toBe(false);
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('<SignUp />', () => {
        it('shows error for invalid email', async () => {
            render(<SignUp />, { wrapper: BrowserRouter });

            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'foo' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
            fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: 'abcdefgh' } });

            const form = screen.getByTestId('signup-form');
            fireEvent.submit(form);

            const alert = await screen.findByRole('alert');
            expect(alert).toHaveTextContent('Please enter a valid email address.');
        });

        it('shows error if password is too short', async () => {
            render(<SignUp />, { wrapper: BrowserRouter });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
            fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: 'short' } });
            fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

            expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument();
        });

        it('shows error when passwords do not match', async () => {
            render(<SignUp />, { wrapper: BrowserRouter });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
            fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: 'abcdefgi' } });
            fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

            expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
        });

        it('calls createUserWithEmailAndPassword and navigates on success', async () => {
            (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: '123' } });
            render(<SignUp />, { wrapper: BrowserRouter });

            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
            fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: 'abcdefgh' } });
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
            const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            const err = new FirebaseError('auth/email-already-in-use', 'fail');
            (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(err);

            render(<SignUp />, { wrapper: BrowserRouter });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@a.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'abcdefgh' } });
            fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: 'abcdefgh' } });
            fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

            expect(await screen.findByText(/already registered/i)).toBeInTheDocument();

            errorSpy.mockRestore();
        });

        it('handles Google Sign-In and navigation', async () => {
            (signInWithPopup as jest.Mock).mockResolvedValue({});
            render(<SignUp />, { wrapper: BrowserRouter });
            fireEvent.click(screen.getByRole('button', { name: /Sign up with Google/i }));

            await waitFor(() => {
                expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
                expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
            });
        });
    });
});
