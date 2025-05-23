import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPasswordPage from '../../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { sendPasswordResetEmail } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
    sendPasswordResetEmail: jest.fn(),
}));
jest.mock('../../../firebaseConfig', () => ({
    auth: {},
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count: number }): string =>
            key === 'redirecting' ? `Redirecting in ${opts!.count}` : key,
    }),
}));

jest.mock('../../../components/Spinner/Spinner', () => {
    const MockSpinner = () => <div data-testid="spinner" />;
    MockSpinner.displayName = 'Spinner';
    return MockSpinner;
});
jest.mock('../../../components/MinimalNavbar/MinimalNavbar', () => {
    const MockNavbar = () => <nav data-testid="navbar" />;
    MockNavbar.displayName = 'MinimalNavbar';
    return MockNavbar;
});

describe('<ForgotPasswordPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            jest.runOnlyPendingTimers();
        });
        jest.useRealTimers();
    });

    it('renders the form correctly', () => {
        render(<ForgotPasswordPage />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument();
        expect(screen.getByLabelText('email_label')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'reset_button' })).toBeEnabled();
    });

    it('lets the user click "back_to_login" immediately', async () => {
        (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

        render(<ForgotPasswordPage />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText('email_label'), {
            target: { value: 'user@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'reset_button' }));

        await waitFor(() => screen.getByText(/message_sent/));

        fireEvent.click(screen.getByRole('button', { name: 'back_to_login' }));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('shows error message on failure', async () => {
        (sendPasswordResetEmail as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<ForgotPasswordPage />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText('email_label'), {
            target: { value: 'bad@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'reset_button' }));

        expect(await screen.findByText('error_generic')).toBeInTheDocument();
    });
});
