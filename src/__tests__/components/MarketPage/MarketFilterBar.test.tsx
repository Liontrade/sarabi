import { render, screen, fireEvent } from '@testing-library/react';
import MarketFilterBar from '../../../components/Market/MarketFilterBar/MarketFilterBar';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('MarketFilterBar', () => {
    const FILTER_KEYS = ['all', 'popular', 'recent', 'gainers', 'losers'] as const;

    let onFilterChange: jest.Mock;
    let onSearchChange: jest.Mock;

    beforeEach(() => {
        onFilterChange = jest.fn();
        onSearchChange = jest.fn();
    });

    it('renders a button for each filter key and highlights the active one', () => {
        render(
            <MarketFilterBar
                activeFilter="recent"
                onFilterChange={onFilterChange}
                searchQuery=""
                onSearchChange={onSearchChange}
            />,
        );

        FILTER_KEYS.forEach(key => {
            const btn = screen.getByRole('button', { name: `filter_${key}` });
            expect(btn).toBeInTheDocument();
            if (key === 'recent') {
                expect(btn).toHaveClass('active');
            } else {
                expect(btn).not.toHaveClass('active');
            }
        });
    });

    it('calls onFilterChange with the correct key when a tab is clicked', () => {
        render(
            <MarketFilterBar
                activeFilter="all"
                onFilterChange={onFilterChange}
                searchQuery=""
                onSearchChange={onSearchChange}
            />,
        );

        const popularBtn = screen.getByRole('button', { name: 'filter_popular' });
        fireEvent.click(popularBtn);
        expect(onFilterChange).toHaveBeenCalledTimes(1);
        expect(onFilterChange).toHaveBeenCalledWith('popular');

        const losersBtn = screen.getByRole('button', { name: 'filter_losers' });
        fireEvent.click(losersBtn);
        expect(onFilterChange).toHaveBeenCalledWith('losers');
    });

    it('renders the search input with the correct placeholder and value', () => {
        render(
            <MarketFilterBar
                activeFilter="all"
                onFilterChange={onFilterChange}
                searchQuery="foo"
                onSearchChange={onSearchChange}
            />,
        );

        const input = screen.getByPlaceholderText('search_placeholder') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('foo');
    });

    it('calls onSearchChange when the search input changes', () => {
        render(
            <MarketFilterBar
                activeFilter="all"
                onFilterChange={onFilterChange}
                searchQuery=""
                onSearchChange={onSearchChange}
            />,
        );

        const input = screen.getByPlaceholderText('search_placeholder');
        fireEvent.change(input, { target: { value: 'bar' } });
        expect(onSearchChange).toHaveBeenCalledTimes(1);
        expect(onSearchChange).toHaveBeenCalledWith('bar');
    });
});
