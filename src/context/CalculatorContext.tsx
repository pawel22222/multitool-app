import { createContext, useContext, type ReactNode, useReducer, useMemo } from 'react';
import {
  AllActions,
  CalcState,
  CalculatorActions,
  Chars,
  KeyData,
  Signs,
} from '../types/calculator';
import { DECIMAL_POINT, addCharToNumber, calculateTwoNumbers, parseBig } from '../utils/calculator';

export const INITIAL_N = null;
export const INITIAL_STATE: Readonly<CalcState> = {
  n1: INITIAL_N,
  n2: INITIAL_N,
  sign: null,
  result: null,
};

function calculatorReducer(state: CalcState, { type, payload }: AllActions): CalcState {
  switch (type) {
    case 'enterChar': {
      if (state.result) {
        return { ...INITIAL_STATE, n1: addCharToNumber('0', payload.char) };
      }
      if (state.sign) {
        return { ...state, n2: addCharToNumber(state.n2, payload.char) };
      }
      return { ...state, n1: addCharToNumber(state.n1, payload.char) };
    }

    case 'useSign': {
      if (state.sign) {
        const result = calculateTwoNumbers(state.n1, state.n2, state.sign);
        return { result: '', sign: payload.sign, n1: result, n2: INITIAL_N };
      }
      return { ...state, sign: payload.sign, result: '', n2: INITIAL_N, n1: parseBig(state.n1) };
    }

    case 'calculate': {
      const n2 = state.sign ? parseBig(state.n2) || parseBig(state.n1) : null;
      const result = calculateTwoNumbers(state.result || state.n1 || '0', n2, state.sign);
      return { ...state, result, n2, n1: parseBig(state.result || state.n1) };
    }

    case 'inverse': {
      if (state.sign) {
        const n = state.n2 || state.n1;
        const n2 = String(1 / Number(n));
        return { ...state, n2 };
      }
      const result = String(1 / Number(state.n1));
      return { ...state, n1: result, result };
    }

    case 'opposite': {
      if (state.sign) {
        const n = state.n2 || state.n1;
        const n2 = String(Number(n) * -1);
        return { ...state, n2 };
      }
      const result = String(Number(state.n1) * -1);
      return { ...state, n1: result, result };
    }

    case 'power': {
      if (state.sign) {
        const n = state.n2 || state.n1;
        const n2 = String(Number(n) ** 2);
        return { ...state, n2 };
      }
      const n1 = String(Number(state.n1) ** 2);
      return { ...state, n1 };
    }

    case 'root': {
      if (state.sign) {
        const n = state.n2 || state.n1;
        if (Number(n) < 0) {
          return { ...INITIAL_STATE, result: 'Nieprawidłowe dane wejściowe' };
        }
        const n2 = String(Math.sqrt(Number(n)));
        return { ...state, n2 };
      }
      if (Number(state.n1) < 0) {
        return { ...INITIAL_STATE, result: 'Nieprawidłowe dane wejściowe' };
      }
      const result = String(Math.sqrt(Number(state.n1)));
      return { ...state, n1: result, result };
    }

    case 'percent': {
      if (state.sign) {
        const n = state.n2 || state.n1;
        const n2 = String(Number(n) ** 2 / 100);
        return { ...state, n2 };
      }

      const n1 = String(Number(state.n1) ** 2 / 100);
      return { ...state, n1 };
    }

    case 'clear': {
      return INITIAL_STATE;
    }

    case 'clearEntry': {
      const newN = state.sign ? { n2: INITIAL_N } : { n1: INITIAL_N };
      return { ...state, ...newN, result: '' };
    }

    case 'backspace': {
      const newN = state.sign
        ? { n2: state.n2?.slice(0, -1) || null }
        : { n1: state.n1?.slice(0, -1) || null };
      return { ...state, ...newN };
    }

    default:
      const never: never = type;
      throw Error(never);
  }
}

interface CalculatorContextData {
  calcState: { n1: string | null; n2: string | null; sign: Signs | null; result: string | null };
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
      percent() {
        dispatch({ type: 'percent', payload: null });
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
        key: '1',
        className: 'key-light',
        position: [5, 1],
        onClick: () => actions.enterChar('1'),
      },
      {
        content: '2',
        key: '2',
        className: 'key-light',
        position: [5, 2],
        onClick: () => actions.enterChar('2'),
      },
      {
        content: '3',
        key: '3',
        className: 'key-light',
        position: [5, 3],
        onClick: () => actions.enterChar('3'),
      },
      {
        content: '4',
        key: '4',
        className: 'key-light',
        position: [4, 1],
        onClick: () => actions.enterChar('4'),
      },
      {
        content: '5',
        key: '5',
        className: 'key-light',
        position: [4, 2],
        onClick: () => actions.enterChar('5'),
      },
      {
        content: '6',
        key: '6',
        className: 'key-light',
        position: [4, 3],
        onClick: () => actions.enterChar('6'),
      },
      {
        content: '7',
        key: '7',
        className: 'key-light',
        position: [3, 1],
        onClick: () => actions.enterChar('7'),
      },
      {
        content: '8',
        key: '8',
        className: 'key-light',
        position: [3, 2],
        onClick: () => actions.enterChar('8'),
      },
      {
        content: '9',
        key: '9',
        className: 'key-light',
        position: [3, 3],
        onClick: () => actions.enterChar('9'),
      },
      {
        content: '0',
        key: '0',
        className: 'key-light',
        position: [6, 2],
        onClick: () => actions.enterChar('0'),
      },
      {
        content: ',',
        key: ',',
        className: 'key-light',
        position: [6, 3],
        onClick: () => actions.enterChar(DECIMAL_POINT),
      },
      {
        content: 'C',
        key: 'Escape',
        className: 'key-dark',
        position: [1, 3],
        onClick: () => actions.clear(),
      },
      {
        content: 'CE',
        key: '',
        className: 'key-dark',
        position: [1, 2],
        onClick: () => actions.clearEntry(),
      },
      {
        content: '⌫',
        key: 'Backspace',
        className: 'key-dark',
        position: [1, 4],
        onClick: () => actions.backspace(),
      },
      {
        content: '+',
        key: '+',
        className: 'key-dark',
        position: [5, 4],
        onClick: () => actions.useSign('+'),
      },
      {
        content: '-',
        key: '-',
        className: 'key-dark',
        position: [4, 4],
        onClick: () => actions.useSign('-'),
      },
      {
        content: 'x',
        key: '*',
        className: 'key-dark',
        position: [3, 4],
        onClick: () => actions.useSign('*'),
      },
      {
        content: '÷',
        key: '/',
        className: 'key-dark',
        position: [2, 4],
        onClick: () => actions.useSign('/'),
      },
      {
        content: '1/x',
        key: '',
        className: 'key-dark',
        position: [2, 1],
        onClick: () => actions.inverse(),
      },
      {
        content: '±',
        key: '',
        className: 'key-light',
        position: [6, 1],
        onClick: () => actions.opposite(),
      },
      {
        content: 'x²',
        key: '',
        className: 'key-dark',
        position: [2, 2],
        onClick: () => actions.power(),
      },
      {
        content: '²√x',
        key: '',
        className: 'key-dark',
        position: [2, 3],
        onClick: () => actions.root(),
      },
      {
        content: '%',
        key: '%',
        className: 'key-dark',
        position: [1, 1],
        onClick: () => actions.percent(),
      },
      {
        content: '=',
        key: 'Enter',
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
    throw new Error('useCalculatorContext must be used within a CalculatorContextProvider');
  }
  return context;
};
