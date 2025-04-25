import { render, screen } from '@testing-library/react';
import HotNewsSection from '../../../components/HomeDashboardPage/HotNewsSection/HotNewsSection';

jest.mock('../../../assets/home-page/news-alert.jpg', () => 'news-alert.jpg');

describe('HotNewsSection Component', () => {
    it('renders section title', () => {
        render(<HotNewsSection />);
        const title = screen.getByRole('heading', { level: 3, name: /hot news/i });
        expect(title).toBeInTheDocument();
    });

    it('renders correct number of news cards', () => {
        render(<HotNewsSection />);
        const cards = screen.getAllByRole('article');
        expect(cards).toHaveLength(3);
    });

    it('each card displays image, headline, description, source, and time', () => {
        render(<HotNewsSection />);

        const newsItems = [
            {
                headline: 'Tech stocks surge as market optimism returns',
                description: 'A surge in technology stocks has boosted market sentiment, driving up indices.',
                source: 'Reuters',
                time: '10 mins ago',
            },
            {
                headline: 'New economic policies boost investor confidence',
                description: 'Investors are reacting positively to new economic policies, expecting higher growth.',
                source: 'Bloomberg',
                time: '20 mins ago',
            },
            {
                headline: 'Global markets mixed amid rising interest rates',
                description: 'Market movements are mixed as rising interest rates impact global stocks.',
                source: 'CNBC',
                time: '30 mins ago',
            },
        ];

        newsItems.forEach(item => {
            const img = screen.getByAltText(item.headline);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', 'news-alert.jpg');

            expect(screen.getByText(item.headline)).toBeInTheDocument();
            expect(screen.getByText(item.description)).toBeInTheDocument();
            expect(screen.getByText(item.source)).toBeInTheDocument();
            expect(screen.getByText(item.time)).toBeInTheDocument();
        });
    });

    it('renders "View more news" button', () => {
        render(<HotNewsSection />);
        const button = screen.getByRole('button', { name: /view more news/i });
        expect(button).toBeInTheDocument();
    });
});
