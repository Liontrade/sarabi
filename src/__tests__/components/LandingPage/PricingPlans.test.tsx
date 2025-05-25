import { render, screen } from '@testing-library/react';
import PricingPlans from '../../../components/LandingPage/PricingPlans/PricingPlans';
import { PRICING_SECTION_ID } from '../../../constants/urls';
import { PRICING_PLANS } from '../../../constants/LandingPage/constants_pricing';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('PricingPlans component', () => {
    test('renders section title, intro, and correct id', () => {
        render(<PricingPlans />);

        const heading = screen.getByRole('heading', {
            level: 2,
            name: 'section_title',
        });
        expect(heading).toBeInTheDocument();

        const section = heading.closest('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', PRICING_SECTION_ID);

        const intro = screen.getByText('intro');
        expect(intro).toBeInTheDocument();
        expect(intro).toHaveClass('pricing-plans__intro');
    });

    test('renders all pricing plan cards with name, price, features, and button', () => {
        const { container } = render(<PricingPlans />);
        const cards = container.getElementsByClassName('pricing-plans__card');
        expect(cards).toHaveLength(PRICING_PLANS.length);

        PRICING_PLANS.forEach((plan, i) => {
            const card = cards[i] as HTMLElement;

            const nameEl = card.querySelector('h3');
            expect(nameEl).toBeInTheDocument();
            expect(nameEl?.textContent).toBe(plan.nameKey);

            const priceEl = card.querySelector('.pricing-plans__price');
            expect(priceEl).toBeInTheDocument();
            expect(priceEl?.textContent).toBe(plan.priceKey);

            const featureItems = card.querySelectorAll('.pricing-plans__features li');
            expect(featureItems).toHaveLength(plan.featureKeys.length);
            plan.featureKeys.forEach((fk, j) => {
                expect(featureItems[j].textContent).toBe(fk);
            });

            const button = card.querySelector('button');
            expect(button).toBeInTheDocument();
            expect(button?.textContent).toBe(plan.buttonKey);
            expect(button).toHaveClass('btn', 'pricing-plans__btn');
        });
    });
});
