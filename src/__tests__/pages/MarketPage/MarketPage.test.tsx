import { render, screen, fireEvent } from '@testing-library/react';
import MarketPage from '../../../pages/MarketPage/MarketPage';
import type { FilterKey } from '../../../components/Market/MarketFilterBar/MarketFilterBar';

jest.mock('../../../components/HomeDashboardPage/Navbar/Navbar', () => ({
    __esModule: true,
    default: () => <nav data-testid="navbar" />,
}));

jest.mock('../../../components/HomeDashboardPage/Footer/Footer', () => ({
    __esModule: true,
    default: () => <footer data-testid="footer" />,
}));

interface MarketFilterBarProps {
    activeFilter: FilterKey;
    onFilterChange: (filter: FilterKey) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

jest.mock('../../../components/Market/MarketFilterBar/MarketFilterBar', () => ({
    __esModule: true,
    default: (props: MarketFilterBarProps) => {
        const { activeFilter, onFilterChange, searchQuery, onSearchChange } = props;
        return (
            <div>
                <div data-testid="filter">{activeFilter}</div>
                <button data-testid="filter-btn" onClick={() => onFilterChange('gainers')}>
                    Gain
                </button>
                <div data-testid="search">{searchQuery}</div>
                <button data-testid="search-btn" onClick={() => onSearchChange('foo')}>
                    Search
                </button>
            </div>
        );
    },
}));

interface MarketListProps {
    filter: FilterKey;
    searchQuery: string;
}

jest.mock('../../../components/Market/MarketList/MarketList', () => ({
    __esModule: true,
    default: (props: MarketListProps) => {
        const { filter, searchQuery } = props;
        return (
            <div data-testid="list">
                {filter}-{searchQuery}
            </div>
        );
    },
}));

describe('<MarketPage />', () => {
    it('renders Navbar and Footer', () => {
        render(<MarketPage />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('starts with all/"" and updates both filter bar and list when buttons clicked', () => {
        render(<MarketPage />);

        expect(screen.getByTestId('filter')).toHaveTextContent('all');
        expect(screen.getByTestId('search')).toHaveTextContent('');
        expect(screen.getByTestId('list')).toHaveTextContent('all-');

        fireEvent.click(screen.getByTestId('filter-btn'));
        expect(screen.getByTestId('filter')).toHaveTextContent('gainers');
        expect(screen.getByTestId('list')).toHaveTextContent('gainers-');

        fireEvent.click(screen.getByTestId('search-btn'));
        expect(screen.getByTestId('search')).toHaveTextContent('foo');
        expect(screen.getByTestId('list')).toHaveTextContent('gainers-foo');
    });
});
