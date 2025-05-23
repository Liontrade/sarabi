import { render, screen } from '@testing-library/react';
import { FOOTER_COLUMNS } from '../../../constants/LandingPage/constants_footer';
import Footer from '../../../components/LandingPage/Footer/Footer';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Footer component', () => {
    it('renders all footer columns with correct titles and links', () => {
        render(<Footer />);

        FOOTER_COLUMNS.forEach(column => {
            const titleEl = screen.getByRole('heading', {
                level: 4,
                name: column.titleKey,
            });
            expect(titleEl).toBeInTheDocument();

            column.links.forEach(link => {
                const linkEl = screen.getByRole('link', { name: link.key });
                expect(linkEl).toBeInTheDocument();
                expect(linkEl).toHaveAttribute('href', link.href);
            });
        });
    });

    it('displays copyright text with current year and translation keys', () => {
        const year = new Date().getFullYear();
        render(<Footer />);

        const expected = `© ${year} brand_name. copyright`;
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
