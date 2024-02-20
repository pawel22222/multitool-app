import Key from '../components/calculator/Key';
import { KeyData } from '../types/calculator';

interface Props {
  keys: Readonly<KeyData[]>;
}

function CalculatorKeyboard({ keys }: Props) {
  return (
    <div className='keyboard'>
      {keys.map((key) => (
        <Key
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
