import { render, screen } from '@testing-library/react';
import HowItWorks from '../../../components/LandingPage/HowItWorks/HowItWorks';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('HowItWorks component', () => {
    test('renders section title', () => {
        render(<HowItWorks />);
        const heading = screen.getByRole('heading', {
            level: 2,
            name: 'section_title',
        });
        expect(heading).toBeInTheDocument();
    });

    test('renders three step cards with titles, texts, and icons', () => {
        const { container } = render(<HowItWorks />);

        const cards = container.getElementsByClassName('hiw__card');
        expect(cards).toHaveLength(3);

        const titleKeys = ['step1_title', 'step2_title', 'step3_title'];
        const textKeys = ['step1_text', 'step2_text', 'step3_text'];

        Array.from(cards).forEach((card, i) => {
            const icon = card.querySelector('.hiw__icon');
            expect(icon).toBeInTheDocument();

            const titleEl = card.querySelector('h3');
            expect(titleEl).toBeInTheDocument();
            expect(titleEl?.textContent).toBe(titleKeys[i]);

            const textEl = card.querySelector('p');
            expect(textEl).toBeInTheDocument();
            expect(textEl?.textContent).toBe(textKeys[i]);
        });
    });
});
