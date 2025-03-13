import React, { useState, useEffect } from 'react';
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
    const [companies, setCompanies] = useState<Company[]>([
        { logo: 'https://via.placeholder.com/24', name: 'Apple Inc.', ticker: 'AAPL', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Tesla Inc.', ticker: 'TSLA', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Amazon.com, Inc.', ticker: 'AMZN', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Alphabet Inc.', ticker: 'GOOGL', price: '--', change: '--' },
        { logo: 'https://via.placeholder.com/24', name: 'Microsoft Corporation', ticker: 'MSFT', price: '--', change: '--' },
    ]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const updatedCompanies = await Promise.all(
                    companies.map(async (company) => {
                        try {
                            const response = await fetch(`http://localhost:5000/api/stocks/${company.ticker}`);
                            const data = await response.json();

                            return {
                                ...company,
                                price: data.price ? `$${data.price.toFixed(2)}` : '--',
                                change: data.change ? `${(data.change * 100).toFixed(2)}%` : '--',
                            };
                        } catch (error) {
                            console.error(`Failed to fetch data for ${company.ticker}`, error);
                            return company;
                        }
                    })
                );

                setCompanies(updatedCompanies);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, []); 

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
                                    <img src={company.logo} alt={company.name} className="company-logo" />
                                </td>
                                <td>{company.name}</td>
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
