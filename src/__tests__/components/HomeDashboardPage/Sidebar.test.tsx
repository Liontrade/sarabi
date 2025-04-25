import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../components/HomeDashboardPage/Sidebar/Sidebar';

jest.mock('../../../assets/home-page/user-avatar.png', () => 'avatar.png');

describe('Sidebar Component', () => {
    const renderSidebar = (initialPath = '/dashboard') =>
        render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Sidebar />
            </MemoryRouter>,
        );

    it('renders avatar, username, and role when expanded', () => {
        renderSidebar();
        const avatar = screen.getByAltText('Avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'avatar.png');

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Investor')).toBeInTheDocument();
    });

    it('renders section titles and link labels when expanded', () => {
        renderSidebar();

        expect(screen.getByText('Main')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();

        ['Dashboard', 'Knowledge Library', 'Market Summaries', 'News Alerts'].forEach(label => {
            const link = screen.getByRole('link', { name: label });
            expect(link).toBeInTheDocument();
        });

        ['Settings', 'Help & Feedback'].forEach(label => {
            const link = screen.getByRole('link', { name: label });
            expect(link).toBeInTheDocument();
        });
    });

    it('active link has class active based on location', () => {
        renderSidebar('/summaries');
        const activeLink = screen.getByRole('link', { name: 'Market Summaries' });
        expect(activeLink).toHaveClass('active');

        const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
        expect(dashboardLink).not.toHaveClass('active');
    });

    it('toggle collapse hides labels and section titles', () => {
        renderSidebar();
        const toggleBtn = screen.getByRole('button', { name: 'Zwiń' });

        expect(screen.getByText('Main')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();

        fireEvent.click(toggleBtn);

        expect(toggleBtn).toHaveAttribute('aria-label', 'Rozwiń');
        screen.getByRole('complementary');

        const sidebar = document.querySelector('.sidebar')!;
        expect(sidebar).toHaveClass('sidebar--collapsed');

        expect(screen.queryByText('Main')).toBeNull();
        expect(screen.queryByText('Support')).toBeNull();
        expect(screen.queryByText('Dashboard')).toBeNull();
    });

    it('toggle expand shows labels again', () => {
        renderSidebar();
        const toggleBtn = screen.getByRole('button', { name: 'Zwiń' });

        fireEvent.click(toggleBtn);
        fireEvent.click(toggleBtn);

        expect(toggleBtn).toHaveAttribute('aria-label', 'Zwiń');
        expect(screen.getByText('Main')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
});
