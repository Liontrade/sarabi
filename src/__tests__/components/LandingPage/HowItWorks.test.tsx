jest.useRealTimers();

import { render, screen } from '@testing-library/react';
import HowItWorks from '../../../components/LandingPage/HowItWorks/HowItWorks';
import {
    HOW_IT_WORKS_SECTION_TITLE,
    HOW_IT_WORKS_STEP1_TITLE,
    HOW_IT_WORKS_STEP1_TEXT,
    HOW_IT_WORKS_STEP2_TITLE,
    HOW_IT_WORKS_STEP2_TEXT,
    HOW_IT_WORKS_STEP3_TITLE,
    HOW_IT_WORKS_STEP3_TEXT,
} from '../../../constants/strings';

describe('HowItWorks component', () => {
    test('renders section title', () => {
        render(<HowItWorks />);
        const heading = screen.getByRole('heading', {
            level: 2,
            name: HOW_IT_WORKS_SECTION_TITLE,
        });
        expect(heading).toBeInTheDocument();
    });

    test('renders three step cards with titles, texts, and icons', () => {
        const { container } = render(<HowItWorks />);

        const cards = container.getElementsByClassName('hiw__card');
        expect(cards.length).toBe(3);

        const titles = [HOW_IT_WORKS_STEP1_TITLE, HOW_IT_WORKS_STEP2_TITLE, HOW_IT_WORKS_STEP3_TITLE];
        const texts = [HOW_IT_WORKS_STEP1_TEXT, HOW_IT_WORKS_STEP2_TEXT, HOW_IT_WORKS_STEP3_TEXT];

        Array.from(cards).forEach((card, i) => {
            const icon = card.querySelector('.hiw__icon');
            expect(icon).toBeInTheDocument();

            const titleElement = card.querySelector('h3');
            expect(titleElement).toBeInTheDocument();
            expect(titleElement?.textContent).toBe(titles[i]);

            const textElement = card.querySelector('p');
            expect(textElement).toBeInTheDocument();
            expect(textElement?.textContent).toBe(texts[i]);
        });
    });

    afterAll(() => {
        jest.useFakeTimers();
    });
});
