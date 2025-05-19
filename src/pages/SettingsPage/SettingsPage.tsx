import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser, FiBell, FiShield, FiSliders, FiHelpCircle } from 'react-icons/fi';

import ProfileSettings from '../../components/Settings/ProfileSettings/ProfileSettings';
import NotificationSettings from '../../components/Settings/NotificationSettings/NotificationSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings/SecuritySettings';
import InterfaceSettings from '../../components/Settings/InterfaceSettings/InterfaceSettings';
import LegalHelpSettings from '../../components/Settings/LegalHelpSettings/LegalHelpSettings';

import Footer from '../../components/HomeDashboardPage/Footer/Footer';
import Navbar from '../../components/HomeDashboardPage/Navbar/Navbar';

import './SettingsPage.css';

const tabs = [
    { key: 'profile', icon: <FiUser />, comp: ProfileSettings },
    { key: 'notification', icon: <FiBell />, comp: NotificationSettings },
    { key: 'security', icon: <FiShield />, comp: SecuritySettings },
    { key: 'interface', icon: <FiSliders />, comp: InterfaceSettings },
    { key: 'legal', icon: <FiHelpCircle />, comp: LegalHelpSettings },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const SettingsPage: React.FC = () => {
    const { t } = useTranslation('settings_page');
    const [activeTab, setActiveTab] = useState<TabKey>('profile');

    const ActiveComponent = tabs.find(tab => tab.key === activeTab)!.comp;

    return (
        <div className="settings-page">
            <Navbar />

            <div className="settings-page__container">
                <nav className="settings-page__sidebar">
                    <ul>
                        {tabs.map(({ key, icon }) => (
                            <li
                                key={key}
                                className={key === activeTab ? 'active' : ''}
                                onClick={() => setActiveTab(key)}
                                role="button"
                                aria-selected={key === activeTab}
                            >
                                <span className="tab-icon">{icon}</span>
                                <span className="tab-label">{t(`tabs.${key}`)}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="settings-page__content">
                    <div key={activeTab} className="fade-in">
                        <ActiveComponent />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;
