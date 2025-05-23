import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MarketList from '../../../components/Market/MarketList/MarketList';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mockData = [
    {
        ticker: 'AAA',
        full_name: 'Company A',
        price: 100,
        change: 5,
        change_percent: 5,
        open: 95,
        high: 110,
        low: 90,
    },
    {
        ticker: 'BBB',
        full_name: 'Company B',
        price: 200,
        change: -10,
        change_percent: -5,
        open: 210,
        high: 220,
        low: 180,
    },
    {
        ticker: 'CCC',
        full_name: 'Company C',
        price: 150,
        change: 0,
        change_percent: 0,
        open: 150,
        high: 155,
        low: 145,
    },
];

beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
    });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('MarketList', () => {
    it('shows loading, then renders table headers and rows for filter="all"', async () => {
        const { container } = render(<MarketList filter="all" searchQuery="" />);

        expect(screen.getByText('loading')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('loading')).toBeNull();
        });

        expect(screen.getByText('header.ticker')).toBeInTheDocument();
        expect(screen.getByText('header.full_name')).toBeInTheDocument();

        const bodyRows = container.querySelectorAll('tbody tr');
        expect(bodyRows).toHaveLength(mockData.length);

        const firstTickerCell = container.querySelector('tbody tr td.ticker-cell')!;
        expect(firstTickerCell).toHaveTextContent('AAA');
    });

    it('only shows gainers when filter="gainers"', async () => {
        const { container } = render(<MarketList filter="gainers" searchQuery="" />);
        await waitFor(() => {
            expect(screen.queryByText('loading')).toBeNull();
        });

        const rows = container.querySelectorAll('tbody tr');

        expect(rows).toHaveLength(1);
        expect(rows[0].querySelector('td.ticker-cell')).toHaveTextContent('AAA');
    });

    it('only shows losers when filter="losers"', async () => {
        const { container } = render(<MarketList filter="losers" searchQuery="" />);
        await waitFor(() => {
            expect(screen.queryByText('loading')).toBeNull();
        });

        const rows = container.querySelectorAll('tbody tr');

        expect(rows).toHaveLength(1);
        expect(rows[0].querySelector('td.ticker-cell')).toHaveTextContent('BBB');
    });

    it('filters by searchQuery (case‐insensitive, matches ticker or name)', async () => {
        const { container, rerender } = render(<MarketList filter="all" searchQuery="CoMpAnY" />);

        await waitFor(() => {
            expect(container.querySelectorAll('tbody tr')).toHaveLength(3);
        });

        rerender(<MarketList filter="all" searchQuery="bbb" />);
        await waitFor(() => {
            const rows = container.querySelectorAll('tbody tr');
            expect(rows).toHaveLength(1);
            expect(rows[0].querySelector('td.ticker-cell')).toHaveTextContent('BBB');
        });
    });

    it('sorts when clicking on a column header (ticker asc/desc)', async () => {
        const { container } = render(<MarketList filter="all" searchQuery="" />);
        await waitFor(() => {
            expect(screen.queryByText('loading')).toBeNull();
        });

        const tickerHeader = await screen.findByText('header.ticker');
        fireEvent.click(tickerHeader);

        await waitFor(() => {
            const tickers = Array.from(container.querySelectorAll('td.ticker-cell')).map(td => td.textContent);
            expect(tickers).toEqual(['AAA', 'BBB', 'CCC']);
        });

        fireEvent.click(tickerHeader);
        await waitFor(() => {
            const tickers = Array.from(container.querySelectorAll('td.ticker-cell')).map(td => td.textContent);
            expect(tickers).toEqual(['CCC', 'BBB', 'AAA']);
        });
    });
});
