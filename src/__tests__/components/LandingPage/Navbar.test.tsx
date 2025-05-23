import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/LandingPage/Navbar/Navbar';
import { NAV_LINKS, ACTION_BUTTONS } from '../../../constants/LandingPage/constants_navbar';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('../../../assets/logo_without_background.png', () => 'logo.png');

describe('Navbar component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );
    });

    test('renders logo image and brand name', () => {
        const logoImg = screen.getByAltText('brand_name Logo');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveClass('navbar__logo-img');

        const brandHeading = screen.getByRole('heading', { level: 1, name: 'brand_name' });
        expect(brandHeading).toBeInTheDocument();
        expect(brandHeading).toHaveClass('navbar__brand');
    });

    test('renders nav links but not active by default', () => {
        const ul = screen.getByRole('list');
        expect(ul).toBeInTheDocument();
        expect(ul).toHaveClass('navbar__links');
        expect(ul).not.toHaveClass('navbar__links--active');

        NAV_LINKS.forEach(link => {
            const linkEl = screen.getByRole('link', { name: link.key });
            expect(linkEl).toBeInTheDocument();
            expect(linkEl).toHaveAttribute('href', link.href);
        });
    });

    test('toggles menu open and close', () => {
        const toggleBtn = screen.getByRole('button');
        const ul = screen.getByRole('list');

        expect(ul).not.toHaveClass('navbar__links--active');

        fireEvent.click(toggleBtn);
        expect(ul).toHaveClass('navbar__links--active');

        fireEvent.click(toggleBtn);
        expect(ul).not.toHaveClass('navbar__links--active');
    });

    test('renders action buttons with correct links', () => {
        ACTION_BUTTONS.forEach(btn => {
            const actionLink = screen.getByRole('link', { name: btn.key });
            expect(actionLink).toBeInTheDocument();
            expect(actionLink).toHaveAttribute('href', btn.to);
            expect(actionLink).toHaveClass(`btn btn--${btn.variant}`);
        });
    });
});
