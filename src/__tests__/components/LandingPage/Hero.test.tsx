import { render, screen } from '@testing-library/react';
import Hero from '../../../components/LandingPage/Hero/Hero';

jest.mock('../../../assets/hero.jpg', () => 'hero.jpg');

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const map: Record<string, string> = {
                title: 'LionTrade — Your AI Stock Market Companion',
                subtitle: 'Learn markets, test strategies & build confidence—no jargon, no risk.',
                cta: 'Start Learning for Free',
            };
            return map[key] ?? key;
        },
    }),
}));

describe('Hero component', () => {
    test('renders hero section with correct background image', () => {
        render(<Hero />);

        const title = screen.getByRole('heading', {
            level: 1,
            name: /LionTrade — Your AI Stock Market Companion/i,
        });
        expect(title).toBeInTheDocument();

        const section = title.closest('section');
        expect(section).toBeInTheDocument();

        expect(section).toHaveStyle(`background-image: url(hero.jpg)`);
    });

    test('renders title, subtitle, and button', () => {
        render(<Hero />);

        const title = screen.getByRole('heading', {
            level: 1,
            name: 'LionTrade — Your AI Stock Market Companion',
        });
        expect(title).toBeInTheDocument();

        const subtitle = screen.getByText('Learn markets, test strategies & build confidence—no jargon, no risk.');
        expect(subtitle).toBeInTheDocument();

        const button = screen.getByRole('button', {
            name: 'Start Learning for Free',
        });
        expect(button).toBeInTheDocument();
    });
});
