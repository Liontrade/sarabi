import React from 'react';
import './Footer.css';
import { useTranslation } from 'react-i18next';
import { FOOTER_COLUMNS } from '../../../constants/LandingPage/constants_footer';

const Footer: React.FC = () => {
    const { t } = useTranslation('landing_footer');
    const { t: tCommon } = useTranslation('common');

    return (
        <footer className="footer">
            <div className="footer__container">
                {FOOTER_COLUMNS.map((col, i) => (
                    <div key={i} className="footer__column">
                        <h4>{t(col.titleKey)}</h4>
                        <ul>
                            {col.links.map((link, j) => (
                                <li key={j}>
                                    <a href={link.href}>{t(link.key)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="footer__bottom">
                <p>
                    &copy; {new Date().getFullYear()} {tCommon('brand_name')}. {t('copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
