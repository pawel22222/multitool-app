import { DECIMAL_POINT, useCalculatorContext } from '../context/CalculatorContext';

type Props = {};

export default function Calculator({}: Props) {
  const { calcState, actions } = useCalculatorContext();

  const {
    enterChar,
    clear,
    backspace,
    useSign,
    calculate,
    clearEntry,
    inverse,
    power,
    root,
    opposite,
  } = actions;

  return (
    <div>
      <div>
        <div>n1: {calcState.n1}</div>
        <div>sign: {calcState.sign}</div>
        <div>n2: {calcState.n2}</div>
        <div>result: {calcState.result}</div>
      </div>

      <div>
        <button onClick={() => enterChar('1')}>1</button>
        <button onClick={() => enterChar('2')}>2</button>
        <button onClick={() => enterChar('3')}>3</button>
        <button onClick={() => enterChar('4')}>4</button>
        <button onClick={() => enterChar('5')}>5</button>
        <button onClick={() => enterChar('6')}>6</button>
        <button onClick={() => enterChar('7')}>7</button>
        <button onClick={() => enterChar('8')}>8</button>
        <button onClick={() => enterChar('9')}>9</button>
        <button onClick={() => enterChar('0')}>0</button>
        <button onClick={() => enterChar(DECIMAL_POINT)}>,</button>

        <button onClick={() => clear()}>C</button>
        <button onClick={() => clearEntry()}>CE</button>
        <button onClick={() => backspace()}>{'<-'}</button>

        <button onClick={() => useSign('+')}>+</button>
        <button onClick={() => useSign('-')}>-</button>
        <button onClick={() => useSign('*')}>*</button>
        <button onClick={() => useSign('/')}>/</button>

        <button onClick={() => inverse()}>1/x</button>
        <button onClick={() => opposite()}>+/-</button>
        <button onClick={() => power()}>x2</button>
        <button onClick={() => root()}>2x</button>

        <button onClick={() => calculate()}>=</button>
      </div>
    </div>
  );
}
