import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/HomeDashboardPage/Navbar/Navbar';
import { within } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        NavLink: ({
            to,
            children,
            className,
            onClick,
        }: {
            to: string;
            children: React.ReactNode;
            className?: string | ((props: { isActive: boolean }) => string);
            onClick?: () => void;
        }) => {
            const resolvedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
            return (
                <a href={to} className={resolvedClassName} onClick={onClick}>
                    {children}
                </a>
            );
        },
    };
});

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
        const logo = screen.getByAltText('LionTrade');
        expect(logo).toBeInTheDocument();

        const title = screen.getByText('LionTrade');
        fireEvent.click(title);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('toggles mobile menu open and close', () => {
        const { container } = renderNavbar();
        const toggleBtn = container.querySelector('.navbar__mobile-toggle')!;
        const center = container.querySelector('.navbar__center')!;

        fireEvent.click(toggleBtn);
        expect(center).toHaveClass('open');
        fireEvent.click(toggleBtn);
        expect(center).not.toHaveClass('open');
    });

    it('renders nav links and closes mobile menu on click', () => {
        const { container } = renderNavbar();
        const toggleBtn = container.querySelector('.navbar__mobile-toggle')!;
        const center = container.querySelector('.navbar__center')!;

        fireEvent.click(toggleBtn);
        expect(center).toHaveClass('open');

        const link = screen.getByText('Dashboard');
        fireEvent.click(link);
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
        const { container } = renderNavbar();
        const [notifBtn] = Array.from(container.getElementsByClassName('navbar__icon-btn')) as HTMLElement[];
        fireEvent.click(notifBtn);
        expect(console.log).toHaveBeenCalledWith('Notifications');
    });

    it('theme toggle toggles dark mode and body class', () => {
        const { container } = renderNavbar();
        const buttons = Array.from(container.getElementsByClassName('navbar__icon-btn')) as HTMLElement[];
        const themeBtn = buttons[1]; // second icon button

        expect(document.body).not.toHaveClass('dark');

        fireEvent.click(themeBtn);
        expect(document.body).toHaveClass('dark');

        fireEvent.click(themeBtn);
        expect(document.body).not.toHaveClass('dark');
    });

    it('navigates to Profile when Profile button is clicked', () => {
        const { container } = renderNavbar();

        const profileDiv = container.querySelector('.navbar__profile')!;
        fireEvent.click(profileDiv);

        const dropdown = container.querySelector('.navbar__dropdown');
        expect(dropdown).toBeInTheDocument();

        const dropdownContent = within(dropdown as HTMLElement);
        const profileButton = dropdownContent.getByText('Profile');

        fireEvent.click(profileButton);
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    it('navigates to Settings when Settings button is clicked', () => {
        const { container } = renderNavbar();

        const profileDiv = container.querySelector('.navbar__profile')!;
        fireEvent.click(profileDiv);

        const dropdown = container.querySelector('.navbar__dropdown');
        expect(dropdown).toBeInTheDocument();

        const dropdownContent = within(dropdown as HTMLElement);
        const settingsButton = dropdownContent.getByText('Settings');

        fireEvent.click(settingsButton);
        expect(mockNavigate).toHaveBeenCalledWith('/settings');
    });

    it('navigates to Logout when Logout button is clicked', () => {
        const { container } = renderNavbar();

        const profileDiv = container.querySelector('.navbar__profile')!;
        fireEvent.click(profileDiv);

        const dropdown = container.querySelector('.navbar__dropdown');
        expect(dropdown).toBeInTheDocument();

        const dropdownContent = within(dropdown as HTMLElement);
        const logoutButton = dropdownContent.getByText('Logout');

        fireEvent.click(logoutButton);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
