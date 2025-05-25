import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import VerifyEmailPage from '../../../pages/VerifyEmailPage/VerifyEmailPage';
import { sendEmailVerification, User } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../firebaseConfig', () => ({
    auth: {},
}));

jest.useFakeTimers();

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        // note: replaced `any` with `unknown`
        t: (key: string, opts?: Record<string, unknown>) => {
            const map: Record<string, string> = {
                title: 'Verify Your Email',
                // opts.email comes through as unknown, but we know our test only passes a string
                info: `A verification email has been sent to ${opts?.email as string}`,
                resend_button: 'Resend Email',
                resent_alert: 'Verification email has been sent again.',
            };
            return map[key];
        },
    }),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    sendEmailVerification: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('<VerifyEmailPage />', () => {
    const mockReload = jest.fn();
    const mockUser = {
        email: 'user@example.com',
        emailVerified: false,
        reload: mockReload,
    } as unknown as User;

    beforeEach(() => {
        jest.clearAllMocks();

        (auth as { currentUser: User | null }).currentUser = mockUser;

        Object.defineProperty(mockUser, 'emailVerified', {
            value: false,
            writable: true,
        });

        mockReload.mockReset();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('renders title, email info and resend button', () => {
        render(<VerifyEmailPage />, { wrapper: BrowserRouter });

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: 'Verify Your Email',
            }),
        ).toBeInTheDocument();

        expect(screen.getByText(/sent to user@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Resend Email' })).toBeInTheDocument();
    });

    it('resends email when clicking resend', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

        render(<VerifyEmailPage />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: 'Resend Email' }));

        await waitFor(() => {
            expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
            expect(alertSpy).toHaveBeenCalledWith('Verification email has been sent again.');
        });

        alertSpy.mockRestore();
    });

    it('polls reload and navigates once verified', async () => {
        mockReload.mockImplementation(async () => {
            Object.defineProperty(mockUser, 'emailVerified', {
                value: true,
                writable: true,
            });
        });

        render(<VerifyEmailPage />, { wrapper: BrowserRouter });

        await act(async () => {
            jest.advanceTimersByTime(3000);
        });

        expect(mockReload).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
});
