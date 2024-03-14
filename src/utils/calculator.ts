import Big, { BigSource } from 'big.js';
import { Chars, DecimalPoint, Signs } from '../types/calculator';

export const PRECISION = 16;
export const DECIMAL_POINT: DecimalPoint = '.';
export const DIVISION_BY_ZERO_ERROR = 'Nie można dzielić przez zero';

export function parseBig(n: BigSource | null) {
  return Big(n || 0).toString();
}

export function calculateTwoNumbers(s1: string | null, s2: string | null, sign: Signs | null) {
  const n1 = Big(s1 || 0);
  const n2 = Big(s2 || 0);

  switch (sign) {
    case '+':
      return parseBig(n1.add(n2));
    case '-':
      return parseBig(n1.minus(n2));
    case '*':
      return parseBig(n1.times(n2));
    case '/':
      if (n2.eq(0)) {
        return DIVISION_BY_ZERO_ERROR;
      }
      return parseBig(n1.div(n2));
    case null:
      return parseBig(n1);
    default:
      const never: never = sign;
      throw Error(never);
  }
}

export function sliseN(n: string) {
  if (n.includes(DECIMAL_POINT)) {
    return n.slice(0, PRECISION + 1);
  }
  return n.slice(0, PRECISION);
}

export function addCharToNumber(n: string | null, char: Chars) {
  if (char === DECIMAL_POINT) {
    if (n?.includes(DECIMAL_POINT)) {
      return n;
    }
    if (n === '0' || n === null) {
      return '0.';
    }
    return sliseN(n + char);
  }
  if (!n || n === '0') {
    return char;
  }
  return sliseN(n + char);
}

export function numberToDisplay(n: string | null) {
  if (!n) return '0';
  const [decimal, float] = n.split(DECIMAL_POINT);
  let counter = 0;

  const newDecimal = decimal
    .split('')
    .reduceRight((acc: string[], char) => {
      counter++;
      if (counter === 3) {
        counter = 0;
        return [' ', char, ...acc];
      }
      return [char, ...acc];
    }, [])
    .join('')
    .trim();

  return n.includes(DECIMAL_POINT) ? `${newDecimal}.${float}` : newDecimal;
}
