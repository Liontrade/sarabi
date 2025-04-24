import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import jungleKingImg from '../../assets/page-not-found.png';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="notfound-container">
            <img src={jungleKingImg} alt="Król dżungli" className="notfound-image" />
            <h1 className="notfound-title">Ups! Nawet król dżungli tego nie odkrył</h1>
            <p className="notfound-text">Strona, której szukasz, zaginęła na sawannie…</p>
            <button className="notfound-button" onClick={() => navigate(-1)}>
                Wróć do poprzedniej strony
            </button>
        </div>
    );
};

export default NotFound;
