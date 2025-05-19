import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './MarketList.css';

interface Company {
    logo: string;
    name: string;
    ticker: string;
    price: string;
    change: string;
}

interface MarketListProps {
    filter: 'all' | 'popular' | 'recent' | 'gainers' | 'losers';
    searchQuery: string;
}

const MarketList: React.FC<MarketListProps> = ({ filter, searchQuery }) => {
    const { t } = useTranslation('market_market_list');
    const [companies, setCompanies] = useState<Company[]>([
        { logo: 'https://via.placeholder.com/24', name: 'Apple Inc.', ticker: 'AAPL', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Tesla Inc.', ticker: 'TSLA', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Amazon.com, Inc.', ticker: 'AMZN', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Alphabet Inc.', ticker: 'GOOGL', price: '--', change: '--' },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Microsoft Corporation',
            ticker: 'MSFT',
            price: '--',
            change: '--',
        },
    ]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const updated = await Promise.all(
                    companies.map(async company => {
                        try {
                            const res = await fetch(`/api/stocks/${company.ticker}`);
                            const data = await res.json();
                            return {
                                ...company,
                                price: data.price != null ? `$${data.price.toFixed(2)}` : '--',
                                change: data.change != null ? `${data.change.toFixed(2)}%` : '--',
                            };
                        } catch {
                            return company;
                        }
                    }),
                );
                setCompanies(updated);
            } catch {
                // error fetching overall
            }
        };
        fetchStockData();
    }, []);

    const filtered = companies.filter(c => {
        const match =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.ticker.toLowerCase().includes(searchQuery.toLowerCase());
        if (filter === 'gainers') return match && c.change.startsWith('+');
        if (filter === 'losers') return match && c.change.startsWith('-');
        return match;
    });

    return (
        <div className="market-list">
            <table className="market-list__table">
                <thead>
                    <tr>
                        <th>{t('header.logo')}</th>
                        <th>{t('header.name')}</th>
                        <th>{t('header.ticker')}</th>
                        <th>{t('header.price')}</th>
                        <th>{t('header.change')}</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((c, i) => {
                        const isDown = c.change.startsWith('-');
                        return (
                            <tr key={i} className={i % 2 === 0 ? 'row--even' : 'row--odd'}>
                                <td>
                                    <img src={c.logo} alt={c.name} className="company-logo" />
                                </td>
                                <td>{c.name}</td>
                                <td>
                                    <strong>{c.ticker}</strong>
                                </td>
                                <td>{c.price}</td>
                                <td className={`change-cell ${isDown ? 'down' : 'up'}`}>{c.change}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MarketList;
