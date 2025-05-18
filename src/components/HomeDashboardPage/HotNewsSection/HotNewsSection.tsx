import React from 'react';
import './HotNewsSection.css';
import { useTranslation } from 'react-i18next';
import { HOT_NEWS_ITEMS, NewsItem } from '../../../constants/HomeDashboardPage/constants_hot_news_section';

const HotNewsSection: React.FC = () => {
    const { t } = useTranslation('home_dashboard_hot_news_section');

    return (
        <section className="hot-news">
            <div className="hot-news__inner">
                <h3 className="hot-news__title">{t('title')}</h3>
                <div className="hot-news__grid">
                    {HOT_NEWS_ITEMS.map((item: NewsItem, idx: number) => (
                        <article key={idx} className="hot-news__card">
                            <img src={item.image} alt={item.headline} className="hot-news__image" />
                            <div className="hot-news__body">
                                <h4 className="hot-news__headline">{item.headline}</h4>
                                <p className="hot-news__desc">{item.description}</p>
                                <footer className="hot-news__meta">
                                    <span className="hot-news__source">{item.source}</span>
                                    <span className="hot-news__time">{item.time}</span>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="hot-news__footer">
                    <button className="hot-news__view-more">{t('view_more')}</button>
                </div>
            </div>
        </section>
    );
};

export default HotNewsSection;
