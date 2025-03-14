import React, { useState } from 'react';
import './NotificationSettings.css';

type UpdateFrequency = 'realtime' | 'daily' | 'weekly';

const NotificationSettings: React.FC = () => {
    const [pushNotifications, setPushNotifications] = useState<boolean>(true);
    const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
    const [smsNotifications, setSmsNotifications] = useState<boolean>(false);

    const [priceAlerts, setPriceAlerts] = useState<boolean>(true);
    const [breakingNews, setBreakingNews] = useState<boolean>(false);
    const [portfolioUpdates, setPortfolioUpdates] = useState<boolean>(true);
    const [earningsDividends, setEarningsDividends] = useState<boolean>(false);
    const [marketUpdates, setMarketUpdates] = useState<boolean>(false);

    const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequency>('realtime');

    const [quietHoursEnabled, setQuietHoursEnabled] = useState<boolean>(false);
    const [quietHoursStart, setQuietHoursStart] = useState<string>('22:00');
    const [quietHoursEnd, setQuietHoursEnd] = useState<string>('07:00');

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
            <h2>Notification Settings</h2>
            <p>Personalize your alert preferences</p>

            <div className="section">
                <h3>Delivery Methods</h3>
                <div className="toggle-row">
                    <div className="toggle-label">Push Notifications</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={pushNotifications}
                            onChange={e => setPushNotifications(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">Email</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={e => setEmailNotifications(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">SMS</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={smsNotifications}
                            onChange={e => setSmsNotifications(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="section">
                <h3>Alert Types</h3>

                <div className="toggle-row">
                    <div className="toggle-label">Price Alerts</div>
                    <label className="switch">
                        <input type="checkbox" checked={priceAlerts} onChange={e => setPriceAlerts(e.target.checked)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">Breaking News</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={breakingNews}
                            onChange={e => setBreakingNews(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">Portfolio Updates</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={portfolioUpdates}
                            onChange={e => setPortfolioUpdates(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">Earnings & Dividends</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={earningsDividends}
                            onChange={e => setEarningsDividends(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-row">
                    <div className="toggle-label">Market Updates</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={marketUpdates}
                            onChange={e => setMarketUpdates(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="section">
                <h3>Update Frequency</h3>
                <div className="frequency-options">
                    <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="realtime"
                            checked={updateFrequency === 'realtime'}
                            onChange={() => setUpdateFrequency('realtime')}
                        />
                        Real-Time
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="daily"
                            checked={updateFrequency === 'daily'}
                            onChange={() => setUpdateFrequency('daily')}
                        />
                        Daily Digest
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="frequency"
                            value="weekly"
                            checked={updateFrequency === 'weekly'}
                            onChange={() => setUpdateFrequency('weekly')}
                        />
                        Weekly
                    </label>
                </div>
            </div>

            <div className="section">
                <h3>Quiet Hours</h3>
                <div className="toggle-row">
                    <div className="toggle-label">Enable Quiet Hours</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={quietHoursEnabled}
                            onChange={e => setQuietHoursEnabled(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
                {quietHoursEnabled && (
                    <div className="quiet-hours-range">
                        <label>
                            Start:
                            <input
                                type="time"
                                value={quietHoursStart}
                                onChange={e => setQuietHoursStart(e.target.value)}
                            />
                        </label>
                        <label>
                            End:
                            <input type="time" value={quietHoursEnd} onChange={e => setQuietHoursEnd(e.target.value)} />
                        </label>
                    </div>
                )}
            </div>

            <div className="notification-settings__footer">
                <button className="save-changes-btn" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;
