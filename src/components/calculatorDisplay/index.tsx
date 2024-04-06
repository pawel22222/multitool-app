import { type ReactNode } from 'react';
import { Signs } from '../../types/calculator';
import './style.scss';
import { numberToDisplay } from '../../utils/calculator';

interface Props {
  n1: string | null;
  n2: string | null;
  sign: Signs | null;
  result: string | null;
}

function CalculatorDisplay(props: Props) {
  const { sign, n1, n2, result } = props;

  const n1Display = numberToDisplay(n1);
  const n2Display = numberToDisplay(n2);
  const resultDisplay = numberToDisplay(result);

  const [mainDisplay, secondDisplay] = getDisplay();

  function getDisplay(): [ReactNode, ReactNode] {
    if (!sign && !n2 && !result) {
      return [n1Display || '0', null];
    }
    if (!sign && !n2) {
      return [n1Display, n1Display];
    }
    if (sign && !n2 && !result) {
      return [n1Display, `${n1Display} ${sign}`];
    }
    if (sign && n2 && !result) {
      return [n2Display, `${n1Display} ${sign} ${n2Display}`];
    }
    if (result) {
      return [resultDisplay, `${n1Display} ${sign} ${n2Display} =`];
    }
    return ['Brak danych', null];
  }

  return (
    <div className='calculator-display'>
      {/* <div className='helper'>
        <div>n1: {n1}</div>
        <div>sign: {sign}</div>
        <div>n2: {n2}</div>
        <div>result: {result}</div>
      </div> */}

      <div className='display'>
        <div className='second-display' data-testid='second-display'>
          {secondDisplay}
        </div>

        <div className='main-display' data-testid='main-display'>
          {mainDisplay}
        </div>
      </div>
    </div>
  );
}

export default CalculatorDisplay;
