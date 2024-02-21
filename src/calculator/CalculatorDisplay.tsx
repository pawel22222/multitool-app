import { Signs } from '../types/calculator';

interface Props {
  n1: string;
  n2: string;
  sign: Signs | null;
  result: string;
}

function CalculatorDisplay({ n1, n2, sign, result }: Props) {
  const display = () => {
    if (!sign && n2 === '0' && !result) {
      return <div className='large'>{n1}</div>;
    } else if (sign && n2 === '0' && !result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign}`}</div>
          <div className='large'>{n1}</div>
        </>
      );
    } else if (sign && n2 && !result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign}`}</div>
          <div className='large'>{n2}</div>
        </>
      );
    } else if (result) {
      return (
        <>
          <div className='small'>{`${n1} ${sign} ${n2} =`}</div>
          <div className='large'>{result}</div>
        </>
      );
    } else {
      return <div className='large'>Brak danych</div>;
    }
  };

  return (
    <div className='display'>
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
