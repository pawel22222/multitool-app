import { createContext, useContext, ReactNode, useReducer } from 'react';
import {
  AllActions,
  CalcState,
  CalculatorActions,
  Chars,
  DecimalPoint,
  Digits,
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
}

const CalculatorContext = createContext<CalculatorContextData | undefined>(undefined);

export const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
  const [calcState, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const actions: CalculatorActions = {
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
  };

  return (
    <CalculatorContext.Provider value={{ calcState, actions }}>
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
