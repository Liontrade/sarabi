import { render, screen } from '@testing-library/react';
import MinimalNavbar from '../../../components/MinimalNavbar/MinimalNavbar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                brand_name: 'LionTrade',
                login_button: 'sign_in',
                signup_button: 'sign_up',
            };
            return map[key] ?? key;
        },
    }),
}));

describe('<MinimalNavbar />', () => {
    it('renders the brand as a button with logo and title', () => {
        render(<MinimalNavbar variant="none" />, { wrapper: MemoryRouter });

        const brandButton = screen.getByRole('button', {
            name: /LionTrade Logo LionTrade/,
        });
        expect(brandButton).toBeInTheDocument();

        expect(screen.getByAltText('LionTrade Logo')).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: 'LionTrade' })).toBeInTheDocument();
    });

    it('does not render any action button when variant="none"', () => {
        render(<MinimalNavbar variant="none" />, { wrapper: MemoryRouter });
        expect(screen.queryByRole('button', { name: 'sign_in' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'sign_up' })).toBeNull();
    });

    it('renders the login button when variant="login"', () => {
        render(<MinimalNavbar variant="login" />, { wrapper: MemoryRouter });
        const loginBtn = screen.getByRole('button', { name: 'sign_in' });
        expect(loginBtn).toBeInTheDocument();
    });

    it('renders the signup button when variant="signup"', () => {
        render(<MinimalNavbar variant="signup" />, { wrapper: MemoryRouter });
        const signupBtn = screen.getByRole('button', { name: 'sign_up' });
        expect(signupBtn).toBeInTheDocument();
    });
});
