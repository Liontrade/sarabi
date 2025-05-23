import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './NotificationSettings.css';

type UpdateFrequency = 'realtime' | 'daily' | 'weekly';
type ToggleSetter = React.Dispatch<React.SetStateAction<boolean>>;
type Toggle = [key: string, value: boolean, setter: ToggleSetter];

const NotificationSettings: React.FC = () => {
    const { t } = useTranslation('settings_notification_settings');

    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    const [priceAlerts, setPriceAlerts] = useState(true);
    const [breakingNews, setBreakingNews] = useState(false);
    const [portfolioUpdates, setPortfolioUpdates] = useState(true);
    const [earningsDividends, setEarningsDividends] = useState(false);
    const [marketUpdates, setMarketUpdates] = useState(false);

    const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequency>('realtime');

    const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
    const [quietHoursStart, setQuietHoursStart] = useState('22:00');
    const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

    const deliveryToggles: Toggle[] = [
        ['delivery_push', pushNotifications, setPushNotifications],
        ['delivery_email', emailNotifications, setEmailNotifications],
        ['delivery_sms', smsNotifications, setSmsNotifications],
    ];

    const alertToggles: Toggle[] = [
        ['alert_price', priceAlerts, setPriceAlerts],
        ['alert_breaking', breakingNews, setBreakingNews],
        ['alert_portfolio', portfolioUpdates, setPortfolioUpdates],
        ['alert_earnings', earningsDividends, setEarningsDividends],
        ['alert_market', marketUpdates, setMarketUpdates],
    ];

    const handleSaveChanges = () => {
        console.log('Saving Notification Settings:', {
            pushNotifications,
            emailNotifications,
            smsNotifications,
            priceAlerts,
            breakingNews,
            portfolioUpdates,
            earningsDividends,
            marketUpdates,
            updateFrequency,
            quietHoursEnabled,
            quietHoursStart,
            quietHoursEnd,
        });
    };

    return (
        <div className="notification-settings">
            <h2>{t('title')}</h2>
            <p className="desc">{t('description')}</p>

            <div className="section card">
                <h3>{t('section_delivery')}</h3>
                {deliveryToggles.map(([key, val, setter]) => (
                    <div key={key} className="toggle-row">
                        <div className="toggle-label">{t(key)}</div>
                        <label className="switch">
                            <input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} />
                            <span className="slider round" />
                        </label>
                    </div>
                ))}
            </div>

            <div className="section card">
                <h3>{t('section_alert_types')}</h3>
                {alertToggles.map(([key, val, setter]) => (
                    <div key={key} className="toggle-row">
                        <div className="toggle-label">{t(key)}</div>
                        <label className="switch">
                            <input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} />
                            <span className="slider round" />
                        </label>
                    </div>
                ))}
            </div>

            <div className="section card">
                <h3>{t('section_frequency')}</h3>
                <div className="frequency-options">
                    {(['realtime', 'daily', 'weekly'] as UpdateFrequency[]).map(opt => (
                        <label key={opt}>
                            <input
                                type="radio"
                                name="frequency"
                                value={opt}
                                checked={updateFrequency === opt}
                                onChange={() => setUpdateFrequency(opt)}
                            />
                            {t(`freq_${opt}`)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="section card">
                <h3>{t('section_quiet_hours')}</h3>
                <div className="toggle-row">
                    <div className="toggle-label">{t('quiet_enable')}</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={quietHoursEnabled}
                            onChange={e => setQuietHoursEnabled(e.target.checked)}
                        />
                        <span className="slider round" />
                    </label>
                </div>
                {quietHoursEnabled && (
                    <div className="quiet-hours-range">
                        <label>
                            {t('quiet_start')}:
                            <input
                                type="time"
                                value={quietHoursStart}
                                onChange={e => setQuietHoursStart(e.target.value)}
                            />
                        </label>
                        <label>
                            {t('quiet_end')}:
                            <input type="time" value={quietHoursEnd} onChange={e => setQuietHoursEnd(e.target.value)} />
                        </label>
                    </div>
                )}
            </div>

            <div className="notification-settings__footer">
                <button className="btn-save" onClick={handleSaveChanges}>
                    {t('save_button')}
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;
