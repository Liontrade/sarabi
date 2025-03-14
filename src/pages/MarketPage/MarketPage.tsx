import React, { useState } from 'react';
import MarketFilterBar from '../../components/Market/MarketFilterBar/MarketFilterBar';
import MarketList from '../../components/Market/MarketList/MarketList';
import './MarketPage.css';
import Navbar from '../../components/HomeDashboard/Navbar/Navbar';
import Footer from '../../components/HomeDashboard/Footer/Footer';

const MarketPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'popular' | 'recent' | 'gainers' | 'losers'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="market-page">
            <Navbar />
            <main className="market-page__content">
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
