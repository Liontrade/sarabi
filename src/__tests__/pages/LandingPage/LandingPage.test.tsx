import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LandingPage from '../../../pages/LandingPage/LandingPage';
import {
    BRAND_NAME,
    HOW_IT_WORKS_SECTION_TITLE,
    KEY_BENEFITS_SECTION_TITLE,
    JOIN_CTA_TITLE,
    PRICING_SECTION_TITLE,
} from '../../../constants/strings';
import { FOOTER_COLUMNS } from '../../../constants/LandingPage/constants_footer';
import { PRICING_SECTION_ID } from '../../../constants/urls';

describe('LandingPage integration', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>,
        );
    });

    test('renders Navbar with brand name', () => {
        const brand = screen.getByRole('heading', { level: 1, name: BRAND_NAME });
        expect(brand).toBeInTheDocument();
    });

    test('renders Hero section', () => {
        const heroTitle = screen.getByRole('heading', {
            level: 1,
            name: /LionTrade — Your AI Stock Market Companion/i,
        });
        expect(heroTitle).toBeInTheDocument();
    });

    test('renders KeyBenefits section', () => {
        const kbTitle = screen.getByRole('heading', {
            level: 2,
            name: KEY_BENEFITS_SECTION_TITLE,
        });
        expect(kbTitle).toBeInTheDocument();
    });

    test('renders PricingPlans section with correct ID and title', () => {
        const pricing = screen.getByRole('heading', {
            level: 2,
            name: PRICING_SECTION_TITLE,
        });
        expect(pricing).toBeInTheDocument();
        const section = pricing.closest('section');
        expect(section).toHaveAttribute('id', PRICING_SECTION_ID);
    });

    test('renders HowItWorks section', () => {
        const hiwTitle = screen.getByRole('heading', {
            level: 2,
            name: HOW_IT_WORKS_SECTION_TITLE,
        });
        expect(hiwTitle).toBeInTheDocument();
    });

    test('renders JoinCTA section', () => {
        const joinTitle = screen.getByRole('heading', {
            level: 2,
            name: JOIN_CTA_TITLE,
        });
        expect(joinTitle).toBeInTheDocument();
    });

    test('renders Footer with first column title', () => {
        const firstFooterTitle = screen.getByRole('heading', {
            level: 4,
            name: FOOTER_COLUMNS[0].title,
        });
        expect(firstFooterTitle).toBeInTheDocument();
    });

    test('renders sections in the correct order and includes Footer at the end', () => {
        const { container } = render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>,
        );

        const sections = container.querySelectorAll('section');
        expect(sections).toHaveLength(5);

        const classList = Array.from(sections).map(sec => sec.className);
        expect(classList).toEqual(['hero', 'key-benefits', 'pricing-plans', 'how-it-works', 'join-cta']);

        const footer = container.querySelector('footer.footer');
        expect(footer).toBeInTheDocument();
    });

    test('toggles navbar menu open and close within LandingPage', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>,
        );
        const toggle = container.querySelector('.navbar__toggle');
        const linksList = container.querySelector('.navbar__links');

        expect(toggle).toBeInTheDocument();
        expect(linksList).not.toHaveClass('navbar__links--active');

        await user.click(toggle!);
        expect(linksList).toHaveClass('navbar__links--active');

        await user.click(toggle!);
        expect(linksList).not.toHaveClass('navbar__links--active');
    });
});
