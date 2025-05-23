import { render, screen } from '@testing-library/react';
import JoinCTA from '../../../components/LandingPage/JoinCTA/JoinCTA';
import { JOIN_CTA_ID } from '../../../constants/urls';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('JoinCTA component', () => {
    it('renders section with correct id and classes', () => {
        const { container } = render(<JoinCTA />);
        const section = container.querySelector('section.join-cta');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', JOIN_CTA_ID);
    });

    it('renders title, subtitle, and button with correct text and classes', () => {
        render(<JoinCTA />);

        const title = screen.getByRole('heading', {
            level: 2,
            name: 'title',
        });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('join-cta__title');

        const subtitle = screen.getByText('subtitle');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('join-cta__subtitle');

        const button = screen.getByRole('button', { name: 'button' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn', 'join-cta__btn');
    });
});
