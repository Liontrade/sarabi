import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../assets/logo_without_background.png';
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';

import {
    FOOTER_DESC,
    FOOTER_NEWSLETTER_LABEL,
    FOOTER_NEWSLETTER_PLACEHOLDER,
    FOOTER_SUBSCRIBE_BUTTON,
    FOOTER_EXPLORE_TITLE,
    FOOTER_SUPPORT_TITLE,
    FOOTER_COPYRIGHT,
    FOOTER_BACK_TO_TOP_ARIA,
} from '../../../constants/strings';
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
                    <p className="footer__desc">{FOOTER_DESC}</p>

                    <form className="footer__newsletter" onSubmit={handleSubscribe}>
                        <label htmlFor="newsletter-email">{FOOTER_NEWSLETTER_LABEL}</label>
                        <div className="newsletter__input-group">
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder={FOOTER_NEWSLETTER_PLACEHOLDER}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">{FOOTER_SUBSCRIBE_BUTTON}</button>
                        </div>
                    </form>
                </div>

                <div className="footer__col">
                    <h4>{FOOTER_EXPLORE_TITLE}</h4>
                    <ul>
                        <li>
                            <Link to={DASHBOARD_URL}>Dashboard</Link>
                        </li>
                        <li>
                            <Link to={MARKET_URL}>Market</Link>
                        </li>
                        <li>
                            <Link to={KNOWLEDGE_URL}>Knowledge Library</Link>
                        </li>
                        <li>
                            <Link to={NEWS_ALERTS_URL}>News Alerts</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4>{FOOTER_SUPPORT_TITLE}</h4>
                    <ul>
                        <li>
                            <Link to={HELP_CENTER_URL}>Help Center</Link>
                        </li>
                        <li>
                            <Link to={SECURITY_URL}>Security</Link>
                        </li>
                        <li>
                            <Link to={PRIVACY_URL}>Privacy</Link>
                        </li>
                        <li>
                            <Link to={TERMS_URL}>Terms</Link>
                        </li>
                        <li>
                            <Link to={CAREERS_URL}>Careers</Link>
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

            <div className="footer__bottom">
                <span>
                    &copy; {new Date().getFullYear()} LionTrade. {FOOTER_COPYRIGHT}
                </span>
                <button className="footer__back-to-top" onClick={scrollToTop} aria-label={FOOTER_BACK_TO_TOP_ARIA}>
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
