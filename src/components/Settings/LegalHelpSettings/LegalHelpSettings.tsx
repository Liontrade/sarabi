import React, { useState } from 'react';
import './LegalHelpSettings.css';

interface FaqItem {
    question: string;
    answer: string;
}

const LegalHelpSettings: React.FC = () => {
    const [faqs] = useState<FaqItem[]>([
        {
            question: 'What is LionTrade?',
            answer: 'LionTrade is a brokerage platform that offers commission-free trading in stocks, options, ETFs, and cryptocurrency. Users can fund their accounts with bank transfers, wire transfers, or other supported methods.',
        },
        {
            question: 'How do I create an account?',
            answer: 'You can create an account by downloading the LionTrade app or visiting our website, clicking "Sign Up," and following the on-screen instructions to provide your personal details and verify your identity.',
        },
        {
            question: 'What types of accounts does LionTrade offer?',
            answer: 'LionTrade offers individual brokerage accounts, retirement accounts (e.g., IRA), and custodial accounts for minors, among others.',
        },
    ]);

    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    const toggleFaq = (question: string) => {
        if (expandedQuestion === question) {
            setExpandedQuestion(null);
        } else {
            setExpandedQuestion(question);
        }
    };

    const handleViewReleaseNotes = () => {
        console.log('Viewing release notes...');
    };

    return (
        <div className="legal-help-settings">
            <h2>Legal &amp; Help</h2>
            <p>Find legal documents, FAQs, and ways to contact support</p>

            <div className="section legal-docs">
                <h3>Legal Documents</h3>
                <ul>
                    <li>
                        <a href="#privacy-policy" onClick={() => console.log('Open Privacy Policy')}>
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#terms-of-service" onClick={() => console.log('Open Terms of Service')}>
                            Terms of Service
                        </a>
                    </li>
                </ul>
            </div>

            <div className="section faq">
                <h3>FAQ</h3>
                <div className="faq-list">
                    {faqs.map(item => (
                        <div key={item.question} className="faq-item">
                            <button className="faq-question" onClick={() => toggleFaq(item.question)}>
                                {item.question}
                                <span className="faq-icon">{expandedQuestion === item.question ? '▲' : '▼'}</span>
                            </button>
                            {expandedQuestion === item.question && <div className="faq-answer">{item.answer}</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="section contact-support">
                <h3>Contact Support</h3>
                <ul>
                    <li>
                        <a href="#email-support" onClick={() => console.log('Email Support')}>
                            Email Support
                        </a>
                    </li>
                    <li>
                        <a href="#chat" onClick={() => console.log('Chat with Us')}>
                            Chat with Us
                        </a>
                    </li>
                    <li>
                        <a href="#call-us" onClick={() => console.log('Call Us')}>
                            Call Us
                        </a>
                    </li>
                </ul>
            </div>

            <div className="section community">
                <h3>Community</h3>
                <p>Join the LionTrade Community to connect with fellow traders and share insights.</p>
                <a
                    href="#liontrade-community"
                    className="btn-community"
                    onClick={() => console.log('LionTrade Community clicked')}
                >
                    LionTrade Community
                </a>
            </div>

            <div className="section app-version">
                <h3>App Version</h3>
                <div className="version-info">
                    <span>v1.2.0</span>
                    <button className="btn btn-primary" onClick={handleViewReleaseNotes}>
                        View Release Notes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalHelpSettings;
