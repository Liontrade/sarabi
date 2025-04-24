import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../assets/logo_without_background.png';
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribe email:', email);
        // TODO: Send email to the server or handle subscription logic
        setEmail('');
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__col footer__col--brand">
                    <img src={logo} alt="LionTrade" className="footer__logo" />
                    <p className="footer__desc">
                        LionTrade – Twój przewodnik po świecie akcji. Analizy, rekomendacje i narzędzia wspierające
                        decyzje inwestycyjne.
                    </p>
                    <form className="footer__newsletter" onSubmit={handleSubscribe}>
                        <label htmlFor="newsletter-email">Join our newsletter</label>
                        <div className="newsletter__input-group">
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>

                <div className="footer__col">
                    <h4>Explore</h4>
                    <ul>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/market">Market</Link>
                        </li>
                        <li>
                            <Link to="/knowledge">Knowledge Library</Link>
                        </li>
                        <li>
                            <Link to="/summaries">Market Summaries</Link>
                        </li>
                        <li>
                            <Link to="/news-alerts">News Alerts</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4>Support</h4>
                    <ul>
                        <li>
                            <Link to="/help-center">Help Center</Link>
                        </li>
                        <li>
                            <Link to="/security">Security</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Privacy</Link>
                        </li>
                        <li>
                            <Link to="/terms">Terms</Link>
                        </li>
                        <li>
                            <Link to="/careers">Careers</Link>
                        </li>
                    </ul>

                    <div className="footer__social">
                        <a href="https://twitter.com" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://github.com" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <span>&copy; {new Date().getFullYear()} LionTrade. All rights reserved.</span>
                <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to top">
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
