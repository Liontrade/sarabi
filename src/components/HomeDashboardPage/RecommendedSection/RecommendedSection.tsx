import React from 'react';
import './RecommendedSection.css';
import { FiRefreshCw, FiPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { RECOMMENDED_STOCKS, Stock } from '../../../constants/HomeDashboardPage/constants_recommended_section';

const RecommendedSection: React.FC = () => {
    const { t } = useTranslation('home_dashboard_recommended_section');

    const handleRefresh = () => {
        console.log('Refresh recommendations');
    };

    const handleAdd = (ticker: string) => {
        console.log(`Add ${ticker} to watchlist`);
    };

    return (
        <section className="recommended-section">
            <header className="recommended-header">
                <h3>{t('title')}</h3>
                <button className="refresh-btn" onClick={handleRefresh} aria-label={t('refresh_label')}>
                    <FiRefreshCw />
                </button>
            </header>

            <div className="recommended-grid">
                {RECOMMENDED_STOCKS.map((s: Stock) => {
                    const isUp = s.change.startsWith('+');
                    return (
                        <div key={s.ticker} className="stock-card">
                            <div className="stock-card__top">
                                <img src={s.logo} alt={s.ticker} className="stock-card__logo" />
                                <button
                                    className="stock-card__add"
                                    onClick={() => handleAdd(s.ticker)}
                                    aria-label={`${t('add_label')} ${s.ticker}`}
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
                <button className="view-all-btn">{t('view_all')}</button>
            </div>
        </section>
    );
};

export default RecommendedSection;
