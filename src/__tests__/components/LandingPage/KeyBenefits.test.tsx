import { render, screen } from '@testing-library/react';
import KeyBenefits from '../../../components/LandingPage/KeyBenefits/KeyBenefits';
import {
    KEY_BENEFITS_SECTION_TITLE,
    KEY_BENEFITS_SECTION_SUBTITLE,
    KEY_BENEFIT_1,
    KEY_BENEFIT_2,
    KEY_BENEFIT_3,
    KEY_BENEFIT_4,
} from '../../../constants/strings';

describe('KeyBenefits component', () => {
    test('renders section title and subtitle', () => {
        render(<KeyBenefits />);

        const title = screen.getByRole('heading', {
            level: 2,
            name: KEY_BENEFITS_SECTION_TITLE,
        });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('section-title');

        const subtitle = screen.getByText(KEY_BENEFITS_SECTION_SUBTITLE);
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('section-subtitle');
    });

    test('renders four benefit cards with icons and titles', () => {
        const { container } = render(<KeyBenefits />);
        const cards = container.getElementsByClassName('benefits__card');
        expect(cards.length).toBe(4);

        const expectedTitles = [
            KEY_BENEFIT_1,
            KEY_BENEFIT_2,
            KEY_BENEFIT_3,
            KEY_BENEFIT_4,
        ];

        Array.from(cards).forEach((card, i) => {
            const icon = card.querySelector('.benefits__icon');
            expect(icon).toBeInTheDocument();

            const benefitTitle = card.querySelector('h3.benefits__title');
            expect(benefitTitle).toBeInTheDocument();
            expect(benefitTitle?.textContent).toBe(expectedTitles[i]);
        });
    });
});
