import React, { useRef, useEffect } from 'react';
import './TrendingStocksSection.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import aaplLogo from '../../../assets/logos/apple-logo.png';
import tslaLogo from '../../../assets/logos/tesla-logo.png';
import amznLogo from '../../../assets/logos/amazon-logo.png';
import googLogo from '../../../assets/logos/google-logo.png';
import metaLogo from '../../../assets/logos/meta-logo.png';
import msftLogo from '../../../assets/logos/microsoft-logo.png';

interface StockItem {
  symbol: string;
  change: string;
  logo: string;
}

const trendingStocks: StockItem[] = [
  { symbol: 'AAPL', change: '+5%', logo: aaplLogo },
  { symbol: 'TSLA', change: '-3%', logo: tslaLogo },
  { symbol: 'AMZN', change: '+2.5%', logo: amznLogo },
  { symbol: 'GOOGL', change: '+1.2%', logo: googLogo },
  { symbol: 'META', change: '+3.19%', logo: metaLogo },
  { symbol: 'MSFT', change: '+0.2%', logo: msftLogo },
  { symbol: 'AAPL', change: '+5%', logo: aaplLogo },
  { symbol: 'TSLA', change: '-3%', logo: tslaLogo },
  { symbol: 'AMZN', change: '+2.5%', logo: amznLogo },
  { symbol: 'GOOGL', change: '+1.2%', logo: googLogo },
  { symbol: 'META', change: '+3.19%', logo: metaLogo },
  { symbol: 'MSFT', change: '+0.2%', logo: msftLogo },
];

const getItemWidth = (containerWidth: number, itemsVisible: number, gap: number) => {
  return (containerWidth - gap * (itemsVisible - 1)) / itemsVisible;
};

const TrendingStocksSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getItemsVisible = () => {
    const width = window.innerWidth;
    if (width < 800) return 3;
    if (width < 1200) return 5;
    return 7;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const itemsVisible = getItemsVisible();
        const containerWidth = scrollContainerRef.current.clientWidth;
        const gap = 16; // zakładamy 16px gap między elementami (możesz dostosować)
        const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
        scrollContainerRef.current.scrollLeft += itemWidth + gap;

        if (
          scrollContainerRef.current.scrollLeft + containerWidth >=
          scrollContainerRef.current.scrollWidth
        ) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemsVisible = getItemsVisible();
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 16;
      const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
      scrollContainerRef.current.scrollLeft -= itemWidth + gap;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemsVisible = getItemsVisible();
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 16;
      const itemWidth = getItemWidth(containerWidth, itemsVisible, gap);
      scrollContainerRef.current.scrollLeft += itemWidth + gap;
    }
  };

  return (
    <section className="trending-stocks-section">
      <h3 className="section-heading">Trending Stocks</h3>
      <div className="stocks-container">
        <MdChevronLeft className="arrow-btn arrow-btn--left" onClick={scrollLeft} />
        <div className="stocks-grid" ref={scrollContainerRef}>
          {trendingStocks.map((stock, idx) => (
            <div key={idx} className="stock-card">
              <img src={stock.logo} alt={stock.symbol} className="stock-card__logo" />
              <div className="stock-card__info">
                <span className="stock-card__symbol">{stock.symbol}</span>
                <span className="stock-card__change">{stock.change}</span>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight className="arrow-btn arrow-btn--right" onClick={scrollRight} />
      </div>
    </section>
  );
};

export default TrendingStocksSection;
