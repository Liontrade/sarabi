import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../assets/logo_without_background.png';
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import {
    DASHBOARD_URL,
    MARKET_URL,
    KNOWLEDGE_URL,
    NEWS_ALERTS_URL,
    HELP_CENTER_URL,
    SECURITY_URL,
    PRIVACY_URL,
    TERMS_URL,
    CAREERS_URL,
    TWITTER_URL,
    GITHUB_URL,
    LINKEDIN_URL,
} from '../../../constants/urls';

const Footer: React.FC = () => {
    const { t } = useTranslation('home_dashboard_footer');
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribe email:', email);
        setEmail('');
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__col footer__col--brand">
                    <img src={logo} alt="LionTrade" className="footer__logo" />
                    <p className="footer__desc">{t('desc')}</p>

                    <form className="footer__newsletter" onSubmit={handleSubscribe}>
                        <label htmlFor="newsletter-email">{t('newsletter_label')}</label>
                        <div className="newsletter__input-group">
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder={t('newsletter_placeholder')}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">{t('subscribe_button')}</button>
                        </div>
                    </form>
                </div>

                <div className="footer__col">
                    <h4>{t('explore_title')}</h4>
                    <ul>
                        <li>
                            <Link to={DASHBOARD_URL}>{t('link_dashboard')}</Link>
                        </li>
                        <li>
                            <Link to={MARKET_URL}>{t('link_market')}</Link>
                        </li>
                        <li>
                            <Link to={KNOWLEDGE_URL}>{t('link_knowledge')}</Link>
                        </li>
                        <li>
                            <Link to={NEWS_ALERTS_URL}>{t('link_news_alerts')}</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4>{t('support_title')}</h4>
                    <ul>
                        <li>
                            <Link to={HELP_CENTER_URL}>{t('link_help_center')}</Link>
                        </li>
                        <li>
                            <Link to={SECURITY_URL}>{t('link_security')}</Link>
                        </li>
                        <li>
                            <Link to={PRIVACY_URL}>{t('link_privacy')}</Link>
                        </li>
                        <li>
                            <Link to={TERMS_URL}>{t('link_terms')}</Link>
                        </li>
                        <li>
                            <Link to={CAREERS_URL}>{t('link_careers')}</Link>
                        </li>
                    </ul>

                    <div className="footer__social">
                        <a href={TWITTER_URL} aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href={GITHUB_URL} aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href={LINKEDIN_URL} aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer__bottom">
                <span>
                    &copy; {new Date().getFullYear()} LionTrade. {t('copyright')}
                </span>
                <button className="footer__back-to-top" onClick={scrollToTop} aria-label={t('back_to_top_aria')}>
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
