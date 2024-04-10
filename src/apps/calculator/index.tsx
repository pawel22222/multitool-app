import './style.scss';
import { useCalculatorContext } from '@/context/CalculatorContext';
import Keyboard from './components/Keyboard';
import Display from './components/Display';

type Props = {
  isFocused: boolean;
};

export default function Calculator({ isFocused }: Props) {
  const { calcState, standardKeyboard } = useCalculatorContext();

  return (
    <div className='calculator-container'>
      <Display
        n1={calcState.n1}
        n2={calcState.n2}
        sign={calcState.sign}
        result={calcState.result}
      />

      <Keyboard keyboard={standardKeyboard} isFocused={isFocused} />
    </div>
  );
}
