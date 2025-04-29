import React from 'react';
import './RecommendedSection.css';
import { FiRefreshCw, FiPlus } from 'react-icons/fi';

import {
    RECOMMENDED_TITLE,
    REFRESH_RECOMMENDATIONS_LABEL,
    ADD_LABEL,
    VIEW_ALL_RECOMMENDATIONS,
} from '../../../constants/strings';
import { RECOMMENDED_STOCKS, Stock } from '../../../constants/HomeDashboardPage/constants_recommended_section';

const RecommendedSection: React.FC = () => {
    const handleRefresh = () => {
        console.log('Refresh recommendations');
    };

    const handleAdd = (ticker: string) => {
        console.log(`Add ${ticker} to watchlist`);
    };

    return (
        <section className="recommended-section">
            <header className="recommended-header">
                <h3>{RECOMMENDED_TITLE()}</h3>
                <button className="refresh-btn" onClick={handleRefresh} aria-label={REFRESH_RECOMMENDATIONS_LABEL()}>
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
                                    aria-label={`${ADD_LABEL} ${s.ticker}`}
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
                <button className="view-all-btn">{VIEW_ALL_RECOMMENDATIONS()}</button>
            </div>
        </section>
    );
};

export default RecommendedSection;
