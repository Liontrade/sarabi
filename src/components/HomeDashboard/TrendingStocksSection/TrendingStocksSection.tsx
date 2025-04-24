import React, { useRef } from 'react';
import './TrendingStocksSection.css';
import { FiRefreshCw } from 'react-icons/fi';

interface StockItem {
    symbol: string;
    change: string;
    logo: string;
}

const trendingStocks: StockItem[] = [
    { symbol: 'AAPL', change: '+5%', logo: 'src/assets/logos/apple-logo.png' },
    { symbol: 'TSLA', change: '-3%', logo: 'src/assets/logos/tesla-logo.png' },
    { symbol: 'AMZN', change: '+2.5%', logo: 'src/assets/logos/amazon-logo.png' },
    { symbol: 'GOOGL', change: '+1.2%', logo: 'src/assets/logos/google-logo.png' },
    { symbol: 'META', change: '+3.19%', logo: 'src/assets/logos/meta-logo.png' },
];

const TrendingStocksSection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleRefresh = () => {
        console.log('Refresh trending stocks');
    };

    return (
        <section className="trending-section">
            <header className="trending-header">
                <h3>Trending Stocks</h3>
                <button className="trending-refresh" onClick={handleRefresh} aria-label="Refresh trending">
                    <FiRefreshCw />
                </button>
            </header>

            <div className="trending-grid-wrapper">
                <div className="trending-grid" ref={scrollRef}>
                    {trendingStocks.map((s, i) => {
                        const isUp = s.change.startsWith('+');
                        return (
                            <div key={i} className="stock-card">
                                <div className="stock-card__top">
                                    <img src={s.logo} alt={s.symbol} className="stock-card__logo" />
                                </div>
                                <div className="stock-card__info">
                                    <span className="stock-card__symbol">{s.symbol}</span>
                                    <span className={`stock-card__change ${isUp ? 'up' : 'down'}`}>{s.change}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="trending-footer">
                <button className="view-all-btn">View all trending</button>
            </div>
        </section>
    );
};

export default TrendingStocksSection;
