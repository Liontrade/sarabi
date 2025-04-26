import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeDashboardPage from '../../../pages/HomeDashboardPage/HomeDashboardPage';

jest.mock('../../../components/HomeDashboardPage/Navbar/Navbar', () => {
    const MockNavbar = () => <div data-testid="navbar" />;
    MockNavbar.displayName = 'MockNavbar';
    return MockNavbar;
});

jest.mock('../../../components/HomeDashboardPage/Sidebar/Sidebar', () => {
    const MockSidebar = () => <div data-testid="sidebar" />;
    MockSidebar.displayName = 'MockSidebar';
    return MockSidebar;
});

jest.mock('../../../components/HomeDashboardPage/RecommendedSection/RecommendedSection', () => {
    const MockRecommended = () => <div data-testid="recommended" />;
    MockRecommended.displayName = 'MockRecommended';
    return MockRecommended;
});

jest.mock('../../../components/HomeDashboardPage/OnBoardingSection/OnBoardingSection', () => {
    const MockOnboarding = () => <div data-testid="onboarding" />;
    MockOnboarding.displayName = 'MockOnboarding';
    return MockOnboarding;
});

jest.mock('../../../components/HomeDashboardPage/TrendingStocksSection/TrendingStocksSection', () => {
    const MockTrending = () => <div data-testid="trending" />;
    MockTrending.displayName = 'MockTrending';
    return MockTrending;
});

jest.mock('../../../components/HomeDashboardPage/HotNewsSection/HotNewsSection', () => {
    const MockHotNews = () => <div data-testid="hotnews" />;
    MockHotNews.displayName = 'MockHotNews';
    return MockHotNews;
});

jest.mock('../../../components/HomeDashboardPage/Footer/Footer', () => {
    const MockFooter = () => <div data-testid="footer" />;
    MockFooter.displayName = 'MockFooter';
    return MockFooter;
});

describe('HomeDashboardPage', () => {
    it('renders layout with Navbar, Sidebar, and main content sections', () => {
        render(
            <MemoryRouter>
                <HomeDashboardPage />
            </MemoryRouter>,
        );

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();

        const title = screen.getByRole('heading', { level: 2, name: 'Dashboard' });
        expect(title).toBeInTheDocument();

        expect(screen.getByTestId('onboarding')).toBeInTheDocument();
        expect(screen.getByTestId('recommended')).toBeInTheDocument();
        expect(screen.getByTestId('trending')).toBeInTheDocument();
        expect(screen.getByTestId('hotnews')).toBeInTheDocument();

        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
