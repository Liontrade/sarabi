import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFoundPage.css';
import jungleKingImg from '../../assets/page-not-found.png';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('not_found_page');

    return (
        <div className="notfound-container">
            <img src={jungleKingImg} alt={t('image_alt')} className="notfound-image" />
            <h1 className="notfound-title">{t('title')}</h1>
            <p className="notfound-text">{t('text')}</p>
            <button className="notfound-button" onClick={() => navigate(-1)}>
                {t('button')}
            </button>
        </div>
    );
};

export default NotFoundPage;
