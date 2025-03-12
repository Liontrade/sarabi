import React, { useRef, useEffect } from 'react';
import './HotNewsSection.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
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

const getItemWidth = (containerWidth: number, itemsVisible: number, gap: number) => {
    return (containerWidth - gap * (itemsVisible - 1)) / itemsVisible;
};

const HotNewsSection: React.FC = () => {
    const extendedNews = [...hotNews, ...hotNews];

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const getItemsVisible = () => {
        const width = window.innerWidth;
        if (width < 800) return 1;
        if (width < 1200) return 2;
        return 3;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const itemsVisible = getItemsVisible();
                const containerWidth = scrollContainerRef.current.clientWidth;
                const gap = 16;
                const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
                scrollContainerRef.current.scrollLeft += itemWidth + gap;

                if (scrollContainerRef.current.scrollLeft + containerWidth >= scrollContainerRef.current.scrollWidth) {
                    scrollContainerRef.current.scrollLeft = 0;
                }
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const itemsVisible = getItemsVisible();
            const containerWidth = scrollContainerRef.current.clientWidth;
            const gap = 16;
            const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
            scrollContainerRef.current.scrollLeft -= itemWidth + gap;
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const itemsVisible = getItemsVisible();
            const containerWidth = scrollContainerRef.current.clientWidth;
            const gap = 16;
            const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
            scrollContainerRef.current.scrollLeft += itemWidth + gap;
        }
    };

    return (
        <section className="hot-news-section">
            <h3 className="section-heading">Hot News</h3>
            <div className="news-container">
                <MdChevronLeft className="arrow-btn arrow-btn--left" onClick={scrollLeft} />
                <div className="news-grid" ref={scrollContainerRef}>
                    {extendedNews.map((news, idx) => (
                        <div key={idx} className="hot-news-card">
                            <img src={news.image} alt={news.headline} className="hot-news-card__image" />
                            <div className="hot-news-card__content">
                                <h4 className="hot-news-card__headline">{news.headline}</h4>
                                <p className="hot-news-card__description">{news.description}</p>
                                <div className="hot-news-card__meta">
                                    <span className="hot-news-card__source">{news.source}</span>
                                    <span className="hot-news-card__time">{news.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <MdChevronRight className="arrow-btn arrow-btn--right" onClick={scrollRight} />
            </div>
        </section>
    );
};

export default HotNewsSection;
