import React from 'react';
import './MarketFilterBar.css';

interface MarketFilterBarProps {
    activeFilter: 'all' | 'popular' | 'recent' | 'gainers' | 'losers';
    onFilterChange: (filter: 'all' | 'popular' | 'recent' | 'gainers' | 'losers') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const MarketFilterBar: React.FC<MarketFilterBarProps> = ({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}) => {
    return (
        <div className="market-filter-bar">
            <div className="market-filter-bar__tabs">
                <button
                    className={`market-filter-bar__tab ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    All
                </button>
                <button
                    className={`market-filter-bar__tab ${activeFilter === 'popular' ? 'active' : ''}`}
                    onClick={() => onFilterChange('popular')}
                >
                    Most Popular
                </button>
                <button
                    className={`market-filter-bar__tab ${activeFilter === 'recent' ? 'active' : ''}`}
                    onClick={() => onFilterChange('recent')}
                >
                    Recently Viewed
                </button>
                <button
                    className={`market-filter-bar__tab ${activeFilter === 'gainers' ? 'active' : ''}`}
                    onClick={() => onFilterChange('gainers')}
                >
                    Top Gainers
                </button>
                <button
                    className={`market-filter-bar__tab ${activeFilter === 'losers' ? 'active' : ''}`}
                    onClick={() => onFilterChange('losers')}
                >
                    Top Losers
                </button>
            </div>
            <div className="market-filter-bar__search">
                <input
                    type="text"
                    placeholder="Search for assets by name or ticker"
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default MarketFilterBar;
