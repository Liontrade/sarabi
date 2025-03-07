import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Features</h4>
                    <ul>
                        <li><a href="#">AI Predictions</a></li>
                        <li><a href="#">Live Insights</a></li>
                        <li><a href="#">Portfolio Management</a></li>
                        <li><a href="#">Custom Alerts</a></li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Tutorials</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Help Center</a></li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} LionTrade. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
