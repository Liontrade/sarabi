import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from '../../../pages/SettingsPage/SettingsPage';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../components/HomeDashboardPage/Navbar/Navbar', () => ({
    __esModule: true,
    default: () => <div data-testid="Navbar">Navbar</div>,
}));

jest.mock('../../../components/HomeDashboardPage/Footer/Footer', () => ({
    __esModule: true,
    default: () => <div data-testid="Footer">Footer</div>,
}));

jest.mock('../../../components/Settings/ProfileSettings/ProfileSettings', () => ({
    __esModule: true,
    default: () => <div data-testid="ProfileSettings">ProfileSettings</div>,
}));

jest.mock('../../../components/Settings/NotificationSettings/NotificationSettings', () => ({
    __esModule: true,
    default: () => <div data-testid="NotificationSettings">NotificationSettings</div>,
}));

jest.mock('../../../components/Settings/SecuritySettings/SecuritySettings', () => ({
    __esModule: true,
    default: () => <div data-testid="SecuritySettings">SecuritySettings</div>,
}));

jest.mock('../../../components/Settings/InterfaceSettings/InterfaceSettings', () => ({
    __esModule: true,
    default: () => <div data-testid="InterfaceSettings">InterfaceSettings</div>,
}));

jest.mock('../../../components/Settings/LegalHelpSettings/LegalHelpSettings', () => ({
    __esModule: true,
    default: () => <div data-testid="LegalHelpSettings">LegalHelpSettings</div>,
}));

describe('<SettingsPage />', () => {
    let scrollSpy: jest.SpyInstance;

    beforeEach(() => {
        scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    });

    afterEach(() => {
        scrollSpy.mockRestore();
    });

    it('renders Navbar, Footer, and ProfileSettings by default, and calls scrollTo once', () => {
        render(<SettingsPage />);

        expect(screen.getByTestId('Navbar')).toBeInTheDocument();
        expect(screen.getByTestId('Footer')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileSettings')).toBeInTheDocument();

        const profileTab = screen.getByRole('button', {
            name: 'tabs.profile',
        });
        expect(profileTab).toHaveAttribute('aria-selected', 'true');
        expect(profileTab).toHaveClass('active');

        expect(scrollSpy).toHaveBeenCalledTimes(1);
        expect(scrollSpy).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });

    const tabData = [
        {
            key: 'notification',
            label: 'tabs.notification',
            testId: 'NotificationSettings',
        },
        {
            key: 'security',
            label: 'tabs.security',
            testId: 'SecuritySettings',
        },
        {
            key: 'interface',
            label: 'tabs.interface',
            testId: 'InterfaceSettings',
        },
        {
            key: 'legal',
            label: 'tabs.legal',
            testId: 'LegalHelpSettings',
        },
    ] as const;

    tabData.forEach(({ key, label, testId }) => {
        it(`activates the "${key}" tab when clicked`, () => {
            render(<SettingsPage />);

            const tabButton = screen.getByRole('button', { name: label });
            fireEvent.click(tabButton);

            expect(screen.getByTestId(testId)).toBeInTheDocument();
            expect(tabButton).toHaveAttribute('aria-selected', 'true');
            expect(tabButton).toHaveClass('active');

            const profileTab = screen.getByRole('button', {
                name: 'tabs.profile',
            });
            expect(profileTab).toHaveAttribute('aria-selected', 'false');
            expect(profileTab).not.toHaveClass('active');

            expect(scrollSpy).toHaveBeenCalledWith({
                top: 0,
                behavior: 'smooth',
            });
        });
    });
});
