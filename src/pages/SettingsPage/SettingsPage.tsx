import React, { useState } from 'react';
import ProfileSettings from '../../components/Settings/ProfileSettings/ProfileSettings';
import InvestmentPreferencesSettings from '../../components/Settings/InvestmentPreferncesSettings/InvestmentPreferencesSettings';
import NotificationSettings from '../../components/Settings/NotificationSettings/NotificationSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings/SecuritySettings';
import InterfaceSettings from '../../components/Settings/InterfaceSettings/InterfaceSettings';
import LegalHelpSettings from '../../components/Settings/LegalHelpSettings/LegalHelpSettings';

import Footer from '../../components/HomeDashboard/Footer/Footer';
import Navbar from '../../components/HomeDashboard/Navbar/Navbar';

import './SettingsPage.css';

const SettingsPage: React.FC = () => {
    type TabType = 'profile' | 'investment' | 'notification' | 'security' | 'interface' | 'legal';
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    return (
        <div className="settings-page">
            <Navbar />

            <div className="settings-page__container">
                <nav className="settings-page__sidebar">
                    <ul>
                        <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                            Profile
                        </li>
                        <li
                            className={activeTab === 'investment' ? 'active' : ''}
                            onClick={() => setActiveTab('investment')}
                        >
                            Investment Preferences
                        </li>
                        <li
                            className={activeTab === 'notification' ? 'active' : ''}
                            onClick={() => setActiveTab('notification')}
                        >
                            Notification
                        </li>
                        <li
                            className={activeTab === 'security' ? 'active' : ''}
                            onClick={() => setActiveTab('security')}
                        >
                            Security
                        </li>
                        <li
                            className={activeTab === 'interface' ? 'active' : ''}
                            onClick={() => setActiveTab('interface')}
                        >
                            Interface
                        </li>
                        <li className={activeTab === 'legal' ? 'active' : ''} onClick={() => setActiveTab('legal')}>
                            Legal &amp; Help
                        </li>
                    </ul>
                </nav>

                <div className="settings-page__content">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'investment' && <InvestmentPreferencesSettings />}
                    {activeTab === 'notification' && <NotificationSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'interface' && <InterfaceSettings />}
                    {activeTab === 'legal' && <LegalHelpSettings />}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;
