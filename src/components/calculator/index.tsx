import './style.scss';
import { useCalculatorContext } from '../../context/CalculatorContext';
import CalculatorKeyboard from '../calculatorKeyboard';
import CalculatorDisplay from '../calculatorDisplay';

export default function Calculator() {
  const { calcState, standardKeyboard } = useCalculatorContext();

  return (
    <div className='calculator-container'>
      <CalculatorDisplay
        n1={calcState.n1}
        n2={calcState.n2}
        sign={calcState.sign}
        result={calcState.result}
      />

      <CalculatorKeyboard keyboard={standardKeyboard} />
    </div>
  );
}
