import { render, screen, fireEvent } from '@testing-library/react';
import RecommendedSection from '../../../components/HomeDashboardPage/RecommendedSection/RecommendedSection';

describe('RecommendedSection Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        (console.log as jest.Mock).mockRestore();
    });

    it('renders header and refresh button', () => {
        render(<RecommendedSection />);

        const header = screen.getByRole('heading', { level: 3, name: /Recommended for you/i });
        expect(header).toBeInTheDocument();

        const refreshBtn = screen.getByRole('button', { name: /Refresh recommendations/i });
        expect(refreshBtn).toBeInTheDocument();
    });

    it('clicking refresh logs message', () => {
        render(<RecommendedSection />);
        const refreshBtn = screen.getByRole('button', { name: /Refresh recommendations/i });
        fireEvent.click(refreshBtn);
        expect(console.log).toHaveBeenCalledWith('Refresh recommendations');
    });

    it('renders all stock cards with correct content', () => {
        render(<RecommendedSection />);

        const cards = screen.getAllByRole('img'); // using img alt as ticker
        expect(cards).toHaveLength(4);

        const stocks = [
            { ticker: 'TSLA', name: 'Tesla Inc.', price: '$1,200', change: '+3.2%', reason: 'Electric vehicles' },
            { ticker: 'AAPL', name: 'Apple Inc.', price: '$150', change: '+5.0%', reason: 'Smartphones' },
            { ticker: 'AMZN', name: 'Amazon.com Inc.', price: '$3,000', change: '+1.3%', reason: 'E-commerce' },
            { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$2,500', change: '+0.9%', reason: 'Search' },
        ];

        stocks.forEach(stock => {
            const img = screen.getByAltText(stock.ticker);
            expect(img).toBeInTheDocument();

            expect(screen.getByText(stock.ticker)).toBeInTheDocument();
            expect(screen.getByText(stock.name)).toBeInTheDocument();
            expect(screen.getByText(stock.price)).toBeInTheDocument();
            expect(screen.getByText(stock.change)).toBeInTheDocument();
            expect(screen.getByText(stock.reason)).toBeInTheDocument();

            const changeBadge = screen.getByText(stock.change);
            if (stock.change.startsWith('+')) {
                expect(changeBadge).toHaveClass('change-badge', 'up');
            } else {
                expect(changeBadge).toHaveClass('change-badge', 'down');
            }

            const addBtn = screen.getByRole('button', { name: `Add ${stock.ticker}` });
            expect(addBtn).toBeInTheDocument();
        });
    });

    it('clicking add buttons logs appropriate messages', () => {
        render(<RecommendedSection />);

        ['TSLA', 'AAPL', 'AMZN', 'GOOGL'].forEach(ticker => {
            const addBtn = screen.getByRole('button', { name: `Add ${ticker}` });
            fireEvent.click(addBtn);
            expect(console.log).toHaveBeenCalledWith(`Add ${ticker} to watchlist`);
        });
    });

    it('renders view all recommendations button', () => {
        render(<RecommendedSection />);
        const viewAll = screen.getByRole('button', { name: /View all recommendations/i });
        expect(viewAll).toBeInTheDocument();
    });
});
