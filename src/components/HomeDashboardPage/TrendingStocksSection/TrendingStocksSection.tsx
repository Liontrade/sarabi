import React, { useRef } from 'react';
import './TrendingStocksSection.css';
import { FiRefreshCw } from 'react-icons/fi';

import { TRENDING_TITLE, REFRESH_TRENDING_LABEL, VIEW_ALL_TRENDING } from '../../../constants/strings';
import { TRENDING_STOCKS, TrendingStock } from '../../../constants/HomeDashboardPage/constants_trending_stocks_section';

const TrendingStocksSection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleRefresh = () => {
        console.log('Refresh trending stocks');
    };

    return (
        <section className="trending-section">
            <header className="trending-header">
                <h3>{TRENDING_TITLE()}</h3>
                <button className="trending-refresh" onClick={handleRefresh} aria-label={REFRESH_TRENDING_LABEL()}>
                    <FiRefreshCw />
                </button>
            </header>

            <div className="trending-grid-wrapper">
                <div className="trending-grid" ref={scrollRef}>
                    {TRENDING_STOCKS.map((s: TrendingStock, i: number) => {
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
                <button className="view-all-btn">{VIEW_ALL_TRENDING()}</button>
            </div>
        </section>
    );
};

export default TrendingStocksSection;
