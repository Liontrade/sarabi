jest.useRealTimers();

import { render, screen } from '@testing-library/react';
import Hero from '../../../components/LandingPage/Hero/Hero';
import heroBg from '../../../assets/hero.jpg';

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
        expect(section).toHaveStyle(`background-image: url(${heroBg})`);
    });

    test('renders title, subtitle, and button', () => {
        render(<Hero />);

        const title = screen.getByRole('heading', {
            level: 1,
            name: /LionTrade — Your AI Stock Market Companion/i,
        });
        expect(title).toBeInTheDocument();

        const subtitle = screen.getByText(/Learn markets, test strategies & build confidence—no jargon, no risk\./i);
        expect(subtitle).toBeInTheDocument();

        const button = screen.getByRole('button', {
            name: /Start Learning for Free/i,
        });
        expect(button).toBeInTheDocument();
    });

    afterAll(() => {
        jest.useFakeTimers();
    });
});
