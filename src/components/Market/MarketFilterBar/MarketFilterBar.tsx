import React from 'react';
import { useTranslation } from 'react-i18next';
import './MarketFilterBar.css';

type FilterKey = 'all' | 'popular' | 'recent' | 'gainers' | 'losers';

interface MarketFilterBarProps {
    activeFilter: FilterKey;
    onFilterChange: (filter: FilterKey) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const FILTER_KEYS: FilterKey[] = ['all', 'popular', 'recent', 'gainers', 'losers'];

const MarketFilterBar: React.FC<MarketFilterBarProps> = ({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}) => {
    const { t } = useTranslation('market_market_filter_bar');

    return (
        <div className="market-filter-bar">
            <div className="market-filter-bar__tabs">
                {FILTER_KEYS.map(key => (
                    <button
                        key={key}
                        className={`market-filter-bar__tab ${activeFilter === key ? 'active' : ''}`}
                        onClick={() => onFilterChange(key)}
                    >
                        {t(`filter_${key}`)}
                    </button>
                ))}
            </div>
            <div className="market-filter-bar__search">
                <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default MarketFilterBar;
