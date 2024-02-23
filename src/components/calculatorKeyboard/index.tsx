import CalculatorKey from '../calculatorKey';
import { KeyData } from '../../types/calculator';
import './style.scss';

interface Props {
  keys: Readonly<KeyData[]>;
}

function CalculatorKeyboard({ keys }: Props) {
  return (
    <div className='calculator-keyboard'>
      {keys.map((key) => (
        <CalculatorKey
          key={key.content}
          content={key.content}
          className={key.className}
          rowPosition={key.position[0]}
          columnPosition={key.position[1]}
          onClick={key.onClick}
        />
      ))}
    </div>
  );
}

export default CalculatorKeyboard;
