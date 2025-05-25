import { render, screen, fireEvent, waitFor } from '@testing-library/react';

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

const fakeUser = { email: 'alice@example.com', uid: 'uid-123' };
jest.mock('../../../firebaseConfig', () => ({
    __esModule: true,
    auth: { currentUser: fakeUser },
}));

jest.mock('firebase/auth', () => ({
    __esModule: true,
    EmailAuthProvider: {
        credential: jest.fn((email: string, pass: string) => ({ email, pass })),
    },
    reauthenticateWithCredential: jest.fn(),
    updatePassword: jest.fn(),
    deleteUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (k: string) => k }),
}));

const toast = { success: jest.fn(), error: jest.fn(), info: jest.fn() };
jest.mock('react-toastify', () => ({ toast }));

import SecuritySettings from '../../../components/Settings/SecuritySettings/SecuritySettings';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';

describe('<SecuritySettings />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all main sections', () => {
        render(<SecuritySettings />);
        expect(screen.getByText('change_password_title')).toBeInTheDocument();
        expect(screen.getByText('two_fa_title')).toBeInTheDocument();
        expect(screen.getByText('account_deletion_title')).toBeInTheDocument();
        expect(screen.getByText('security_tips_title')).toBeInTheDocument();
    });

    describe('Change Password validation', () => {
        it('rejects empty current password', async () => {
            render(<SecuritySettings />);
            fireEvent.click(screen.getByText('change_password_button'));
            expect(await screen.findByText('error_current_empty')).toBeInTheDocument();
        });

        it('rejects too‐short new password', async () => {
            render(<SecuritySettings />);
            fireEvent.change(screen.getByPlaceholderText('change_password_current_placeholder'), {
                target: { value: 'oldpass' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_new_placeholder'), {
                target: { value: 'short' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_confirm_placeholder'), {
                target: { value: 'short' },
            });
            fireEvent.click(screen.getByText('change_password_button'));
            expect(await screen.findByText('error_new_length')).toBeInTheDocument();
        });

        it('rejects same‐as‐current when >=8 chars', async () => {
            render(<SecuritySettings />);
            fireEvent.change(screen.getByPlaceholderText('change_password_current_placeholder'), {
                target: { value: 'password1' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_new_placeholder'), {
                target: { value: 'password1' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_confirm_placeholder'), {
                target: { value: 'password1' },
            });
            fireEvent.click(screen.getByText('change_password_button'));
            expect(await screen.findByText('error_new_same')).toBeInTheDocument();
        });

        it('rejects confirmation mismatch', async () => {
            render(<SecuritySettings />);
            fireEvent.change(screen.getByPlaceholderText('change_password_current_placeholder'), {
                target: { value: 'oldpass12' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_new_placeholder'), {
                target: { value: 'Newpass123' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_confirm_placeholder'), {
                target: { value: 'Different1' },
            });
            fireEvent.click(screen.getByText('change_password_button'));
            expect(await screen.findByText('error_confirm_mismatch')).toBeInTheDocument();
        });
    });

    describe('Change Password success & failure', () => {
        it('reauths, updates password & toasts on success', async () => {
            (reauthenticateWithCredential as jest.Mock).mockResolvedValue(undefined);
            (updatePassword as jest.Mock).mockResolvedValue(undefined);

            render(<SecuritySettings />);
            fireEvent.change(screen.getByPlaceholderText('change_password_current_placeholder'), {
                target: { value: 'oldpass12' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_new_placeholder'), {
                target: { value: 'Newpass123' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_confirm_placeholder'), {
                target: { value: 'Newpass123' },
            });
            fireEvent.click(screen.getByText('change_password_button'));

            await waitFor(() => {
                expect(EmailAuthProvider.credential).toHaveBeenCalledWith(fakeUser.email, 'oldpass12');
                expect(reauthenticateWithCredential).toHaveBeenCalledWith(fakeUser, {
                    email: fakeUser.email,
                    pass: 'oldpass12',
                });
                expect(updatePassword).toHaveBeenCalledWith(fakeUser, 'Newpass123');
                expect(toast.success).toHaveBeenCalledWith('password_change_success');

                expect(
                    (screen.getByPlaceholderText('change_password_current_placeholder') as HTMLInputElement).value,
                ).toBe('');
            });
        });

        it('toasts error on reauth failure', async () => {
            (reauthenticateWithCredential as jest.Mock).mockRejectedValue(new Error('bad-creds'));

            render(<SecuritySettings />);
            fireEvent.change(screen.getByPlaceholderText('change_password_current_placeholder'), {
                target: { value: 'wrongpass' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_new_placeholder'), {
                target: { value: 'Newpass123' },
            });
            fireEvent.change(screen.getByPlaceholderText('change_password_confirm_placeholder'), {
                target: { value: 'Newpass123' },
            });
            fireEvent.click(screen.getByText('change_password_button'));

            await waitFor(() => {
                expect(toast.error).toHaveBeenCalledWith('bad-creds');
            });
        });
    });

    describe('Two-Factor toggle', () => {
        it('toggles and toasts', () => {
            render(<SecuritySettings />);
            const btn = screen.getByText('two_fa_enable');
            fireEvent.click(btn);
            expect(toast.info).toHaveBeenCalledWith('two_fa_enable');
            fireEvent.click(screen.getByText('two_fa_disable'));
            expect(toast.info).toHaveBeenCalledWith('two_fa_disable');
        });
    });

    describe('Delete-account modal flow', () => {
        it('opens and cancels', () => {
            render(<SecuritySettings />);
            fireEvent.click(screen.getByText('account_deletion_button'));
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            fireEvent.click(screen.getByText('cancel_button'));
            expect(screen.queryByRole('dialog')).toBeNull();
        });

        it('on confirm reauth+delete+toast+navigate', async () => {
            (reauthenticateWithCredential as jest.Mock).mockResolvedValue(undefined);
            (deleteUser as jest.Mock).mockResolvedValue(undefined);

            render(<SecuritySettings />);
            fireEvent.click(screen.getByText('account_deletion_button'));
            fireEvent.change(screen.getByLabelText('password_label'), {
                target: { value: 'mypwd' },
            });
            fireEvent.click(screen.getByText('confirm_button'));

            await waitFor(() => {
                expect(EmailAuthProvider.credential).toHaveBeenCalledWith(fakeUser.email, 'mypwd');
                expect(reauthenticateWithCredential).toHaveBeenCalledWith(fakeUser, {
                    email: fakeUser.email,
                    pass: 'mypwd',
                });
                expect(deleteUser).toHaveBeenCalledWith(fakeUser);
                expect(toast.success).toHaveBeenCalledWith('delete_success');
                expect(mockNavigate).toHaveBeenCalledWith('/');
            });
        });

        it('toasts error on delete failure', async () => {
            (reauthenticateWithCredential as jest.Mock).mockResolvedValue(undefined);
            (deleteUser as jest.Mock).mockRejectedValue(new Error('del-fail'));

            render(<SecuritySettings />);
            fireEvent.click(screen.getByText('account_deletion_button'));
            fireEvent.change(screen.getByLabelText('password_label'), {
                target: { value: 'pwd' },
            });
            fireEvent.click(screen.getByText('confirm_button'));

            await waitFor(() => {
                expect(toast.error).toHaveBeenCalledWith('del-fail');
            });
        });
    });
});
