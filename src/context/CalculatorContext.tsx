import { createContext, useContext, ReactNode, useReducer, useMemo } from 'react';
import {
  AllActions,
  CalcState,
  CalculatorActions,
  Chars,
  DecimalPoint,
  Digits,
  KeyData,
  Signs,
} from '../types/calculator';
import { calculateTwoNumbers, formatNumberToDisplay } from '../utils/calculator';

export const INITIAL_N: Digits = '0';
export const INITIAL_STATE: Readonly<CalcState> = {
  n1: INITIAL_N,
  n2: INITIAL_N,
  sign: null,
  result: '',
};
export const DECIMAL_POINT: DecimalPoint = '.';
export const DIVISION_BY_ZERO_ERROR = 'Nie można dzielić przez zero';

function calculatorReducer(state: CalcState, { type, payload }: AllActions): CalcState {
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
        return { ...state, n2: formatNumberToDisplay(n2 + payload.char) };
      }
      if (payload.char === DECIMAL_POINT && n1.includes(DECIMAL_POINT)) {
        return state;
      }
      return { ...state, n1: formatNumberToDisplay(n1 + payload.char) };
    }

    case 'useSign': {
      if (sign) {
        const result = calculateTwoNumbers(n1, n2, sign);
        return { result: '', sign: payload.sign, n1: result, n2: INITIAL_N };
      }
      return { ...state, sign: payload.sign, result: '', n2: INITIAL_N };
    }

    case 'calculate': {
      const result = calculateTwoNumbers(n1, n2, sign);
      return { ...state, result };
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
      const result = String(Number(n1) ** 2);
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
      return { ...state, n1: formatNumberToDisplay(n1.slice(0, -1)) };
    }

    default:
      const never: never = type;
      throw Error(never);
  }
}

interface CalculatorContextData {
  calcState: { n1: string; n2: string; sign: Signs | null; result: string };
  actions: CalculatorActions;
  standardKeyboard: Readonly<KeyData[]>;
}

const CalculatorContext = createContext<CalculatorContextData | undefined>(undefined);

export const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
  const [calcState, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const actions: CalculatorActions = useMemo(
    () => ({
      enterChar(char: Chars) {
        dispatch({ type: 'enterChar', payload: { char } });
      },
      clear() {
        dispatch({ type: 'clear', payload: null });
      },
      backspace() {
        dispatch({ type: 'backspace', payload: null });
      },
      useSign(sign: Signs) {
        dispatch({ type: 'useSign', payload: { sign } });
      },
      calculate() {
        dispatch({ type: 'calculate', payload: null });
      },
      clearEntry() {
        dispatch({ type: 'clearEntry', payload: null });
      },
      inverse() {
        dispatch({ type: 'inverse', payload: null });
      },
      opposite() {
        dispatch({ type: 'opposite', payload: null });
      },
      power() {
        dispatch({ type: 'power', payload: null });
      },
      root() {
        dispatch({ type: 'root', payload: null });
      },
    }),
    [],
  );

  const STANDARD_KEYBOARD: KeyData[] = useMemo(
    () => [
      {
        content: '1',
        className: 'key-light',
        position: [5, 1],
        onClick: () => actions.enterChar('1'),
      },
      {
        content: '2',
        className: 'key-light',
        position: [5, 2],
        onClick: () => actions.enterChar('2'),
      },
      {
        content: '3',
        className: 'key-light',
        position: [5, 3],
        onClick: () => actions.enterChar('3'),
      },
      {
        content: '4',
        className: 'key-light',
        position: [4, 1],
        onClick: () => actions.enterChar('4'),
      },
      {
        content: '5',
        className: 'key-light',
        position: [4, 2],
        onClick: () => actions.enterChar('5'),
      },
      {
        content: '6',
        className: 'key-light',
        position: [4, 3],
        onClick: () => actions.enterChar('6'),
      },
      {
        content: '7',
        className: 'key-light',
        position: [3, 1],
        onClick: () => actions.enterChar('7'),
      },
      {
        content: '8',
        className: 'key-light',
        position: [3, 2],
        onClick: () => actions.enterChar('8'),
      },
      {
        content: '9',
        className: 'key-light',
        position: [3, 3],
        onClick: () => actions.enterChar('9'),
      },
      {
        content: '0',
        className: 'key-light',
        position: [6, 2],
        onClick: () => actions.enterChar('0'),
      },
      {
        content: ',',
        className: 'key-light',
        position: [6, 3],
        onClick: () => actions.enterChar(DECIMAL_POINT),
      },
      {
        content: 'C',
        className: 'key-dark',
        position: [1, 3],
        onClick: () => actions.clear(),
      },
      {
        content: 'CE',
        className: 'key-dark',
        position: [1, 2],
        onClick: () => actions.clearEntry(),
      },
      {
        content: '⌫',
        className: 'key-dark',
        position: [1, 4],
        onClick: () => actions.backspace(),
      },
      {
        content: '+',
        className: 'key-dark',
        position: [5, 4],
        onClick: () => actions.useSign('+'),
      },
      {
        content: '-',
        className: 'key-dark',
        position: [4, 4],
        onClick: () => actions.useSign('-'),
      },
      {
        content: '×',
        className: 'key-dark',
        position: [3, 4],
        onClick: () => actions.useSign('*'),
      },
      {
        content: '÷',
        className: 'key-dark',
        position: [2, 4],
        onClick: () => actions.useSign('/'),
      },
      {
        content: '1/x',
        className: 'key-dark',
        position: [2, 1],
        onClick: () => actions.inverse(),
      },
      {
        content: '±',
        className: 'key-light',
        position: [6, 1],
        onClick: () => actions.opposite(),
      },
      {
        content: 'x²',
        className: 'key-dark',
        position: [2, 2],
        onClick: () => actions.power(),
      },
      {
        content: '²√x',
        className: 'key-dark',
        position: [2, 3],
        onClick: () => actions.root(),
      },
      {
        content: '%',
        className: 'key-dark',
        position: [1, 1],
        onClick: () => {},
      },
      {
        content: '=',
        className: 'key-equals',
        position: [4, 6],
        onClick: () => actions.calculate(),
      },
    ],
    [actions],
  );

  return (
    <CalculatorContext.Provider
      value={useMemo(
        () => ({ calcState, actions, standardKeyboard: STANDARD_KEYBOARD }),
        [STANDARD_KEYBOARD, actions, calcState],
      )}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
