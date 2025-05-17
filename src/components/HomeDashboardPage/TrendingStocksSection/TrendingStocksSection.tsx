import React, { useRef, useState, useEffect } from 'react';
import './TrendingStocksSection.css';
import { FiRefreshCw } from 'react-icons/fi';

import { TRENDING_TITLE, REFRESH_TRENDING_LABEL, VIEW_ALL_TRENDING } from '../../../constants/strings';

interface TrendingStock {
    ticker: string;
    full_name: string;
    price: number;
    change_percent: number;
}

const TrendingStocksSection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [stocks, setStocks] = useState<TrendingStock[]>([]);
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
        } catch (error: unknown) {
            console.error('Fetch trending failed:', error);
            setError(error instanceof Error ? error.message : 'Błąd sieci');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <section className="trending-stocks-section">
            <div className="trending-stocks-section__inner">
                <header className="trending-header">
                    <h3>{TRENDING_TITLE}</h3>
                    <button className="trending-refresh" onClick={fetchTrending} aria-label={REFRESH_TRENDING_LABEL}>
                        <FiRefreshCw />
                    </button>
                </header>

                {loading ? (
                    <p className="trending-loading">Ładowanie trendów…</p>
                ) : error ? (
                    <p className="trending-error">{error}</p>
                ) : (
                    <div className="trending-grid-wrapper">
                        <div className="trending-grid" ref={scrollRef}>
                            {stocks.map((s, i) => {
                                const up = s.change_percent >= 0;
                                return (
                                    <div key={i} className="stock-card">
                                        <div className="stock-card__ticker">{s.ticker}</div>
                                        <div className="stock-card__name">{s.full_name}</div>
                                        <div className="stock-card__price">{s.price.toFixed(2)} PLN</div>
                                        <div className={`stock-card__percent ${up ? 'up' : 'down'}`}>
                                            {up ? '▲' : '▼'} {Math.abs(s.change_percent).toFixed(2)}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="trending-footer">
                    <button className="view-all-btn">{VIEW_ALL_TRENDING}</button>
                </div>
            </div>
        </section>
    );
};

export default TrendingStocksSection;
