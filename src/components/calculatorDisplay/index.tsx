import { Signs } from '../../types/calculator';
import './style.scss';

interface Props {
  n1: string | null;
  n2: string | null;
  sign: Signs | null;
  result: string | null;
}

function CalculatorDisplay({ n1, n2, sign, result }: Props) {
  const display = () => {
    if (!sign && !n2 && !result) {
      return <div className='large'>{n1 || '0'}</div>;
    }
    if (!sign && !n2) {
      return (
        <>
          <div className='small'>{n1} =</div>
          <div className='large'>{n1}</div>
        </>
      );
    }
    if (sign && !n2 && !result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign}`}</div>
          <div className='large'>{n1}</div>
        </>
      );
    }
    if (sign && n2 && !result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign} ${n2}`}</div>
          <div className='large'>{n2}</div>
        </>
      );
    }
    if (result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign} ${n2} =`}</div>
          <div className='large'>{result}</div>
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
