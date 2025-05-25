import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const fakeUser = {
    displayName: 'Alice',
    email: 'alice@example.com',
    uid: 'user-123',
};

jest.mock('../../../firebaseConfig', () => ({
    __esModule: true,
    auth: { currentUser: fakeUser },
    db: {}, // dummy Firestore instance
}));

jest.mock('firebase/auth', () => ({
    __esModule: true,
    updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    __esModule: true,
    doc: jest.fn(),
    setDoc: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

import ProfileSettings from '../../../components/Settings/ProfileSettings/ProfileSettings';
import { db } from '../../../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

describe('<ProfileSettings />', () => {
    let consoleErrorSpy: jest.SpyInstance;
    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    const dummyDocRef = { __isDummyRef: true };

    beforeEach(() => {
        jest.clearAllMocks();
        (doc as jest.Mock).mockReturnValue(dummyDocRef);
    });

    it('prefills name and email from currentUser', () => {
        render(<ProfileSettings />);

        const nameInput = screen.getByLabelText('name_label') as HTMLInputElement;
        const emailInput = screen.getByLabelText('email_label') as HTMLInputElement;

        expect(nameInput.value).toBe('Alice');
        expect(emailInput.value).toBe('alice@example.com');
        expect(emailInput).toBeDisabled();
    });

    it('shows required‐name error and blocks save when name is empty', async () => {
        render(<ProfileSettings />);

        fireEvent.change(screen.getByLabelText('name_label'), { target: { value: '' } });
        fireEvent.blur(screen.getByLabelText('name_label'));

        expect(await screen.findByText('name_error_required')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));
        expect(updateProfile).not.toHaveBeenCalled();
        expect(setDoc).not.toHaveBeenCalled();
    });

    it('shows format‐error when name contains invalid characters', async () => {
        render(<ProfileSettings />);

        fireEvent.change(screen.getByLabelText('name_label'), { target: { value: 'Bob123' } });
        fireEvent.blur(screen.getByLabelText('name_label'));

        expect(await screen.findByText('name_error_format')).toBeInTheDocument();
    });

    it('on valid name calls updateProfile, setDoc and toasts success', async () => {
        (updateProfile as jest.Mock).mockResolvedValue(undefined);
        (setDoc as jest.Mock).mockResolvedValue(undefined);

        render(<ProfileSettings />);

        fireEvent.change(screen.getByLabelText('name_label'), {
            target: { value: 'Bob Marley' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));

        await waitFor(() => {
            expect(updateProfile).toHaveBeenCalledWith(fakeUser, {
                displayName: 'Bob Marley',
            });
            expect(doc).toHaveBeenCalledWith(db, 'users', fakeUser.uid);
            expect(setDoc).toHaveBeenCalledWith(dummyDocRef, { name: 'Bob Marley' }, { merge: true });
            expect(toast.success).toHaveBeenCalledWith('save_success');
        });
    });

    it('shows toast.error if updateProfile throws', async () => {
        (updateProfile as jest.Mock).mockRejectedValue(new Error('network-fail'));

        render(<ProfileSettings />);
        fireEvent.change(screen.getByLabelText('name_label'), {
            target: { value: 'Charlie' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('network-fail');
        });
    });
});
