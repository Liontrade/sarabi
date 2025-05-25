import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import TrendingStocksSection from '../../../components/HomeDashboardPage/TrendingStocksSection/TrendingStocksSection';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                title: 'Trending Stocks',
                refresh_label: 'Refresh trending',
                loading: 'Loading...',
                error_network: 'Network error',
                view_all: 'View all trending',
            };
            return map[key] ?? key;
        },
    }),
}));

const originalFetch = global.fetch;

beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        value: 1200,
    });
});

afterAll(() => {
    delete (HTMLElement.prototype as unknown as { clientWidth?: number }).clientWidth;
});

describe('TrendingStocksSection Component', () => {
    const mockStocks = [
        { ticker: 'AAPL', full_name: 'Apple Inc.', price: 150, change_percent: 5 },
        { ticker: 'TSLA', full_name: 'Tesla Inc.', price: 1200, change_percent: -3 },
        { ticker: 'AMZN', full_name: 'Amazon.com Inc.', price: 3000, change_percent: 2.5 },
        { ticker: 'GOOGL', full_name: 'Alphabet Inc.', price: 2500, change_percent: 1.2 },
    ];

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockStocks,
        } as unknown as Response);
    });

    afterEach(() => {
        (console.log as jest.Mock).mockRestore();
        global.fetch = originalFetch;
    });

    it('renders header and refresh button', async () => {
        render(<TrendingStocksSection />);

        expect(screen.getByRole('heading', { level: 3, name: /Trending Stocks/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Refresh trending/i })).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('clicking refresh calls fetch again', async () => {
        render(<TrendingStocksSection />);
        const refreshBtn = screen.getByRole('button', { name: /Refresh trending/i });

        fireEvent.click(refreshBtn);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/trending');

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('renders all stock cards with correct content', async () => {
        render(<TrendingStocksSection />);
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        mockStocks.forEach(({ ticker, full_name, price, change_percent }) => {
            expect(screen.getByText(ticker)).toBeInTheDocument();
            expect(screen.getByText(full_name)).toBeInTheDocument();

            const priceText = `${price.toFixed(2)} PLN`;
            expect(screen.getByText(priceText)).toBeInTheDocument();

            const changeText = `${change_percent >= 0 ? '+' : '-'}${Math.abs(change_percent).toFixed(2)}%`;
            const changeEl = screen.getByText(changeText);
            expect(changeEl).toBeInTheDocument();
            expect(changeEl).toHaveClass('change-badge');
            if (change_percent >= 0) {
                expect(changeEl).toHaveClass('up');
            } else {
                expect(changeEl).toHaveClass('down');
            }
        });
    });

    it('renders view all trending button', async () => {
        render(<TrendingStocksSection />);
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        const viewAll = screen.getByRole('button', { name: /View all trending/i });
        expect(viewAll).toBeInTheDocument();
        expect(viewAll).toHaveClass('view-all-btn');
    });
});
