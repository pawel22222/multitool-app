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

  const display = () => {
    if (!sign && !n2 && !result) {
      return <div className='large'>{n1Display || '0'}</div>;
    }
    if (!sign && !n2) {
      return (
        <>
          <div className='small'>{n1Display} =</div>
          <div className='large'>{n1Display}</div>
        </>
      );
    }
    if (sign && !n2 && !result) {
      return (
        <>
          <div className='small'>{`${n1Display} ${sign}`}</div>
          <div className='large'>{n1Display}</div>
        </>
      );
    }
    if (sign && n2 && !result) {
      return (
        <>
          <div className='small'>{`${n1Display} ${sign} ${n2Display}`}</div>
          <div className='large'>{n2Display}</div>
        </>
      );
    }
    if (result) {
      return (
        <>
          <div className='small'>{`${n1Display} ${sign} ${n2Display} =`}</div>
          <div className='large'>{resultDisplay}</div>
        </>
      );
    }
    return <div className='large'>Brak danych</div>;
  };

  return (
    <div className='calculator-display'>
      <div className='helper'>
        <div className='small'>n1: {n1}</div>
        <div className='small'>sign: {sign}</div>
        <div className='small'>n2: {n2}</div>
        <div className='small'>result: {result}</div>
      </div>
      <div className='preview'>{display()}</div>
    </div>
  );
}

export default CalculatorDisplay;
