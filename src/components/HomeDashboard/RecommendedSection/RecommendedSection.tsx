import React from 'react';
import './RecommendedSection.css';
import { FiRefreshCw, FiPlus } from 'react-icons/fi';

interface Stock {
    ticker: string;
    name: string;
    price: string;
    change: string;
    logo: string;
    reason: string;
}

const recommended: Stock[] = [
    {
        ticker: 'TSLA',
        name: 'Tesla Inc.',
        price: '$1,200',
        change: '+3.2%',
        logo: 'src/assets/logos/tesla-logo.png',
        reason: 'Electric vehicles',
    },
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: '$150',
        change: '+5.0%',
        logo: 'src/assets/logos/apple-logo.png',
        reason: 'Smartphones',
    },
    {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.',
        price: '$3,000',
        change: '+1.3%',
        logo: 'src/assets/logos/amazon-logo.png',
        reason: 'E-commerce',
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: '$2,500',
        change: '+0.9%',
        logo: 'src/assets/logos/google-logo.png',
        reason: 'Search',
    },
];

const RecommendedSection: React.FC = () => {
    const handleRefresh = () => {
        console.log('Refresh recommendations');
        // tu możesz wywołać fetch nowych danych
    };

    const handleAdd = (ticker: string) => {
        console.log(`Add ${ticker} to watchlist`);
        // tu akcja dodania do watchlisty
    };

    return (
        <section className="recommended-section">
            <header className="recommended-header">
                <h3>Recommended for you</h3>
                <button className="refresh-btn" onClick={handleRefresh} aria-label="Refresh recommendations">
                    <FiRefreshCw />
                </button>
            </header>

            <div className="recommended-grid">
                {recommended.map(s => {
                    const isUp = s.change.startsWith('+');
                    return (
                        <div key={s.ticker} className="stock-card">
                            <div className="stock-card__top">
                                <img src={s.logo} alt={s.ticker} className="stock-card__logo" />
                                <button
                                    className="stock-card__add"
                                    onClick={() => handleAdd(s.ticker)}
                                    aria-label={`Add ${s.ticker}`}
                                >
                                    <FiPlus />
                                </button>
                            </div>
                            <div className="stock-card__info">
                                <span className="stock-card__ticker">{s.ticker}</span>
                                <span className="stock-card__name">{s.name}</span>
                            </div>
                            <div className="stock-card__metrics">
                                <span className="price-badge">{s.price}</span>
                                <span className={`change-badge ${isUp ? 'up' : 'down'}`}>{s.change}</span>
                            </div>
                            <div className="stock-card__reason">{s.reason}</div>
                        </div>
                    );
                })}
            </div>

            <div className="recommended-footer">
                <button className="view-all-btn">View all recommendations</button>
            </div>
        </section>
    );
};

export default RecommendedSection;
