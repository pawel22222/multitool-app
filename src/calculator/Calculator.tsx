import { useReducer } from 'react';

type Props = {};

type Signs = '+' | '-' | '*' | '/';
type DecimalPoint = '.';
type Digits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
type Chars = Digits | DecimalPoint;
type CalcState = { n1: string; n2: string; sign: Signs | null; result: string };
type CalcActions =
  | 'enterChar'
  | 'useSign'
  | 'inverse'
  | 'opposite'
  | 'power'
  | 'root'
  | 'calculate'
  | 'clear'
  | 'clearEntry'
  | 'backspace';

const PRECISION = 12;
const DECIMAL_POINT: DecimalPoint = '.';
const INITIAL_N: Digits = '0';
const INITIAL_STATE: Readonly<CalcState> = { n1: INITIAL_N, n2: INITIAL_N, sign: null, result: '' };
export const DIVISION_BY_ZERO_ERROR = 'Nie można dzielić przez zero';

export function formatNumber(n: string | number): string {
  if (String(n).includes(DECIMAL_POINT)) {
    return String(n);
  }
  return String(Number(n));
}

export function parseNumber(n: number | string): string {
  return String(Number(Number(n).toPrecision(PRECISION)));
}

export function calculateTwoNumbers(s1: string, s2: string, sign: Signs | null) {
  if (!sign) return s1;

  const n1 = Number(s1);
  const n2 = Number(s2);

  switch (sign) {
    case '+':
      return parseNumber(n1 + n2);
    case '-':
      return parseNumber(n1 - n2);
    case '*':
      return parseNumber(n1 * n2);
    case '/':
      if (n2 === 0) {
        return DIVISION_BY_ZERO_ERROR;
      }
      return parseNumber(n1 / n2);
    default:
      const never: never = sign;
      throw Error(never);
  }
}

function calculatorReducer(
  state: CalcState,
  { type, payload }: { type: CalcActions; payload?: any },
): CalcState {
  const { n1, n2, sign, result } = state;

  switch (type) {
    case 'enterChar': {
      if (result) {
        return { ...INITIAL_STATE, n1: payload.char };
      }
      if (sign) {
        if (payload.char === DECIMAL_POINT && n2.includes(DECIMAL_POINT)) {
          return state;
        }
        return { ...state, n2: formatNumber(n2 + payload.char) };
      }
      if (payload.char === DECIMAL_POINT && n1.includes(DECIMAL_POINT)) {
        return state;
      }
      return { ...state, n1: formatNumber(n1 + payload.char) };
    }

    case 'useSign': {
      if (sign) {
        const result = calculateTwoNumbers(n1, n2, sign);
        return { ...state, sign: payload.sign, n1: result, n2: INITIAL_N };
      }
      return { ...state, sign: payload.sign, result: '', n2: INITIAL_N };
    }

    case 'calculate': {
      const result = calculateTwoNumbers(n1, n2, sign);
      return { ...INITIAL_STATE, result, n1: result };
    }

    case 'inverse': {
      const result = String(1 / Number(n1));
      return { ...state, n1: result, result };
    }

    case 'opposite': {
      const result = String(Number(n1) * -1);
      return { ...state, n1: result, result };
    }

    case 'power': {
      const result = String(Math.pow(Number(n1), 2));
      return { ...state, n1: result, result };
    }

    case 'root': {
      if (Number(n1) < 0) {
        return { ...INITIAL_STATE, result: 'Nieprawidłowe dane wejściowe' };
      }
      const result = String(Math.sqrt(Number(n1)));
      return { ...state, n1: result, result };
    }

    case 'clear': {
      return INITIAL_STATE;
    }

    case 'clearEntry': {
      if (sign) {
        return { ...state, n2: INITIAL_N, result: '' };
      }
      return { ...state, n1: INITIAL_N, result: '' };
    }

    case 'backspace': {
      return { ...state, n1: formatNumber(n1.slice(0, -1)) };
    }

    default:
      const never: never = type;
      throw Error(never);
  }
}

export default function Calculator({}: Props) {
  const [calc, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const actions = {
    enterChar(char: Chars) {
      dispatch({ type: 'enterChar', payload: { char } });
    },
    clear() {
      dispatch({ type: 'clear' });
    },
    backspace() {
      dispatch({ type: 'backspace' });
    },
    useSign(sign: Signs) {
      dispatch({ type: 'useSign', payload: { sign } });
    },
    calculate() {
      dispatch({ type: 'calculate' });
    },
    clearEntry() {
      dispatch({ type: 'clearEntry' });
    },
    inverse() {
      dispatch({ type: 'inverse' });
    },
    opposite() {
      dispatch({ type: 'opposite' });
    },
    power() {
      dispatch({ type: 'power' });
    },
    root() {
      dispatch({ type: 'root' });
    },
  };

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
        <div>n1: {calc.n1}</div>
        <div>sign: {calc.sign}</div>
        <div>n2: {calc.n2}</div>
        <div>result: {calc.result}</div>
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
