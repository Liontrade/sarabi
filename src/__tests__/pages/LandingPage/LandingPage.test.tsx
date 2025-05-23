import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../../pages/LandingPage/LandingPage';

jest.mock('../../../components/LandingPage/Navbar/Navbar', () => {
    const Mock = () => <div data-testid="navbar" />;
    Mock.displayName = 'MockNavbar';
    return Mock;
});
jest.mock('../../../components/LandingPage/Hero/Hero', () => {
    const Mock = () => <section data-testid="hero" />;
    Mock.displayName = 'MockHero';
    return Mock;
});
jest.mock('../../../components/LandingPage/KeyBenefits/KeyBenefits', () => {
    const Mock = () => <section data-testid="keybenefits" />;
    Mock.displayName = 'MockKeyBenefits';
    return Mock;
});
jest.mock('../../../components/LandingPage/PricingPlans/PricingPlans', () => {
    const Mock = () => <section data-testid="pricingplans" />;
    Mock.displayName = 'MockPricingPlans';
    return Mock;
});
jest.mock('../../../components/LandingPage/HowItWorks/HowItWorks', () => {
    const Mock = () => <section data-testid="howitworks" />;
    Mock.displayName = 'MockHowItWorks';
    return Mock;
});
jest.mock('../../../components/LandingPage/JoinCTA/JoinCTA', () => {
    const Mock = () => <section data-testid="joincta" />;
    Mock.displayName = 'MockJoinCTA';
    return Mock;
});
jest.mock('../../../components/LandingPage/Footer/Footer', () => {
    const Mock = () => <footer data-testid="footer" />;
    Mock.displayName = 'MockFooter';
    return Mock;
});

describe('LandingPage integration', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>,
        );
    });

    it('renders Navbar at the top', () => {
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('renders all main sections inside <main> in order', () => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();

        const order = ['hero', 'keybenefits', 'pricingplans', 'howitworks', 'joincta'];
        order.forEach(testId => {
            expect(within(main).getByTestId(testId)).toBeInTheDocument();
        });
    });

    it('renders Footer at the end', () => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
