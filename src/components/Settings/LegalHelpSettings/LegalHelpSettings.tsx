import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './LegalHelpSettings.css';

interface FaqItem {
    key: string;
    q: string;
    a: string;
}

const LegalHelpSettings: React.FC = () => {
    const { t } = useTranslation('settings_legal_help_settings');
    const [expanded, setExpanded] = useState<string | null>(null);

    const faqs: FaqItem[] = [
        { key: 'faq_access_library', q: t('faq_access_library'), a: t('faq_access_library_ans') },
        { key: 'faq_available_courses', q: t('faq_available_courses'), a: t('faq_available_courses_ans') },
        { key: 'faq_ai_chatbot', q: t('faq_ai_chatbot'), a: t('faq_ai_chatbot_ans') },
        { key: 'faq_paper_trading', q: t('faq_paper_trading'), a: t('faq_paper_trading_ans') },
        { key: 'faq_progress_tracking', q: t('faq_progress_tracking'), a: t('faq_progress_tracking_ans') },
    ];

    const toggleFaq = (key: string) => setExpanded(expanded === key ? null : key);

    return (
        <div className="legal-help-settings">
            <h2>{t('title')}</h2>
            <p className="desc">{t('description')}</p>

            <div className="section card">
                <h3>{t('legal_docs_title')}</h3>
                <ul className="links-list">
                    <li>
                        <a href="#privacy-policy">{t('privacy_policy')}</a>
                    </li>
                    <li>
                        <a href="#terms-of-service">{t('terms_of_service')}</a>
                    </li>
                </ul>
            </div>

            <div className="section card">
                <h3>{t('faq_title')}</h3>
                {faqs.map(item => (
                    <div key={item.key} className={`faq-item ${expanded === item.key ? 'expanded' : ''}`}>
                        <button className="faq-question" onClick={() => toggleFaq(item.key)}>
                            <span>{item.q}</span>
                            {expanded === item.key ? (
                                <FiChevronUp className="faq-icon" />
                            ) : (
                                <FiChevronDown className="faq-icon" />
                            )}
                        </button>
                        <div className="faq-answer-wrapper">
                            <div className="faq-answer">{item.a}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section card">
                <h3>{t('contact_support_title')}</h3>
                <ul className="links-list">
                    <li>
                        <a href="#email">{t('contact_email')}</a>
                    </li>
                    <li>
                        <a href="#chat">{t('contact_chat')}</a>
                    </li>
                    <li>
                        <a href="#call">{t('contact_call')}</a>
                    </li>
                </ul>
            </div>

            <div className="section card">
                <h3>{t('community_title')}</h3>
                <p>{t('community_text')}</p>
                <button className="btn-community" onClick={() => console.log('Community clicked')}>
                    {t('community_button')}
                </button>
            </div>

            <div className="section card">
                <h3>{t('app_version_title')}</h3>
                <div className="version-info">
                    <span className="version">{t('current_version')}</span>
                    <button className="btn-release" onClick={() => console.log('View Release Notes')}>
                        {t('view_release_notes')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalHelpSettings;
