import { DECIMAL_POINT, DIVISION_BY_ZERO_ERROR } from '../context/CalculatorContext';
import { Signs } from '../types/calculator';

export const PRECISION = 12;

export function formatNumberToDisplay(n: string | null): string | null {
  if (n === null) {
    return null;
  }
  if (String(n).includes(DECIMAL_POINT)) {
    return String(n);
  }
  return String(Number(n));
}

export function parseNumber(n: number | string, precision: number = 12): string {
  return String(Number(Number(n).toPrecision(precision)));
}

export function calculateTwoNumbers(s1: string, s2: string | null, sign: Signs | null) {
  const n1 = Number(s1);
  const n2 = Number(s2);

  switch (sign) {
    case '+':
      return parseNumber(n1 + n2, PRECISION);
    case '-':
      return parseNumber(n1 - n2, PRECISION);
    case '*':
      return parseNumber(n1 * n2, PRECISION);
    case '/':
      if (n2 === 0) {
        return DIVISION_BY_ZERO_ERROR;
      }
      return parseNumber(n1 / n2, PRECISION);
    case null:
      return parseNumber(n1, PRECISION);
    default:
      const never: never = sign;
      throw Error(never);
  }
}
