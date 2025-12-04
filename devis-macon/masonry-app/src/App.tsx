import { useState } from 'react';
import './App.css';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import type { CalculatorInputs, QuoteResult } from './types';
import { calculateQuote } from './utils/calculate';

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    wallLength: 0,
    wallHeight: 0,
    brickLength: 0,
    brickWidth: 0,
    brickHeight: 0,
    thicknessRows: 1,
    brickPrice: 0,
    mortarThickness: 1.0,
    mortarPrice: 0
  });

  const [results, setResults] = useState<QuoteResult | null>(null);

  const handleCalculate = () => {
    // Basic validation
    const values = Object.values(inputs);
    if (values.some(v => v < 0)) {
      alert("Veuillez remplir tous les champs avec des valeurs positives.");
      return;
    }
    // Check required fields (dimensions > 0)
    if (inputs.wallLength <= 0 || inputs.wallHeight <= 0 || inputs.brickLength <= 0 || inputs.brickWidth <= 0 || inputs.brickHeight <= 0) {
        alert("Veuillez remplir les dimensions avec des valeurs supérieures à 0.");
        return;
    }

    const res = calculateQuote(inputs);
    setResults(res);
    
    // Scroll to results after a short delay to allow rendering
    setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="container">
      <header>
        <h1>Calculateur de Devis Maçonnerie</h1>
        <p>Estimez rapidement vos besoins en briques et mortier.</p>
      </header>

      <main>
        <CalculatorForm 
            inputs={inputs} 
            setInputs={setInputs} 
            onCalculate={handleCalculate} 
        />
        <ResultsDisplay results={results} />
      </main>
    </div>
  );
}

export default App;
