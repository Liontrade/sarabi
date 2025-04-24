// HotNewsSection.tsx
import React from 'react';
import './HotNewsSection.css';
import newsImg from '../../../assets/home-page/news-alert.jpg';

interface NewsItem {
    headline: string;
    description: string;
    source: string;
    time: string;
    image: string;
}

const hotNews: NewsItem[] = [
    {
        headline: 'Tech stocks surge as market optimism returns',
        description: 'A surge in technology stocks has boosted market sentiment, driving up indices.',
        source: 'Reuters',
        time: '10 mins ago',
        image: newsImg,
    },
    {
        headline: 'New economic policies boost investor confidence',
        description: 'Investors are reacting positively to new economic policies, expecting higher growth.',
        source: 'Bloomberg',
        time: '20 mins ago',
        image: newsImg,
    },
    {
        headline: 'Global markets mixed amid rising interest rates',
        description: 'Market movements are mixed as rising interest rates impact global stocks.',
        source: 'CNBC',
        time: '30 mins ago',
        image: newsImg,
    },
];

const HotNewsSection: React.FC = () => (
    <section className="hot-news">
        <div className="hot-news__inner">
            <h3 className="hot-news__title">Hot News</h3>
            <div className="hot-news__grid">
                {hotNews.map((item, idx) => (
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
                <button className="hot-news__view-more">View more news</button>
            </div>
        </div>
    </section>
);

export default HotNewsSection;
