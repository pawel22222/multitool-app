import '../scss/Calculator.scss';
import { useCalculatorContext } from '../context/CalculatorContext';
import CalculatorKeyboard from './CalculatorKeyboard';
import CalculatorDisplay from './CalculatorDisplay';

type Props = {};

export default function Calculator({}: Props) {
  const { calcState, standardKeyboard } = useCalculatorContext();

  return (
    <div className='calculator-container'>
      <CalculatorDisplay
        n1={calcState.n1}
        n2={calcState.n2}
        sign={calcState.sign}
        result={calcState.result}
      />

      <CalculatorKeyboard keys={standardKeyboard} />
    </div>
  );
}
