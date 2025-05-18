import React, { useRef } from 'react';
import './TrendingStocksSection.css';
import { FiRefreshCw } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { TRENDING_STOCKS, TrendingStock } from '../../../constants/HomeDashboardPage/constants_trending_stocks_section';

const TrendingStocksSection: React.FC = () => {
    const { t } = useTranslation('home_dashboard_trending_section');
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleRefresh = () => {
        console.log('Refresh trending stocks');
    };

    return (
        <section className="trending-section">
            <header className="trending-header">
                <h3>{t('title')}</h3>
                <button className="trending-refresh" onClick={handleRefresh} aria-label={t('refresh_label')}>
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
                <button className="view-all-btn">{t('view_all')}</button>
            </div>
        </section>
    );
};

export default TrendingStocksSection;
