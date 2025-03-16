import React, { useState } from 'react';
import './InvestmentPreferencesSettings.css';

const SECTORS = ['Technology', 'Healthcare', 'Consumer Discretionary', 'Financials', 'Energy', 'Real Estate'];

interface FavoriteAsset {
    symbol: string;
    name: string;
    allocation: number;
}

const InvestmentPreferencesSettings: React.FC = () => {
    const [riskLevel, setRiskLevel] = useState<number>(50);

    const [preferredSectors, setPreferredSectors] = useState<string[]>(['Technology', 'Healthcare']);

    const [favoriteAssets, setFavoriteAssets] = useState<FavoriteAsset[]>([
        { symbol: 'AAPL', name: 'Apple Inc.', allocation: 20 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', allocation: 25 },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', allocation: 10 },
    ]);

    const [autoRebalance, setAutoRebalance] = useState<boolean>(true);

    const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRiskLevel(Number(e.target.value));
    };

    const getRiskLabel = (): string => {
        if (riskLevel < 33) return 'Low';
        if (riskLevel < 66) return 'Medium';
        return 'High';
    };

    const handleSectorToggle = (sector: string) => {
        if (preferredSectors.includes(sector)) {
            setPreferredSectors(preferredSectors.filter(s => s !== sector));
        } else {
            setPreferredSectors([...preferredSectors, sector]);
        }
    };

    const handleAddAsset = () => {
        const newAsset: FavoriteAsset = {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            allocation: 15,
        };
        setFavoriteAssets([...favoriteAssets, newAsset]);
    };

    const handleAllocationChange = (index: number, newValue: number) => {
        const updatedAssets = [...favoriteAssets];
        updatedAssets[index].allocation = newValue;
        setFavoriteAssets(updatedAssets);
    };

    const handleRemoveAsset = (index: number) => {
        const updatedAssets = [...favoriteAssets];
        updatedAssets.splice(index, 1);
        setFavoriteAssets(updatedAssets);
    };

    const handleSave = () => {
        console.log('Saving preferences:', {
            riskLevel,
            preferredSectors,
            favoriteAssets,
            autoRebalance,
        });
    };

    const handleCancel = () => {
        console.log('Cancel changes');
    };

    return (
        <div className="investment-preferences">
            <h2>Investment Preferences</h2>

            <div className="section risk-level">
                <label>Risk Level</label>
                <div className="risk-slider">
                    <input type="range" min={0} max={100} value={riskLevel} onChange={handleRiskChange} />
                    <span className="risk-value">{getRiskLabel()}</span>
                </div>
            </div>

            <div className="section preferred-sectors">
                <label>Preferred Sectors</label>
                <div className="sectors-list">
                    {SECTORS.map(sector => (
                        <div key={sector} className="sector-item">
                            <input
                                type="checkbox"
                                id={`sector-${sector}`}
                                checked={preferredSectors.includes(sector)}
                                onChange={() => handleSectorToggle(sector)}
                            />
                            <label htmlFor={`sector-${sector}`}>{sector}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section favorite-assets">
                <label>Favorite Assets</label>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Allocation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoriteAssets.map((asset, idx) => (
                            <tr key={idx}>
                                <td>{asset.symbol}</td>
                                <td>{asset.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={asset.allocation}
                                        onChange={e => handleAllocationChange(idx, Number(e.target.value))}
                                    />
                                    %
                                </td>
                                <td>
                                    <button onClick={() => handleRemoveAsset(idx)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}>
                                <button onClick={handleAddAsset} className="add-asset-btn">
                                    + Add an asset
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="section auto-rebalance">
                <label>Auto-Rebalance</label>
                <div className="toggle-row">
                    <span>Automatically balance your portfolio based on your investment preferences.</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={autoRebalance}
                            onChange={e => setAutoRebalance(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="buttons-row">
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default InvestmentPreferencesSettings;
