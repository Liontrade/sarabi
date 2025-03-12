import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
    value: string;
    label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => {
    return (
        <div className="metric-card">
            <h3 className="metric-card__value">{value}</h3>
            <p className="metric-card__label">{label}</p>
        </div>
    );
};

export default MetricCard;
