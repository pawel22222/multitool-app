import './App.css';
import Calculator from './calculator/Calculator';
import { CalculatorContextProvider } from './context/CalculatorContext';

function App() {
  return (
    <div>
      <h1>Calculator App</h1>

      <CalculatorContextProvider>
        <Calculator />
      </CalculatorContextProvider>
    </div>
  );
}

export default App;
