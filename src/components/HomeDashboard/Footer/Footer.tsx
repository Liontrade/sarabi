import React from 'react';
import './Footer.css';

import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#about">About</a>
        <a href="#careers">Careers</a>
        <a href="#security">Security</a>
        <a href="#help-center">Help Center</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>

      <div className="footer__social">
        <FaTwitter className="footer__icon" />
        <FaGithub className="footer__icon" />
        <FaLinkedin className="footer__icon" />
      </div>

      <div className="footer__bottom">&copy; 2025 LionTrade</div>
    </footer>
  );
};

export default Footer;
