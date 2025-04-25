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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

describe('<LoginPage />', () => {
    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it('renders email and password inputs and buttons', () => {
        render(<LoginPage />, { wrapper: BrowserRouter });
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Continue with Google/i })).toBeInTheDocument();
    });

    it('navigates to dashboard on successful email login', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: '1' } });

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@user.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@user.com', 'password123');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows error when email login fails', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'bad@user.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        expect(await screen.findByText(/LoginPage failed: Wrong email or password/i)).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('navigates to dashboard on successful Google sign-in', async () => {
        (signInWithPopup as jest.Mock).mockResolvedValue({ user: { uid: '2' } });

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: /Continue with Google/i }));

        await waitFor(() => {
            expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows error when Google sign-in fails', async () => {
        (signInWithPopup as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<LoginPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: /Continue with Google/i }));

        expect(await screen.findByText(/Google sign-in failed\. Please try again\./i)).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
