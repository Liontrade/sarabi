import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import './LiveMarketInsights.css';

interface DataPoint {
    time: string;
    price: number;
}

const data: DataPoint[] = [
    { time: '08:00', price: 120 },
    { time: '09:00', price: 125 },
    { time: '10:00', price: 123 },
    { time: '11:00', price: 130 },
    { time: '12:00', price: 128 },
    { time: '13:00', price: 132 },
    { time: '14:00', price: 129 },
    { time: '15:00', price: 135 },
];

const LiveMarketInsights: React.FC = () => {
    return (
        <section className="live-market-insights" id={"live-market-insights"}>
            <h2>Live Market Insights</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#FCA311" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};

export default LiveMarketInsights;
