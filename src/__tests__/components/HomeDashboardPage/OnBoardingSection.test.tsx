import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingSection from '../../../components/HomeDashboardPage/OnBoardingSection/OnBoardingSection';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: (_auth: object, callback: (u: null | object) => void) => {
        callback(null);
        return () => {};
    },
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn().mockResolvedValue({ exists: () => false }),
}));

jest.mock('../../../firebaseConfig', () => ({
    auth: {},
    db: {},
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            switch (key) {
                case 'welcome':
                    return 'Welcome back';
                case 'completed_suffix':
                    return '% Completed';
                case 'step1_title':
                    return 'Complete your user profile';
                case 'step1_desc':
                    return 'Help us personalize your experience';
                case 'step1_cta':
                    return 'Go to profile';
                case 'step2_title':
                    return 'Create your stock watchlist';
                case 'step2_desc':
                    return 'Keep track of your favorite stocks';
                case 'step2_cta':
                    return 'Go to watchlist';
                case 'step3_title':
                    return 'Read a lesson in the knowledge library';
                case 'step3_desc':
                    return 'Learn stock-market basics from A to Z';
                case 'step3_cta':
                    return 'Go to library';
                default:
                    return key;
            }
        },
    }),
}));

describe('OnboardingSection Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });
    afterEach(() => {
        (console.log as jest.Mock).mockRestore();
    });

    it('renders header and average progress', () => {
        const { container } = render(<OnboardingSection />);

        expect(screen.getByRole('heading', { level: 2, name: /Welcome back, User!/i })).toBeInTheDocument();

        const overviewText = screen.getByText(/% Completed$/i);
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

        steps.forEach(({ title, desc, progress, cta }) => {
            expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();

            expect(screen.getByText(desc)).toBeInTheDocument();

            expect(screen.getByText(progress)).toBeInTheDocument();

            const btn = screen.getByRole('button', { name: cta });
            expect(btn).toBeInTheDocument();
            expect(btn).toHaveClass('step-card__btn');
        });
    });

    it('clicking CTA buttons logs appropriate messages', () => {
        render(<OnboardingSection />);

        ['Go to profile', 'Go to watchlist', 'Go to library'].forEach(text => {
            const btn = screen.getByRole('button', { name: text });
            fireEvent.click(btn);
            expect(console.log).toHaveBeenCalledWith(text);
        });
    });
});
