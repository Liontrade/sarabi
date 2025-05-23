import { render, screen } from '@testing-library/react';
import KeyBenefits from '../../../components/LandingPage/KeyBenefits/KeyBenefits';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('KeyBenefits component', () => {
    it('renders section title and subtitle', () => {
        render(<KeyBenefits />);

        const title = screen.getByRole('heading', {
            level: 2,
            name: 'section_title',
        });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('section-title');

        const subtitle = screen.getByText('section_subtitle');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('section-subtitle');
    });

    it('renders four benefit cards with icons and titles', () => {
        const { container } = render(<KeyBenefits />);
        const cards = container.getElementsByClassName('benefits__card');
        expect(cards).toHaveLength(4);

        const expectedKeys = ['benefit_1', 'benefit_2', 'benefit_3', 'benefit_4'];

        Array.from(cards).forEach((card, i) => {
            const icon = card.querySelector('.benefits__icon');
            expect(icon).toBeInTheDocument();

            const titleEl = card.querySelector('h3.benefits__title');
            expect(titleEl).toBeInTheDocument();

            expect(titleEl?.textContent).toBe(expectedKeys[i]);
        });
    });
});
