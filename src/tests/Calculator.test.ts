import { describe, expect, it } from 'vitest';
import { calculateTwoNumbers } from '../calculator/Calculator';

describe('Calculator utils', () => {
  it('Add two numbers Add', () => {
    expect(calculateTwoNumbers('2', '4', '+')).toBe('6');
  });

  it('Minus two numbers', () => {
    expect(calculateTwoNumbers('2', '4', '-')).toBe('-2');
  });
});
