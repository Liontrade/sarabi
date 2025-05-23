import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../../components/HomeDashboardPage/Footer/Footer';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../assets/logo_without_background.png', () => 'logo.png');

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                desc: 'LionTrade – Twój przewodnik po świecie akcji',
                newsletter_label: 'Zapisz się do newslettera',
                newsletter_placeholder: 'Your email',
                subscribe_button: 'Subscribe',
                explore_title: 'Explore',
                link_dashboard: 'Dashboard',
                link_market: 'Market',
                link_knowledge: 'Knowledge Library',
                link_news_alerts: 'News Alerts',
                support_title: 'Support',
                link_help_center: 'Help Center',
                link_security: 'Security',
                link_privacy: 'Privacy',
                link_terms: 'Terms',
                link_careers: 'Careers',
                copyright: 'All rights reserved.',
                back_to_top_aria: 'Back to top',
            };
            return translations[key] || key;
        },
    }),
}));

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

        expect(screen.getByText('LionTrade – Twój przewodnik po świecie akcji')).toBeInTheDocument();
    });

    it('renders navigation links in Explore section', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        [
            { text: 'Dashboard', href: '/dashboard' },
            { text: 'Market', href: '/market' },
            { text: 'Knowledge Library', href: '/knowledge' },
            { text: 'News Alerts', href: '/news-alerts' },
        ].forEach(({ text, href }) => {
            const link = screen.getByRole('link', { name: text });
            expect(link).toHaveAttribute('href', href);
        });
    });

    it('renders support links and social icons', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        [
            { text: 'Help Center', href: '/help-center' },
            { text: 'Security', href: '/security' },
            { text: 'Privacy', href: '/privacy' },
            { text: 'Terms', href: '/terms' },
            { text: 'Careers', href: '/careers' },
        ].forEach(({ text, href }) => {
            const link = screen.getByRole('link', { name: text });
            expect(link).toHaveAttribute('href', href);
        });

        [
            { label: 'Twitter', href: 'https://twitter.com' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
        ].forEach(({ label, href }) => {
            const iconLink = screen.getByRole('link', { name: label });
            expect(iconLink).toHaveAttribute('href', href);
        });
    });

    it('newsletter form is accessible and clears input on submit', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const input = screen.getByLabelText('Zapisz się do newslettera') as HTMLInputElement;
        expect(input.id).toBe('newsletter-email');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toBeRequired();

        const button = screen.getByRole('button', { name: 'Subscribe' });

        fireEvent.change(input, { target: { value: 'it@example.com' } });
        expect(input.value).toBe('it@example.com');

        fireEvent.click(button);
        expect(consoleSpy).toHaveBeenCalledWith('Subscribe email:', 'it@example.com');
        expect(input.value).toBe('');

        consoleSpy.mockRestore();
    });

    it('back-to-top button scrolls to top', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const backToTop = screen.getByRole('button', { name: 'Back to top' });
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
        expect(screen.getByText(new RegExp(`© ${year} LionTrade`, 'i'))).toBeInTheDocument();
    });
});
