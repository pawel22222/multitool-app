import { describe, expect, it } from 'vitest';
import { calculateTwoNumbers, formatNumberToDisplay, parseNumber } from '../utils/calculator';
import { DIVISION_BY_ZERO_ERROR } from '../context/CalculatorContext';

describe('calculateTwoNumbers function', () => {
  it('Add two numbers Add', () => {
    expect(calculateTwoNumbers('2', '4', '+')).toBe('6');
    expect(calculateTwoNumbers('0', '4', '+')).toBe('4');
    expect(calculateTwoNumbers('2', '0', '+')).toBe('2');
    expect(calculateTwoNumbers('0', '0', '+')).toBe('0');
    expect(calculateTwoNumbers('-2', '0', '+')).toBe('-2');
    expect(calculateTwoNumbers('0', '-4', '+')).toBe('-4');
    expect(calculateTwoNumbers('-2', '-4', '+')).toBe('-6');
    expect(calculateTwoNumbers('2.2', '4.4', '+')).toBe('6.6');
    expect(calculateTwoNumbers('-2.2', '4.4', '+')).toBe('2.2');
    expect(calculateTwoNumbers('2.2', '-4.4', '+')).toBe('-2.2');
    expect(calculateTwoNumbers('-2.2', '-4.4', '+')).toBe('-6.6');
  });

  it('Minus two numbers', () => {
    expect(calculateTwoNumbers('2', '4', '-')).toBe('-2');
    expect(calculateTwoNumbers('0', '4', '-')).toBe('-4');
    expect(calculateTwoNumbers('2', '0', '-')).toBe('2');
    expect(calculateTwoNumbers('0', '0', '-')).toBe('0');
    expect(calculateTwoNumbers('-2', '0', '-')).toBe('-2');
    expect(calculateTwoNumbers('0', '-4', '-')).toBe('4');
    expect(calculateTwoNumbers('-2', '-4', '-')).toBe('2');
    expect(calculateTwoNumbers('2.2', '4.4', '-')).toBe('-2.2');
    expect(calculateTwoNumbers('-2.2', '4.4', '-')).toBe('-6.6');
    expect(calculateTwoNumbers('2.2', '-4.4', '-')).toBe('6.6');
    expect(calculateTwoNumbers('-2.2', '-4.4', '-')).toBe('2.2');
  });

  it('Multipy two numbers', () => {
    expect(calculateTwoNumbers('2', '4', '*')).toBe('8');
    expect(calculateTwoNumbers('0', '4', '*')).toBe('0');
    expect(calculateTwoNumbers('2', '0', '*')).toBe('0');
    expect(calculateTwoNumbers('0', '0', '*')).toBe('0');
    expect(calculateTwoNumbers('-2', '0', '*')).toBe('0');
    expect(calculateTwoNumbers('0', '-4', '*')).toBe('0');
    expect(calculateTwoNumbers('-2', '-4', '*')).toBe('8');
    expect(calculateTwoNumbers('2.2', '4.4', '*')).toBe('9.68');
    expect(calculateTwoNumbers('-2.2', '4.4', '*')).toBe('-9.68');
    expect(calculateTwoNumbers('2.2', '-4.4', '*')).toBe('-9.68');
    expect(calculateTwoNumbers('-2.2', '-4.4', '*')).toBe('9.68');
  });

  it('Division two numbers', () => {
    expect(calculateTwoNumbers('2', '4', '/')).toBe('0.5');
    expect(calculateTwoNumbers('0', '4', '/')).toBe('0');
    expect(calculateTwoNumbers('2', '0', '/')).toBe(DIVISION_BY_ZERO_ERROR);
    expect(calculateTwoNumbers('0', '0', '/')).toBe(DIVISION_BY_ZERO_ERROR);
    expect(calculateTwoNumbers('-2', '0', '/')).toBe(DIVISION_BY_ZERO_ERROR);
    expect(calculateTwoNumbers('0', '-4', '/')).toBe('0');
    expect(calculateTwoNumbers('-2', '-4', '/')).toBe('0.5');
    expect(calculateTwoNumbers('2.2', '4.4', '/')).toBe('0.5');
    expect(calculateTwoNumbers('-2.2', '4.4', '/')).toBe('-0.5');
    expect(calculateTwoNumbers('2.2', '-4.4', '/')).toBe('-0.5');
    expect(calculateTwoNumbers('-2.2', '-4.4', '/')).toBe('0.5');
  });

  it('Try calculate without sign ', () => {
    expect(calculateTwoNumbers('2', '4', null)).toBe('2');
    expect(calculateTwoNumbers('0', '4', null)).toBe('0');
    expect(calculateTwoNumbers('2', '0', null)).toBe('2');
    expect(calculateTwoNumbers('0', '0', null)).toBe('0');
  });
});

describe('parseNumber function', () => {
  it('parse number', () => {
    expect(parseNumber(1 / 3)).toBe('0.333333333333');
    expect(parseNumber('0.3333333333333333')).toBe('0.333333333333');
    expect(parseNumber('0.5555555555555555')).toBe('0.555555555556');
    expect(parseNumber('0.9999999999999999')).toBe('1');
    expect(parseNumber('0.1111111111111111')).toBe('0.111111111111');
    expect(parseNumber('00001')).toBe('1');
    expect(parseNumber('0000.1')).toBe('0.1');
    expect(parseNumber('0000.10000')).toBe('0.1');
    expect(parseNumber('1.')).toBe('1');
    expect(parseNumber('1.0')).toBe('1');
  });
});

describe('formatNumber function', () => {
  it('format number', () => {
    expect(formatNumberToDisplay(String(1 / 3))).toBe('0.3333333333333333');
    expect(formatNumberToDisplay('0.3333333333333333')).toBe('0.3333333333333333');
    expect(formatNumberToDisplay('0.5555555555555555')).toBe('0.5555555555555555');
    expect(formatNumberToDisplay('0.9999999999999999')).toBe('0.9999999999999999');
    expect(formatNumberToDisplay('0.1111111111111111')).toBe('0.1111111111111111');
    expect(formatNumberToDisplay('00001')).toBe('1');
    expect(formatNumberToDisplay('0000.1')).toBe('0000.1');
    expect(formatNumberToDisplay('0000.10000')).toBe('0000.10000');
    expect(formatNumberToDisplay('1.')).toBe('1.');
    expect(formatNumberToDisplay('1.0')).toBe('1.0');
  });
});
