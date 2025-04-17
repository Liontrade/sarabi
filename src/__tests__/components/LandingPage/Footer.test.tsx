import { render, screen } from '@testing-library/react';
import { FOOTER_COLUMNS } from '../../../constants/LandingPage/constants_footer';
import { BRAND_NAME, COPYRIGHT } from '../../../constants/strings';
import Footer from '../../../components/LandingPage/Footer/Footer';

describe('Footer component', () => {
    test('renders all footer columns with correct titles and links', () => {
        render(<Footer />);

        FOOTER_COLUMNS.forEach((column) => {
            const titleElement = screen.getByRole('heading', { level: 4, name: column.title });
            expect(titleElement).toBeInTheDocument();

            column.links.forEach((link) => {
                const linkElement = screen.getByRole('link', { name: link.label });
                expect(linkElement).toBeInTheDocument();
                expect(linkElement).toHaveAttribute('href', link.href);
            });
        });
    });

    test('displays copyright text with current year, brand name, and copyright notice', () => {
        const currentYear = new Date().getFullYear();
        render(<Footer />);
        const expectedText = `© ${currentYear} ${BRAND_NAME}. ${COPYRIGHT}`;
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});
