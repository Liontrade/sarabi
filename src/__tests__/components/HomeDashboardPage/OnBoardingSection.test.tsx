import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingSection from '../../../components/HomeDashboardPage/OnBoardingSection/OnBoardingSection';

describe('OnboardingSection Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        (console.log as jest.Mock).mockRestore();
    });

    it('renders header and average progress', () => {
        const { container } = render(<OnboardingSection />);

        const header = screen.getByRole('heading', { level: 2, name: /Welcome back, Jane!/i });
        expect(header).toBeInTheDocument();

        const overviewText = screen.getByText(/% Completed/i);
        expect(overviewText).toHaveTextContent('47% Completed');

        const radial = container.querySelector('.radial-progress') as HTMLElement;
        expect(radial.getAttribute('style')).toContain('--percent: 47');
    });

    it('renders all step cards with correct content', () => {
        render(<OnboardingSection />);

        const steps = [
            {
                title: 'Complete your user profile',
                desc: 'Help us personalize your experience',
                progress: '80%',
                cta: 'Go to profile',
            },
            {
                title: 'Create your stock watchlist',
                desc: 'Keep track of your favorite stocks',
                progress: '20%',
                cta: 'Go to watchlist',
            },
            {
                title: 'Read a lesson in the knowledge library',
                desc: 'Learn stock-market basics from A to Z',
                progress: '40%',
                cta: 'Go to library',
            },
        ];

        steps.forEach(step => {
            expect(screen.getByRole('heading', { level: 3, name: step.title })).toBeInTheDocument();
            expect(screen.getByText(step.desc)).toBeInTheDocument();
            expect(screen.getByText(step.progress)).toBeInTheDocument();
            const btn = screen.getByRole('button', { name: step.cta });
            expect(btn).toBeInTheDocument();
        });
    });

    it('clicking CTA buttons logs appropriate messages', () => {
        render(<OnboardingSection />);

        const ctaButtons = [
            { text: 'Go to profile', log: 'Go to profile' },
            { text: 'Go to watchlist', log: 'Go to watchlist' },
            { text: 'Go to library', log: 'Go to library' },
        ];

        ctaButtons.forEach(({ text, log }) => {
            const btn = screen.getByRole('button', { name: text });
            fireEvent.click(btn);
            expect(console.log).toHaveBeenCalledWith(log);
        });
    });
});
