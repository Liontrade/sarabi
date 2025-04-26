import tslaLogo from '../../assets/logos/tsla-logo.png';
import aaplLogo from '../../assets/logos/aapl-logo.png';
import amznLogo from '../../assets/logos/amzn-logo.png';
import googlLogo from '../../assets/logos/googl-logo.png';

export interface Stock {
    ticker: string;
    name: string;
    price: string;
    change: string;
    logo: string;
    reason: string;
}

export const RECOMMENDED_STOCKS: Stock[] = [
    {
        ticker: 'TSLA',
        name: 'Tesla Inc.',
        price: '$1,200',
        change: '+3.2%',
        logo: tslaLogo,
        reason: 'Electric vehicles',
    },
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: '$150',
        change: '+5.0%',
        logo: aaplLogo,
        reason: 'Smartphones',
    },
    {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.',
        price: '$3,000',
        change: '+1.3%',
        logo: amznLogo,
        reason: 'E-commerce',
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: '$2,500',
        change: '+0.9%',
        logo: googlLogo,
        reason: 'Search',
    },
];
