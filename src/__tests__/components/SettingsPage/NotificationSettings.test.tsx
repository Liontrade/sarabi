import { render, screen, fireEvent } from '@testing-library/react';
import NotificationSettings from '../../../components/Settings/NotificationSettings/NotificationSettings';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

describe('<NotificationSettings />', () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });
    afterEach(() => {
        logSpy.mockRestore();
    });

    it('renders headings, description and section titles', () => {
        render(<NotificationSettings />);

        expect(screen.getByRole('heading', { level: 2, name: 'title' })).toBeInTheDocument();
        expect(screen.getByText('description')).toBeInTheDocument();

        ['section_delivery', 'section_alert_types', 'section_frequency', 'section_quiet_hours'].forEach(key => {
            expect(screen.getByRole('heading', { level: 3, name: key })).toBeInTheDocument();
        });
    });

    it('delivery toggles have correct default checked states and can be toggled', () => {
        render(<NotificationSettings />);

        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).toBeChecked();
        expect(checkboxes[2]).not.toBeChecked();

        fireEvent.click(checkboxes[2]);
        expect(checkboxes[2]).toBeChecked();
    });

    it('alert toggles have correct default and can be toggled', () => {
        render(<NotificationSettings />);

        const checkboxes = screen.getAllByRole('checkbox');

        expect(checkboxes[3]).toBeChecked();
        expect(checkboxes[4]).not.toBeChecked();
        expect(checkboxes[5]).toBeChecked();
        expect(checkboxes[6]).not.toBeChecked();
        expect(checkboxes[7]).not.toBeChecked();

        fireEvent.click(checkboxes[4]);
        expect(checkboxes[4]).toBeChecked();
    });

    it('frequency radios default to realtime and can switch', () => {
        render(<NotificationSettings />);

        const realtime = screen.getByLabelText('freq_realtime') as HTMLInputElement;
        const daily = screen.getByLabelText('freq_daily') as HTMLInputElement;
        const weekly = screen.getByLabelText('freq_weekly') as HTMLInputElement;

        expect(realtime.checked).toBe(true);
        expect(daily.checked).toBe(false);
        expect(weekly.checked).toBe(false);

        fireEvent.click(daily);
        expect(daily.checked).toBe(true);
        expect(realtime.checked).toBe(false);

        fireEvent.click(weekly);
        expect(weekly.checked).toBe(true);
    });

    it('quiet-hours inputs appear only when enabled and can be changed', () => {
        render(<NotificationSettings />);

        const checkboxes = screen.getAllByRole('checkbox');
        const quietEnable = checkboxes[8]; // the ninth checkbox

        expect(screen.queryByLabelText('quiet_start:')).toBeNull();
        expect(screen.queryByLabelText('quiet_end:')).toBeNull();

        fireEvent.click(quietEnable);
        const startInput = screen.getByLabelText('quiet_start:') as HTMLInputElement;
        const endInput = screen.getByLabelText('quiet_end:') as HTMLInputElement;

        expect(startInput.value).toBe('22:00');
        expect(endInput.value).toBe('07:00');

        fireEvent.change(startInput, { target: { value: '20:30' } });
        fireEvent.change(endInput, { target: { value: '06:15' } });
        expect(startInput.value).toBe('20:30');
        expect(endInput.value).toBe('06:15');
    });

    it('clicking Save logs all current settings', () => {
        render(<NotificationSettings />);

        const checkboxes = screen.getAllByRole('checkbox');
        const daily = screen.getByLabelText('freq_daily') as HTMLInputElement;
        const quietEnable = checkboxes[8];

        fireEvent.click(checkboxes[2]);
        fireEvent.click(checkboxes[4]);
        fireEvent.click(daily);
        fireEvent.click(quietEnable);

        fireEvent.change(screen.getByLabelText('quiet_start:'), { target: { value: '21:00' } });
        fireEvent.change(screen.getByLabelText('quiet_end:'), { target: { value: '05:00' } });

        fireEvent.click(screen.getByRole('button', { name: 'save_button' }));

        expect(logSpy).toHaveBeenCalledWith('Saving Notification Settings:', {
            pushNotifications: true,
            emailNotifications: true,
            smsNotifications: true,
            priceAlerts: true,
            breakingNews: true,
            portfolioUpdates: true,
            earningsDividends: false,
            marketUpdates: false,
            updateFrequency: 'daily',
            quietHoursEnabled: true,
            quietHoursStart: '21:00',
            quietHoursEnd: '05:00',
        });
    });
});
