import aaplLogo from '../../assets/logos/aapl-logo.png';
import tslaLogo from '../../assets/logos/tsla-logo.png';
import amznLogo from '../../assets/logos/amzn-logo.png';
import googlLogo from '../../assets/logos/googl-logo.png';

export interface TrendingStock {
    symbol: string;
    change: string;
    logo: string;
}

export const TRENDING_STOCKS: TrendingStock[] = [
    { symbol: 'AAPL', change: '+5%', logo: aaplLogo },
    { symbol: 'TSLA', change: '-3%', logo: tslaLogo },
    { symbol: 'AMZN', change: '+2.5%', logo: amznLogo },
    { symbol: 'GOOGL', change: '+1.2%', logo: googlLogo },
];
