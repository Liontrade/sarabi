import React from 'react';
import './MarketFilterBar.css';

type FilterKey = 'all' | 'popular' | 'recent' | 'gainers' | 'losers';

interface MarketFilterBarProps {
    activeFilter: FilterKey;
    onFilterChange: (filter: FilterKey) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const tabs: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'popular', label: 'Most Popular' },
    { key: 'recent', label: 'Recently Viewed' },
    { key: 'gainers', label: 'Top Gainers' },
    { key: 'losers', label: 'Top Losers' },
];

const MarketFilterBar: React.FC<MarketFilterBarProps> = ({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}) => (
    <div className="market-filter-bar">
        <div className="market-filter-bar__tabs">
            {tabs.map(({ key, label }) => (
                <button
                    key={key}
                    className={`tab ${activeFilter === key ? 'tab--active' : ''}`}
                    onClick={() => onFilterChange(key)}
                >
                    {label}
                </button>
            ))}
        </div>
        <div className="market-filter-bar__search">
            <input
                type="text"
                placeholder="Search by name or ticker…"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
            />
        </div>
    </div>
);

export default MarketFilterBar;
