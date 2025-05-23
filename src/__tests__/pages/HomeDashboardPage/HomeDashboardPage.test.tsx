import { render, screen, within } from '@testing-library/react';
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
    beforeEach(() => {
        render(
            <MemoryRouter>
                <HomeDashboardPage />
            </MemoryRouter>,
        );
    });

    it('renders Navbar and Sidebar', () => {
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('renders main content area with all sections', () => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass('dashboard-page__content');

        ['onboarding', 'recommended', 'trending', 'hotnews'].forEach(id => {
            expect(within(main).getByTestId(id)).toBeInTheDocument();
        });
    });

    it('renders Footer', () => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
