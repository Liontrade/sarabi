jest.useRealTimers();

import { render, screen, fireEvent } from '@testing-library/react';
import TrendingStocksSection from '../../../components/HomeDashboardPage/TrendingStocksSection/TrendingStocksSection';

describe('TrendingStocksSection Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        (console.log as jest.Mock).mockRestore();
    });

    it('renders header and refresh button', () => {
        render(<TrendingStocksSection />);

        const header = screen.getByRole('heading', { level: 3, name: /Trending Stocks/i });
        expect(header).toBeInTheDocument();

        const refreshBtn = screen.getByRole('button', { name: /Refresh trending/i });
        expect(refreshBtn).toBeInTheDocument();
    });

    it('clicking refresh logs message', () => {
        render(<TrendingStocksSection />);
        const refreshBtn = screen.getByRole('button', { name: /Refresh trending/i });
        fireEvent.click(refreshBtn);
        expect(console.log).toHaveBeenCalledWith('Refresh trending stocks');
    });

    it('renders all stock cards with correct content', () => {
        render(<TrendingStocksSection />);

        const stocks = [
            { symbol: 'AAPL', change: '+5%' },
            { symbol: 'TSLA', change: '-3%' },
            { symbol: 'AMZN', change: '+2.5%' },
            { symbol: 'GOOGL', change: '+1.2%' },
        ];

        stocks.forEach(({ symbol, change }) => {
            const img = screen.getByAltText(symbol);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src');

            expect(screen.getByText(symbol)).toBeInTheDocument();

            const changeEl = screen.getByText(change);
            expect(changeEl).toBeInTheDocument();
            if (change.startsWith('+')) {
                expect(changeEl).toHaveClass('stock-card__change', 'up');
            } else {
                expect(changeEl).toHaveClass('stock-card__change', 'down');
            }
        });
    });

    it('renders view all trending button', () => {
        render(<TrendingStocksSection />);
        const viewAll = screen.getByRole('button', { name: /View all trending/i });
        expect(viewAll).toBeInTheDocument();
    });

    afterAll(() => {
        jest.useFakeTimers();
    });
});
