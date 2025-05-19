import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './MarketList.css';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface PriceSummary {
    ticker: string;
    full_name: string;
    price: number;
    change: number;
    change_percent: number;
    open: number;
    high: number;
    low: number;
}

type FilterKey = 'all' | 'popular' | 'recent' | 'gainers' | 'losers';

interface MarketListProps {
    filter: FilterKey;
    searchQuery: string;
}

const plnFormatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
});

const MarketList: React.FC<MarketListProps> = ({ filter, searchQuery }) => {
    const { t } = useTranslation('market_market_list');
    const [data, setData] = useState<PriceSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof PriceSummary;
        direction: 'asc' | 'desc';
    } | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/prices')
            .then(res => res.json())
            .then((json: PriceSummary[]) => setData(json))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const onSort = (key: keyof PriceSummary) => {
        setSortConfig(prev =>
            prev?.key === key
                ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { key, direction: 'asc' },
        );
    };

    const filtered = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return data.filter(item => {
            if (!item.full_name.toLowerCase().includes(q) && !item.ticker.toLowerCase().includes(q)) return false;
            if (filter === 'gainers') return item.change > 0;
            if (filter === 'losers') return item.change < 0;
            return true;
        });
    }, [data, filter, searchQuery]);

    const sorted = useMemo(() => {
        if (!sortConfig) return filtered;
        const { key, direction } = sortConfig;
        return [...filtered].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return 0;
        });
    }, [filtered, sortConfig]);

    if (loading) {
        return <p className="market-list__loading">{t('loading')}</p>;
    }

    const headers: { key: keyof PriceSummary; labelKey: string }[] = [
        { key: 'ticker', labelKey: 'header.ticker' },
        { key: 'full_name', labelKey: 'header.full_name' },
        { key: 'price', labelKey: 'header.price' },
        { key: 'change', labelKey: 'header.change' },
        { key: 'change_percent', labelKey: 'header.change_percent' },
        { key: 'open', labelKey: 'header.open' },
        { key: 'high', labelKey: 'header.high' },
        { key: 'low', labelKey: 'header.low' },
    ];

    return (
        <div className="market-list">
            <table className="market-list__table">
                <thead>
                    <tr>
                        {headers.map(h => (
                            <th key={h.key} onClick={() => onSort(h.key)} className="sortable">
                                <div className="th-content">
                                    <span>{t(h.labelKey)}</span>
                                    <span className="sort-icons">
                                        <FiChevronUp
                                            className={
                                                sortConfig?.key === h.key && sortConfig.direction === 'asc'
                                                    ? 'icon active'
                                                    : 'icon'
                                            }
                                        />
                                        <FiChevronDown
                                            className={
                                                sortConfig?.key === h.key && sortConfig.direction === 'desc'
                                                    ? 'icon active'
                                                    : 'icon'
                                            }
                                        />
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((c, i) => {
                        const isDown = c.change < 0;
                        return (
                            <tr key={i} className={i % 2 === 0 ? 'row--even' : ''}>
                                <td className="ticker-cell">{c.ticker}</td>
                                <td>{c.full_name}</td>
                                <td>{plnFormatter.format(c.price)}</td>
                                <td className={`change-cell ${isDown ? 'down' : 'up'}`}>
                                    {plnFormatter.format(c.change)}
                                </td>
                                <td className={`change-cell ${isDown ? 'down' : 'up'}`}>
                                    {c.change_percent.toFixed(2)}%
                                </td>
                                <td>{plnFormatter.format(c.open)}</td>
                                <td>{plnFormatter.format(c.high)}</td>
                                <td>{plnFormatter.format(c.low)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MarketList;
