import { useEffect } from 'react';
import CalculatorKey from '../CalculatorKey';
import { KeyData } from '../../types';
import './style.scss';

interface Props {
  keyboard: Readonly<KeyData[]>;
  isFocused: boolean;
}

function CalculatorKeyboard({ keyboard, isFocused }: Props) {
  const keys: [content: string, onClick: () => void][] = keyboard
    .filter(({ key }) => key)
    .map(({ key, onClick }) => [key, onClick]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = keys.find(([key]) => key === e.key);

      if (key) {
        key[1]();
      }
    }

    if (isFocused) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isFocused, keys]);

  return (
    <div className='calculator-keyboard'>
      {keyboard.map((key) => (
        <CalculatorKey
          key={key.content}
          content={key.content}
          className={key.className}
          rowPosition={key.position[0]}
          columnPosition={key.position[1]}
          testid={key.testid}
          onClick={key.onClick}
        />
      ))}
    </div>
  );
}

export default CalculatorKeyboard;
