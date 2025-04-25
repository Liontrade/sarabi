jest.useFakeTimers({ advanceTimers: true });

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import VerifyEmail from '../../../pages/VerifyEmailPage/VerifyEmailPage';
import { sendEmailVerification, User } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    sendEmailVerification: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('<VerifyEmail />', () => {
    const mockReload = jest.fn();
    const mockUser = {
        email: 'user@example.com',
        emailVerified: false,
        reload: mockReload,
    } as unknown as User;

    beforeEach(() => {
        jest.clearAllMocks();

        (auth as { currentUser: User | null }).currentUser = mockUser;
        Object.defineProperty(mockUser, 'emailVerified', { value: false });
        mockReload.mockReset();
    });

    it('renders email and resend button', () => {
        render(<VerifyEmail />, { wrapper: BrowserRouter });
        expect(screen.getByText(/Verify Your Email/i)).toBeInTheDocument();
        expect(screen.getByText(/A verification email has been sent to/i)).toHaveTextContent('user@example.com');
        expect(screen.getByRole('button', { name: /Resend Email/i })).toBeInTheDocument();
    });

    it('resends verification email on button click', async () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

        render(<VerifyEmail />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: /Resend Email/i }));

        await waitFor(() => {
            expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
            expect(mockAlert).toHaveBeenCalledWith('Verification email has been sent again.');
        });

        mockAlert.mockRestore();
    });

    it('navigates to dashboard when emailVerified becomes true', async () => {
        mockReload.mockImplementation(async () => {
            Object.defineProperty(mockUser, 'emailVerified', { value: true });
        });

        render(<VerifyEmail />, { wrapper: BrowserRouter });

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        await waitFor(() => {
            expect(mockReload).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
