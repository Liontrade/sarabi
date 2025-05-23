import React, { useRef, useState, useEffect } from 'react';
import './TrendingStocksSection.css';
import { FiRefreshCw } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

interface TrendingStock {
    ticker: string;
    full_name: string;
    price: number;
    change_percent: number;
}

const CARD_WIDTH = 250;
const GAP_PX = 16;

const TrendingStocksSection: React.FC = () => {
    const { t } = useTranslation('home_dashboard_trending_section');
    const containerRef = useRef<HTMLDivElement>(null);
    const [stocks, setStocks] = useState<TrendingStock[]>([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrending = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8080/trending');
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const json: TrendingStock[] = await res.json();
            setStocks(json);
        } catch (err: unknown) {
            console.error('Fetch trending failed:', err);
            setError(err instanceof Error ? err.message : t('error_network'));
        } finally {
            setLoading(false);
        }
    };

    const updateVisibleCount = () => {
        const el = containerRef.current;
        if (!el) return;
        const width = el.clientWidth;
        const full = CARD_WIDTH + GAP_PX;
        const count = Math.floor((width + GAP_PX) / full);
        setVisibleCount(count > 0 ? count : 1);
    };

    useEffect(() => {
        fetchTrending();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            updateVisibleCount();
        }
    }, [loading, error]);

    const toDisplay = stocks.slice(0, visibleCount);

    return (
        <section className="trending-section">
            <header className="trending-header">
                <h3>{t('title')}</h3>
                <button className="trending-refresh" onClick={fetchTrending} aria-label={t('refresh_label')}>
                    <FiRefreshCw />
                </button>
            </header>

            {loading ? (
                <p className="trending-loading">{t('loading')}</p>
            ) : error ? (
                <p className="trending-error">{error}</p>
            ) : (
                <div className="trending-grid-wrapper" ref={containerRef}>
                    <div className="trending-grid">
                        {toDisplay.map((s, i) => {
                            const up = s.change_percent >= 0;
                            return (
                                <div key={i} className="stock-card">
                                    <span className="stock-card__ticker">{s.ticker}</span>
                                    <span className="stock-card__name">{s.full_name}</span>
                                    <div className="stock-card__metrics">
                                        <span className="price-badge">{s.price.toFixed(2)} PLN</span>
                                        <span className={`change-badge ${up ? 'up' : 'down'}`}>
                                            {up ? '+' : '-'}
                                            {Math.abs(s.change_percent).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="trending-footer">
                <button className="view-all-btn">{t('view_all')}</button>
            </div>
        </section>
    );
};

export default TrendingStocksSection;
