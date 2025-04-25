import newsImg from '../../../src/assets/home-page/news-alert.jpg';

export interface NewsItem {
    headline: string;
    description: string;
    source: string;
    time: string;
    image: string;
}

export const HOT_NEWS_ITEMS: NewsItem[] = [
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
