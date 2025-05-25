import { render, screen, fireEvent } from '@testing-library/react';
import LegalHelpSettings from '../../../components/Settings/LegalHelpSettings/LegalHelpSettings';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('<LegalHelpSettings />', () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });
    afterEach(() => {
        logSpy.mockRestore();
    });

    it('renders title, description and legal docs links', () => {
        render(<LegalHelpSettings />);

        expect(screen.getByRole('heading', { level: 2, name: 'title' })).toBeInTheDocument();
        expect(screen.getByText('description')).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 3, name: 'legal_docs_title' })).toBeInTheDocument();
        const privacy = screen.getByRole('link', { name: 'privacy_policy' });
        const terms = screen.getByRole('link', { name: 'terms_of_service' });
        expect(privacy).toHaveAttribute('href', '#privacy-policy');
        expect(terms).toHaveAttribute('href', '#terms-of-service');
    });

    it('toggles FAQ items on click', () => {
        render(<LegalHelpSettings />);

        expect(screen.getByRole('heading', { level: 3, name: 'faq_title' })).toBeInTheDocument();

        const qBtn = screen.getByRole('button', { name: 'faq_access_library' });
        const itemDiv = qBtn.closest('.faq-item')!;
        const ansText = 'faq_access_library_ans';

        expect(itemDiv).not.toHaveClass('expanded');
        expect(screen.getByText(ansText)).toBeInTheDocument();

        fireEvent.click(qBtn);
        expect(itemDiv).toHaveClass('expanded');

        fireEvent.click(qBtn);
        expect(itemDiv).not.toHaveClass('expanded');
    });

    it('renders contact support links', () => {
        render(<LegalHelpSettings />);

        expect(screen.getByRole('heading', { level: 3, name: 'contact_support_title' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'contact_email' })).toHaveAttribute('href', '#email');
        expect(screen.getByRole('link', { name: 'contact_chat' })).toHaveAttribute('href', '#chat');
        expect(screen.getByRole('link', { name: 'contact_call' })).toHaveAttribute('href', '#call');
    });

    it('handles Community button click', () => {
        render(<LegalHelpSettings />);

        expect(screen.getByRole('heading', { level: 3, name: 'community_title' })).toBeInTheDocument();
        expect(screen.getByText('community_text')).toBeInTheDocument();

        const btn = screen.getByRole('button', { name: 'community_button' });
        fireEvent.click(btn);
        expect(logSpy).toHaveBeenCalledWith('Community clicked');
    });

    it('handles View Release Notes button click', () => {
        render(<LegalHelpSettings />);

        expect(screen.getByRole('heading', { level: 3, name: 'app_version_title' })).toBeInTheDocument();

        expect(screen.getByText('current_version')).toBeInTheDocument();

        const btn = screen.getByRole('button', { name: 'view_release_notes' });
        fireEvent.click(btn);
        expect(logSpy).toHaveBeenCalledWith('View Release Notes');
    });
});
