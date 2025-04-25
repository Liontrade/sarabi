jest.useRealTimers();

import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../../components/HomeDashboardPage/Footer/Footer';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../assets/logo_without_background.png', () => 'logo.png');

describe('Footer Component', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    it('renders logo and description', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const logo = screen.getByAltText('LionTrade');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'logo.png');

        const description = screen.getByText(/LionTrade – Twój przewodnik po świecie akcji/i);
        expect(description).toBeInTheDocument();
    });

    it('renders navigation links in Explore section', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const exploreLinks = [
            { text: 'Dashboard', href: '/dashboard' },
            { text: 'Market', href: '/market' },
            { text: 'Knowledge Library', href: '/knowledge' },
            { text: 'News Alerts', href: '/news-alerts' },
        ];

        exploreLinks.forEach(({ text, href }) => {
            const link = screen.getByRole('link', { name: text });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', href);
        });
    });

    it('renders support links and social icons', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const supportLinks = [
            { text: 'Help Center', href: '/help-center' },
            { text: 'Security', href: '/security' },
            { text: 'Privacy', href: '/privacy' },
            { text: 'Terms', href: '/terms' },
            { text: 'Careers', href: '/careers' },
        ];

        supportLinks.forEach(({ text, href }) => {
            const link = screen.getByRole('link', { name: text });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', href);
        });

        const socialIcons = [
            { label: 'Twitter', href: 'https://twitter.com' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
        ];

        socialIcons.forEach(({ label, href }) => {
            const iconLink = screen.getByRole('link', { name: label });
            expect(iconLink).toBeInTheDocument();
            expect(iconLink).toHaveAttribute('href', href);
        });
    });

    it('newsletter subscription clears input and logs email', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const input = screen.getByPlaceholderText('Your email');
        const button = screen.getByRole('button', { name: /subscribe/i });

        fireEvent.change(input, { target: { value: 'it@example.com' } });
        expect((input as HTMLInputElement).value).toBe('it@example.com');

        fireEvent.click(button);

        expect(consoleSpy).toHaveBeenCalledWith('Subscribe email:', 'it@example.com');
        expect((input as HTMLInputElement).value).toBe('');

        consoleSpy.mockRestore();
    });

    it('back-to-top button scrolls to top', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const backToTop = screen.getByRole('button', { name: /back to top/i });
        fireEvent.click(backToTop);

        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('displays current year in copyright', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const year = new Date().getFullYear().toString();
        const copyrightText = screen.getByText(new RegExp(`© ${year} LionTrade`, 'i'));
        expect(copyrightText).toBeInTheDocument();
    });

    afterAll(() => {
        jest.useFakeTimers();
    });
});
