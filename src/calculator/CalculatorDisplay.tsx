import { Signs } from '../types/calculator';

interface Props {
  n1: string;
  n2: string;
  sign: Signs | null;
  result: string;
}

function CalculatorDisplay({ n1, n2, sign, result }: Props) {
  return (
    <div className='display'>
      <div>n1: {n1}</div>
      <div>sign: {sign}</div>
      <div>n2: {n2}</div>
      <div>result: {result}</div>
    </div>
  );
}

export default CalculatorDisplay;
