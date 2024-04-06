import './style.scss';
import { useCalculatorContext } from '../../context/CalculatorContext';
import CalculatorKeyboard from './components/CalculatorKeyboard';
import CalculatorDisplay from './components/CalculatorDisplay';

type Props = {
  isFocused: boolean;
};

export default function Calculator({ isFocused }: Props) {
  const { calcState, standardKeyboard } = useCalculatorContext();

  return (
    <div className='calculator-container'>
      <CalculatorDisplay
        n1={calcState.n1}
        n2={calcState.n2}
        sign={calcState.sign}
        result={calcState.result}
      />

      <CalculatorKeyboard keyboard={standardKeyboard} isFocused={isFocused} />
    </div>
  );
}
