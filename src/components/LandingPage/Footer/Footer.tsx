import React from 'react';
import './Footer.css';
import { FOOTER_COLUMNS } from '../../../constants/LandingPage/constants_footer';
import { BRAND_NAME, COPYRIGHT } from '../../../constants/strings';

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer__container">
            {FOOTER_COLUMNS.map((col, i) => (
                <div key={i} className="footer__column">
                    <h4>{col.title}</h4>
                    <ul>
                        {col.links.map((link, j) => (
                            <li key={j}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className="footer__bottom">
            <p>
                &copy; {new Date().getFullYear()} {BRAND_NAME()}. {COPYRIGHT()}
            </p>
        </div>
    </footer>
);

export default Footer;
