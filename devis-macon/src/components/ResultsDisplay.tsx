import React from 'react';
import type { QuoteResult } from '../types';

interface Props {
    results: QuoteResult | null;
}

export const ResultsDisplay: React.FC<Props> = ({ results }) => {
    return (
        <div id="results" className="results-container">
            <h2>📊 Résultats Estimés</h2>
            
            <div className="results-grid">
                <div className="result-card"> 
                    <h3>🧱 Briques / Parpaings</h3>
                    <p className="result-value">
                        {results ? results.totalBricks.toLocaleString('fr-FR') : '0'}
                    </p>
                    <p className="result-sub">Unités totales</p>
                    <p className="result-price">
                        {results ? `${results.totalBrickPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} Ar` : '0 Ar'}
                    </p>
                </div>

                <div className="result-card"> 
                    <h3>💧Mortier</h3>
                    <p className="result-value">
                        {results ? results.totalMortarVol.toFixed(3) : '0'}
                    </p>
                    <p className="result-sub">m³ (Volume)</p>
                    <p className="result-price">
                        {results ? `${results.totalMortarPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} Ar` : '0 Ar'}
                    </p>
                </div>
            </div>

            <div className="total-section">
                <h3>Coût Total Estimé</h3>
                <p className="total-price">
                    {results ? `${results.totalPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} Ar` : '0 Ar'}
                </p>
            </div>
        </div>
    );
};
