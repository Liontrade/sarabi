import { render, screen, fireEvent } from '@testing-library/react';
import InterfaceSettings from '../../../components/Settings/InterfaceSettings/InterfaceSettings';
import i18n from 'i18next';
import { toast } from 'react-toastify';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}));

describe('<InterfaceSettings />', () => {
    const initialTheme = 'light';
    const initialLang = 'en';

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('theme', initialTheme);
        localStorage.setItem('language', initialLang);
        document.body.className = '';

        jest.spyOn(i18n, 'changeLanguage').mockResolvedValue({} as unknown as ReturnType<typeof i18n.changeLanguage>);

        (toast.success as jest.Mock).mockClear();
        (toast.error as jest.Mock).mockClear();
        (toast.info as jest.Mock).mockClear();
    });

    it('renders title, no unsaved indicator & buttons disabled when nothing changed', () => {
        render(<InterfaceSettings />);

        expect(screen.getByRole('heading', { level: 2, name: 'title' })).toBeInTheDocument();
        expect(screen.queryByText('unsaved_changes')).toBeNull();

        const saveBtn = screen.getByRole('button', { name: 'save_button' });
        const revertBtn = screen.getByRole('button', { name: 'revert_button' });
        expect(saveBtn).toBeDisabled();
        expect(revertBtn).toBeDisabled();

        expect(document.body.classList.contains('dark')).toBe(false);
        expect(i18n.changeLanguage).toHaveBeenCalledWith(initialLang);
    });

    it('shows unsaved indicator and enables buttons when changing theme or language', () => {
        render(<InterfaceSettings />);

        fireEvent.click(screen.getByRole('button', { name: 'option_dark' }));
        expect(screen.getByText('unsaved_changes')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'save_button' })).toBeEnabled();
        expect(screen.getByRole('button', { name: 'revert_button' })).toBeEnabled();

        fireEvent.click(screen.getByRole('button', { name: 'option_polish' }));
        expect(screen.getByText('unsaved_changes')).toBeInTheDocument();
    });

    it('saves settings when clicking Save', () => {
        render(<InterfaceSettings />);

        fireEvent.click(screen.getByRole('button', { name: 'option_dark' }));
        fireEvent.click(screen.getByRole('button', { name: 'option_polish' }));
        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));

        expect(localStorage.getItem('theme')).toBe('dark');
        expect(localStorage.getItem('language')).toBe('pl');
        expect(document.body.classList.contains('dark')).toBe(true);
        expect(i18n.changeLanguage).toHaveBeenCalledWith('pl');
        expect(toast.success).toHaveBeenCalledWith('save_success');
        expect(screen.queryByText('unsaved_changes')).toBeNull();
        expect(screen.getByRole('button', { name: 'save_button' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'revert_button' })).toBeDisabled();
    });

    it('reverts to stored values when clicking Revert', () => {
        render(<InterfaceSettings />);

        fireEvent.click(screen.getByRole('button', { name: 'option_dark' }));
        fireEvent.click(screen.getByRole('button', { name: 'revert_button' }));

        expect(toast.info).toHaveBeenCalledWith('save_success');
        expect(screen.getByRole('button', { name: 'option_light' })).toHaveClass('active');
        expect(screen.queryByText('unsaved_changes')).toBeNull();
        expect(screen.getByRole('button', { name: 'save_button' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'revert_button' })).toBeDisabled();
    });

    it('shows toast.error if localStorage.setItem throws', () => {
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('fail');
        });

        render(<InterfaceSettings />);

        fireEvent.click(screen.getByRole('button', { name: 'option_dark' }));
        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));

        expect(toast.error).toHaveBeenCalledWith('save_error');
    });
});
