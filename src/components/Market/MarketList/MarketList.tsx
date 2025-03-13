import React from 'react';
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
    const companies: Company[] = [
        {
            logo: 'src/assets/logos/amazon-logo.png',
            name: 'Apple Inc.',
            ticker: 'AAPL',
            price: '$150',
            change: '+1.2%',
        },
        { logo: 'https://via.placeholder.com/24', name: 'Tesla Inc.', ticker: 'TSLA', price: '$1000', change: '-0.5%' },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Amazon.com, Inc.',
            ticker: 'AMZN',
            price: '$3000',
            change: '+2%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Alphabet Inc.',
            ticker: 'GOOGL',
            price: '$2800',
            change: '+0.8%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Microsoft Corporation',
            ticker: 'MSFT',
            price: '$300',
            change: '+1.5%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Facebook, Inc.',
            ticker: 'META',
            price: '$350',
            change: '-0.7%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Netflix, Inc.',
            ticker: 'NFLX',
            price: '$550',
            change: '+2.3%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'NVIDIA Corporation',
            ticker: 'NVDA',
            price: '$220',
            change: '+3.1%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Intel Corporation',
            ticker: 'INTC',
            price: '$60',
            change: '-0.3%',
        },
        {
            logo: 'https://via.placeholder.com/24',
            name: 'Cisco Systems, Inc.',
            ticker: 'CSCO',
            price: '$55',
            change: '+0.9%',
        },
    ];

    const filteredCompanies = companies.filter(company => {
        const matchesSearch =
            company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.ticker.toLowerCase().includes(searchQuery.toLowerCase());
        if (filter === 'gainers') return matchesSearch && company.change.startsWith('+');
        if (filter === 'losers') return matchesSearch && company.change.startsWith('-');
        return matchesSearch;
    });

    return (
        <div className="market-list">
            <table className="market-list__table">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.map((company, idx) => {
                        const isNegative = company.change.startsWith('-');
                        return (
                            <tr key={idx}>
                                <td className="company-name-cell">
                                    {company.logo && (
                                        <img src={company.logo} alt={company.name} className="company-logo" />
                                    )}
                                </td>
                                <td>{company.name} </td>
                                <td>{company.ticker}</td>
                                <td>{company.price}</td>
                                <td className={`change-cell ${isNegative ? 'change--down' : 'change--up'}`}>
                                    {company.change}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MarketList;
