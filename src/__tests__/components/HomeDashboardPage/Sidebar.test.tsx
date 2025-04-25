import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../components/HomeDashboardPage/Sidebar/Sidebar';

jest.mock('../../../firebaseConfig', () => ({
    auth: { currentUser: { displayName: 'Jane Smith' } },
}));

jest.mock('../../../assets/home-page/user-avatar.png', () => 'avatar.png');

describe('Sidebar Component', () => {
    const renderSidebar = (initialPath = '/dashboard') =>
        render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Sidebar />
            </MemoryRouter>,
        );

    it('renders avatar, username and role when expanded', () => {
        renderSidebar();
        expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'avatar.png');
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Investor')).toBeInTheDocument();
    });

    it('renders section titles and link labels when expanded', () => {
        renderSidebar();
        expect(screen.getByText('Main')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();

        ['Dashboard', 'Knowledge Library', 'Market', 'News Alerts'].forEach(label => {
            expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
        });
    });

    it('active link has class active based on location', () => {
        renderSidebar('/market');
        expect(screen.getByRole('link', { name: 'Market' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('active');
    });

    it('toggle collapse hides labels and section titles', () => {
        renderSidebar();
        const toggleBtn = screen.getByRole('button', { name: 'Collapse' });
        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveAttribute('aria-label', 'Expand');
        expect(document.querySelector('.sidebar')).toHaveClass('sidebar--collapsed');
        expect(screen.queryByText('Main')).toBeNull();
        expect(screen.queryByText('Dashboard')).toBeNull();
    });

    it('toggle expand shows labels again', () => {
        renderSidebar();
        const toggleBtn = screen.getByRole('button', { name: 'Collapse' });
        fireEvent.click(toggleBtn); // collapse
        fireEvent.click(toggleBtn); // expand
        expect(toggleBtn).toHaveAttribute('aria-label', 'Collapse');
        expect(screen.getByText('Main')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
});
