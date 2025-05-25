import { render, screen, fireEvent } from '@testing-library/react';
import DeleteAccountModal from '../../../components/Settings/DeleteAccountModal/DeleteAccountModal';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('<DeleteAccountModal />', () => {
    let onConfirm: jest.Mock;
    let onCancel: jest.Mock;

    beforeEach(() => {
        onConfirm = jest.fn();
        onCancel = jest.fn();
        render(<DeleteAccountModal onConfirm={onConfirm} onCancel={onCancel} />);
    });

    it('renders as a dialog with title and warning', () => {
        const dialog = screen.getByRole('dialog', { hidden: false });
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');

        const heading = screen.getByRole('heading', { level: 3, name: 'delete_account_title' });
        expect(heading).toBeInTheDocument();

        expect(screen.getByText('delete_account_warning')).toBeInTheDocument();
    });

    it('has a password input, show/hide toggle, and two buttons', () => {
        const input = screen.getByLabelText('password_label') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.type).toBe('password');
        expect(input).toHaveFocus(); // autoFocus

        const eyeToggle = screen.getByRole('button', { name: 'Show password' });
        expect(eyeToggle).toBeInTheDocument();

        const cancelBtn = screen.getByRole('button', { name: 'cancel_button' });
        const confirmBtn = screen.getByRole('button', { name: 'confirm_button' });
        expect(cancelBtn).toBeInTheDocument();
        expect(confirmBtn).toBeInTheDocument();

        expect(confirmBtn).toBeDisabled();
    });

    it('enables confirm only when password is non‐empty', () => {
        const input = screen.getByLabelText('password_label') as HTMLInputElement;
        const confirmBtn = screen.getByRole('button', { name: 'confirm_button' });

        fireEvent.change(input, { target: { value: '   ' } });
        expect(confirmBtn).toBeDisabled();

        fireEvent.change(input, { target: { value: 'secret' } });
        expect(confirmBtn).toBeEnabled();
    });

    it('toggles input type and aria‐label on eye button click', () => {
        const input = screen.getByLabelText('password_label') as HTMLInputElement;
        const eyeToggle = screen.getByRole('button', { name: 'Show password' });

        fireEvent.click(eyeToggle);
        expect(input.type).toBe('text');
        expect(eyeToggle).toHaveAttribute('aria-label', 'Hide password');

        fireEvent.click(eyeToggle);
        expect(input.type).toBe('password');
        expect(eyeToggle).toHaveAttribute('aria-label', 'Show password');
    });

    it('calls onCancel when cancel button clicked', () => {
        const cancelBtn = screen.getByRole('button', { name: 'cancel_button' });
        fireEvent.click(cancelBtn);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm with the entered password', () => {
        const input = screen.getByLabelText('password_label') as HTMLInputElement;
        const confirmBtn = screen.getByRole('button', { name: 'confirm_button' });

        fireEvent.change(input, { target: { value: 'p@ssw0rd' } });
        fireEvent.click(confirmBtn);

        expect(onConfirm).toHaveBeenCalledWith('p@ssw0rd');
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });
});
