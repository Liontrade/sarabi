import React, { useState } from 'react';
import MarketFilterBar from '../../components/Market/MarketFilterBar/MarketFilterBar';
import MarketList from '../../components/Market/MarketList/MarketList';
import './MarketPage.css';
import Navbar from '../../components/HomeDashboardPage/Navbar/Navbar';
import Footer from '../../components/HomeDashboardPage/Footer/Footer';

const MarketPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'popular' | 'recent' | 'gainers' | 'losers'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="market-page">
            <Navbar />
            <main className="market-page__content">
                <h1 className="market-page__title">Market Overview</h1>
                <MarketFilterBar
                    activeFilter={filter}
                    onFilterChange={setFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <MarketList filter={filter} searchQuery={searchQuery} />
            </main>
            <Footer />
        </div>
    );
};

export default MarketPage;
