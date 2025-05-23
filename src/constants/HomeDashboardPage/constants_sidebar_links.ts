import { DASHBOARD_URL, KNOWLEDGE_URL, MARKET_URL, NEWS_ALERTS_URL, SETTINGS_URL, HELP_FEEDBACK_URL } from '../urls';
import { IconType } from 'react-icons';
import { MdDashboard, MdMenuBook, MdBarChart, MdNotifications, MdSettings, MdHelpOutline } from 'react-icons/md';

export interface SidebarLink {
    to: string;
    labelKey: string;
    icon: IconType;
}

export const MAIN_LINKS: SidebarLink[] = [
    { to: DASHBOARD_URL, labelKey: 'link_dashboard', icon: MdDashboard },
    { to: KNOWLEDGE_URL, labelKey: 'link_knowledge', icon: MdMenuBook },
    { to: MARKET_URL, labelKey: 'link_market', icon: MdBarChart },
    { to: NEWS_ALERTS_URL, labelKey: 'link_news_alerts', icon: MdNotifications },
];

export const SUPPORT_LINKS: SidebarLink[] = [
    { to: SETTINGS_URL, labelKey: 'link_settings', icon: MdSettings },
    { to: HELP_FEEDBACK_URL, labelKey: 'link_help_feedback', icon: MdHelpOutline },
];
