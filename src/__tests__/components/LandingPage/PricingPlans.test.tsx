import { render, screen } from '@testing-library/react';
import PricingPlans from '../../../components/LandingPage/PricingPlans/PricingPlans';
import { PRICING_SECTION_ID } from '../../../constants/urls';
import { PRICING_SECTION_TITLE, PRICING_INTRO } from '../../../constants/strings';
import { PRICING_PLANS } from '../../../constants/LandingPage/constants_pricing';

describe('PricingPlans component', () => {
    test('renders section title, intro, and correct id', () => {
        render(<PricingPlans />);

        const heading = screen.getByRole('heading', {
            level: 2,
            name: PRICING_SECTION_TITLE,
        });
        expect(heading).toBeInTheDocument();

        const section = heading.closest('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', PRICING_SECTION_ID);

        const intro = screen.getByText(PRICING_INTRO);
        expect(intro).toBeInTheDocument();
        expect(intro).toHaveClass('pricing-plans__intro');
    });

    test('renders all pricing plan cards with name, price, features, and button', () => {
        const { container } = render(<PricingPlans />);
        const cards = container.getElementsByClassName('pricing-plans__card');
        expect(cards.length).toBe(PRICING_PLANS.length);

        PRICING_PLANS.forEach((plan, i) => {
            const card = cards[i];

            const nameEl = card.querySelector('h3');
            expect(nameEl).toBeInTheDocument();
            expect(nameEl?.textContent).toBe(plan.name);

            const priceEl = card.querySelector('.pricing-plans__price');
            expect(priceEl).toBeInTheDocument();
            expect(priceEl?.textContent).toBe(plan.price);

            const featureItems = card.querySelectorAll('.pricing-plans__features li');
            expect(featureItems.length).toBe(plan.features.length);
            plan.features.forEach((feature, j) => {
                expect(featureItems[j].textContent).toBe(feature);
            });

            const button = card.querySelector('button');
            expect(button).toBeInTheDocument();
            expect(button?.textContent).toBe(plan.buttonLabel);
            expect(button).toHaveClass('btn', 'pricing-plans__btn');
        });
    });
});
