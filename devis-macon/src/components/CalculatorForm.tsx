import React from 'react';
import type { CalculatorInputs } from '../types';

interface Props {
    inputs: CalculatorInputs;
    setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

export const CalculatorForm: React.FC<Props> = ({ inputs, setInputs }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    return (
        <div className="calculator-form">
            {/* Section: Dimensions du Mur */}
            <section className="form-section">
                <h2>🧱 Dimensions du Mur</h2>
                <div className="grid-2">
                    <div className="input-group">
                        <label htmlFor="wallLength">Longueur du mur (m)</label>
                        <input
                            type="number"
                            id="wallLength"
                            name="wallLength"
                            step="0.01"
                            min="0"
                            placeholder="Ex: 10"
                            value={inputs.wallLength || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="wallHeight">Hauteur du mur (m)</label>
                        <input
                            type="number"
                            id="wallHeight"
                            name="wallHeight"
                            step="0.01"
                            min="0"
                            placeholder="Ex: 2"
                            value={inputs.wallHeight || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </section>

            {/* Section: Brique / Parpaing */}
            <section className="form-section">
                <h2>📏 Brique / Parpaing</h2>
                <div className="grid-3">
                    <div className="input-group">
                        <label htmlFor="brickLength">Longueur (cm)</label>
                        <input
                            type="number"
                            id="brickLength"
                            name="brickLength"
                            step="0.1"
                            min="0"
                            placeholder="Ex: 50"
                            value={inputs.brickLength || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="brickWidth">Largeur (cm)</label>
                        <input
                            type="number"
                            id="brickWidth"
                            name="brickWidth"
                            step="0.1"
                            min="0"
                            placeholder="Ex: 20"
                            value={inputs.brickWidth || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="brickHeight">Hauteur (cm)</label>
                        <input
                            type="number"
                            id="brickHeight"
                            name="brickHeight"
                            step="0.1"
                            min="0"
                            placeholder="Ex: 20"
                            value={inputs.brickHeight || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid-2">
                    <div className="input-group">
                        <label htmlFor="thicknessRows">Épaisseur (nb de rangées)</label>
                        <input
                            type="number"
                            id="thicknessRows"
                            name="thicknessRows"
                            step="1"
                            min="1"
                            value={inputs.thicknessRows || ''}
                            onChange={handleChange}
                        />
                        <small>Nombre de briques en épaisseur</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="brickPrice">Prix unitaire (Ar)</label>
                        <input
                            type="number"
                            id="brickPrice"
                            name="brickPrice"
                            step="1"
                            min="0"
                            placeholder="Ex: 1500"
                            value={inputs.brickPrice || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </section>

            {/* Section: Mortier */}
            <section className="form-section">
                <h2>💧 Mortier</h2>
                <div className="grid-2">
                    <div className="input-group">
                        <label htmlFor="mortarThickness">Épaisseur du joint (cm)</label>
                        <input
                            type="number"
                            id="mortarThickness"
                            name="mortarThickness"
                            step="0.1"
                            min="0"
                            value={inputs.mortarThickness || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mortarPrice">Prix du mortier (Ar/m³)</label>
                        <input
                            type="number"
                            id="mortarPrice"
                            name="mortarPrice"
                            step="1"
                            min="0"
                            placeholder="Ex: 120000"
                            value={inputs.mortarPrice || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
