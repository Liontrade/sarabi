import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../../../pages/NotFoundPage/NotFoundPage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('<NotFoundPage />', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders image, title, text and button with correct alt/content/classes', () => {
        render(<NotFoundPage />);

        const img = screen.getByAltText('image_alt');
        expect(img).toBeInTheDocument();
        expect(img.tagName).toBe('IMG');
        expect(img).toHaveClass('notfound-image');

        const heading = screen.getByRole('heading', { level: 1, name: 'title' });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('notfound-title');

        const text = screen.getByText('text');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('notfound-text');

        const button = screen.getByRole('button', { name: 'button' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('notfound-button');
    });

    it('navigates back when the button is clicked', () => {
        render(<NotFoundPage />);
        fireEvent.click(screen.getByRole('button', { name: 'button' }));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
