import { MdDashboard, MdMenuBook, MdBarChart, MdNotifications, MdSettings, MdHelpOutline } from 'react-icons/md';

import { DASHBOARD_URL, KNOWLEDGE_URL, MARKET_URL, NEWS_ALERTS_URL, SETTINGS_URL, HELP_FEEDBACK_URL } from '../urls';

import {
    NAV_DASHBOARD_LABEL,
    NAV_KNOWLEDGE_LABEL,
    NAV_MARKET_LABEL,
    NAV_NEWS_ALERTS_LABEL,
    SETTINGS_LABEL,
    HELP_FEEDBACK_LABEL,
} from '../strings';
import { IconType } from 'react-icons';

export interface SidebarLink {
    to: string;
    label: string;
    icon: IconType;
}

export const MAIN_LINKS: SidebarLink[] = [
    { to: DASHBOARD_URL, label: NAV_DASHBOARD_LABEL, icon: MdDashboard },
    { to: KNOWLEDGE_URL, label: NAV_KNOWLEDGE_LABEL, icon: MdMenuBook },
    { to: MARKET_URL, label: NAV_MARKET_LABEL, icon: MdBarChart },
    { to: NEWS_ALERTS_URL, label: NAV_NEWS_ALERTS_LABEL, icon: MdNotifications },
];

export const SUPPORT_LINKS: SidebarLink[] = [
    { to: SETTINGS_URL, label: SETTINGS_LABEL, icon: MdSettings },
    { to: HELP_FEEDBACK_URL, label: HELP_FEEDBACK_LABEL, icon: MdHelpOutline },
];
