/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/HomeDashboardPage/Navbar/Navbar';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        NavLink: function NavLink({
            to,
            children,
            className,
            onClick,
        }: {
            to: string;
            children: React.ReactNode;
            className?: string | ((args: { isActive: boolean }) => string);
            onClick?: React.MouseEventHandler<HTMLAnchorElement>;
        }) {
            const resolvedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
            return (
                <a href={to} className={resolvedClassName} onClick={onClick}>
                    {children}
                </a>
            );
        },
    };
});

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                dashboard_label: 'Dashboard',
                knowledge_label: 'Knowledge',
                market_label: 'Market',
                news_alerts_label: 'News Alerts',
                brand_name: 'LionTrade',
                search_placeholder: 'Search stocks, news...',
                notifications_aria: 'Notifications',
                dark_mode_off: 'Dark mode off',
                dark_mode_on: 'Dark mode on',
                mobile_open: 'Open menu',
                mobile_close: 'Close menu',
                profile_label: 'Profile',
                settings_label: 'Settings',
                logout_label: 'Logout',
            };
            return map[key] ?? key;
        },
    }),
}));

jest.mock('../../../assets/logo_without_background.png', () => 'logo.png');
jest.mock('../../../assets/home-page/user-avatar.png', () => 'avatar.png');

describe('Navbar Component', () => {
    beforeEach(() => {
        mockNavigate.mockReset();
        document.body.className = '';
        console.log = jest.fn();
    });

    const renderNavbar = () =>
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

    it('renders brand logo and title, navigates on click', () => {
        renderNavbar();

        const logo = screen.getByAltText('Dashboard logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass('navbar__logo');

        const title = screen.getByText('LionTrade');
        expect(title).toBeInTheDocument();
        fireEvent.click(title);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('toggles mobile menu open and close', () => {
        renderNavbar();
        const toggleBtn = screen.getByRole('button', { name: 'Open menu' });
        const center = document.querySelector('.navbar__center')!;

        fireEvent.click(toggleBtn);
        expect(center).toHaveClass('open');
        expect(toggleBtn).toHaveAttribute('aria-label', 'Close menu');

        fireEvent.click(toggleBtn);
        expect(center).not.toHaveClass('open');
        expect(toggleBtn).toHaveAttribute('aria-label', 'Open menu');
    });

    it('renders nav links and closes mobile menu on click', () => {
        renderNavbar();

        const toggleBtn = screen.getByRole('button', { name: 'Open menu' });
        fireEvent.click(toggleBtn);
        const center = document.querySelector('.navbar__center')!;
        expect(center).toHaveClass('open');

        const dashLink = screen.getByRole('link', { name: 'Dashboard' });
        fireEvent.click(dashLink);
        expect(center).not.toHaveClass('open');
    });

    it('search input logs on Enter key', () => {
        renderNavbar();
        const input = screen.getByPlaceholderText('Search stocks, news...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'AAPL' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(console.log).toHaveBeenCalledWith('Search:', 'AAPL');
    });

    it('notifications button logs message', () => {
        renderNavbar();
        const notifBtn = screen.getByRole('button', { name: 'Notifications' });
        fireEvent.click(notifBtn);
        expect(console.log).toHaveBeenCalledWith('Notifications');
    });

    it('theme toggle toggles dark mode and body class', () => {
        renderNavbar();
        const themeBtn = screen.getByRole('button', { name: 'Dark mode off' });
        expect(document.body).not.toHaveClass('dark');

        fireEvent.click(themeBtn);
        expect(document.body).toHaveClass('dark');
        expect(themeBtn).toHaveAttribute('aria-label', 'Dark mode on');

        fireEvent.click(themeBtn);
        expect(document.body).not.toHaveClass('dark');
        expect(themeBtn).toHaveAttribute('aria-label', 'Dark mode off');
    });

    it('opens profile dropdown and navigates to Profile', () => {
        renderNavbar();

        const avatarImg = screen.getByAltText('Profile');
        fireEvent.click(avatarImg);

        const dropdown = document.querySelector('.navbar__dropdown') as HTMLElement;
        expect(dropdown).toBeInTheDocument();

        const profileBtn = within(dropdown).getByRole('button', { name: 'Profile' });
        fireEvent.click(profileBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    it('navigates to Settings from dropdown', () => {
        renderNavbar();
        fireEvent.click(screen.getByAltText('Profile'));
        const dropdown = document.querySelector('.navbar__dropdown') as HTMLElement;

        const settingsBtn = within(dropdown).getByRole('button', { name: 'Settings' });
        fireEvent.click(settingsBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/settings');
    });

    it('navigates to Logout from dropdown', () => {
        renderNavbar();
        fireEvent.click(screen.getByAltText('Profile'));
        const dropdown = document.querySelector('.navbar__dropdown') as HTMLElement;

        const logoutBtn = within(dropdown).getByRole('button', { name: 'Logout' });
        fireEvent.click(logoutBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
