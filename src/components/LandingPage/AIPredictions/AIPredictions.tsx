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
import './AIPredictions.css';

interface PredictionPoint {
    time: string;
    prediction: number;
}

const predictionData: PredictionPoint[] = [
    {time: '08:00', prediction: 122},
    {time: '09:00', prediction: 124},
    {time: '10:00', prediction: 121},
    {time: '11:00', prediction: 127},
    {time: '12:00', prediction: 126},
    {time: '13:00', prediction: 130},
    {time: '14:00', prediction: 128},
    {time: '15:00', prediction: 133},
];

const AIPredictions: React.FC = () => {
    return (
        <section className="ai-predictions" id={"ai-predictions"}>
            <h2>AI Predictions</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="prediction" stroke="#e68b06" strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};

export default AIPredictions;
