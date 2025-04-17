import { render, screen } from '@testing-library/react';
import JoinCTA from '../../../components/LandingPage/JoinCTA/JoinCTA';
import {
    JOIN_CTA_TITLE,
    JOIN_CTA_SUBTITLE,
    JOIN_CTA_BUTTON,
} from '../../../constants/strings';
import { JOIN_CTA_ID } from '../../../constants/urls';

describe('JoinCTA component', () => {
    test('renders section with correct id and classes', () => {
        const { container } = render(<JoinCTA />);
        const section = container.querySelector('section.join-cta');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', JOIN_CTA_ID);
    });

    test('renders title, subtitle, and button with correct text and classes', () => {
        render(<JoinCTA />);

        const title = screen.getByRole('heading', {
            level: 2,
            name: JOIN_CTA_TITLE,
        });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('join-cta__title');

        const subtitle = screen.getByText(JOIN_CTA_SUBTITLE);
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('join-cta__subtitle');

        const button = screen.getByRole('button', { name: JOIN_CTA_BUTTON });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn', 'join-cta__btn');
    });
});
