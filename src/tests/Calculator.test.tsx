/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Calculator from '../apps/calculator';
import { CalculatorContextProvider } from '../context/CalculatorContext';

function renderCalculator() {
  render(
    <CalculatorContextProvider>
      <Calculator isFocused />
    </CalculatorContextProvider>,
  );
}

function getKeys() {
  return {
    k0: screen.getByTestId('key-0'),
    k1: screen.getByTestId('key-1'),
    k2: screen.getByTestId('key-2'),
    k3: screen.getByTestId('key-3'),
    k4: screen.getByTestId('key-4'),
    k5: screen.getByTestId('key-5'),
    k6: screen.getByTestId('key-6'),
    k7: screen.getByTestId('key-7'),
    k8: screen.getByTestId('key-8'),
    k9: screen.getByTestId('key-9'),
    dot: screen.getByTestId('key-dot'),
    plus: screen.getByTestId('key-plus'),
    minus: screen.getByTestId('key-minus'),
    multiply: screen.getByTestId('key-multiply'),
    division: screen.getByTestId('key-division'),
    power: screen.getByTestId('key-power'),
    root: screen.getByTestId('key-root'),
    percent: screen.getByTestId('key-percent'),
    inverse: screen.getByTestId('key-inverse'),
    opposite: screen.getByTestId('key-opposite'),
    calculate: screen.getByTestId('key-calculate'),
    clear: screen.getByTestId('key-clear'),
    clearEntry: screen.getByTestId('key-clear-entry'),
    backspace: screen.getByTestId('key-backspace'),
  };
}

describe('Calculator component', () => {
  let keys: ReturnType<typeof getKeys>;
  let mainDisplay: HTMLElement;
  let secondDisplay: HTMLElement;

  beforeEach(() => {
    renderCalculator();
    keys = getKeys();
    mainDisplay = screen.getByTestId('main-display');
    secondDisplay = screen.getByTestId('second-display');
  });

  it('renders calculator', () => {
    Object.values(keys).forEach((key) => {
      expect(key).toBeInTheDocument();
    });
    expect(mainDisplay).toBeInTheDocument();
    expect(secondDisplay).toBeInTheDocument();
    expect(mainDisplay.textContent).toBe('0');
    expect(secondDisplay.textContent).toBe('');
  });

  it('enter all numbers', () => {
    const { k1, k2, k3, k4, k5, k6, k7, k8, k9, k0, dot } = keys;
    const queueToClick = [k1, k2, k3, k4, k5, k6, k7, k8, k9, k0, dot, k1, k2, k3, k4, k5, k6];
    queueToClick.forEach((key) => {
      fireEvent.click(key);
    });
    expect(mainDisplay.textContent).toBe('1 234 567 890.123456');
  });

  it('backspace', () => {
    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    expect(mainDisplay.textContent).toBe('1 111');

    fireEvent.click(keys.backspace);
    expect(mainDisplay.textContent).toBe('111');

    fireEvent.click(keys.clearEntry);
    expect(mainDisplay.textContent).toBe('0');

    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.clearEntry);
    expect(mainDisplay.textContent).toBe('0');
  });

  it('clear entry', () => {
    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.clearEntry);
    expect(mainDisplay.textContent).toBe('0');
  });

  it('clear', () => {
    fireEvent.click(keys.k1);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.clear);
    expect(mainDisplay.textContent).toBe('0');
  });

  it('Enter numbers', () => {
    fireEvent.click(keys.k1);
    expect(mainDisplay.textContent).toBe('1');

    for (let i = 0; i < 5; i++) {
      fireEvent.click(keys.k1);
    }
    expect(mainDisplay.textContent).toBe('111 111');

    fireEvent.click(keys.dot);
    fireEvent.click(keys.dot);
    expect(mainDisplay.textContent).toBe('111 111.');

    fireEvent.click(keys.k0);
    expect(mainDisplay.textContent).toBe('111 111.0');

    fireEvent.click(keys.clear);
    expect(mainDisplay.textContent).toBe('0');

    for (let i = 0; i < 20; i++) {
      fireEvent.click(keys.k9);
    }
    expect(mainDisplay.textContent).toBe('9 999 999 999 999 999');

    // Todo: fix display float numbers
    // fireEvent.click(keys.clear);
    // fireEvent.click(keys.dot);
    // for (let i = 0; i < 20; i++) {
    //   fireEvent.click(keys.k9);
    // }
    // fireEvent.click(keys.dot);
    // for (let i = 0; i < 20; i++) {
    //   fireEvent.click(keys.k9);
    // }
    // expect(display.textContent).toBe('0.9999999999999999');
    fireEvent.click(keys.clear);
    fireEvent.click(keys.k1);
    fireEvent.click(keys.dot);
    for (let i = 0; i < 20; i++) {
      fireEvent.click(keys.k9);
    }
    expect(mainDisplay.textContent).toBe('1.999999999999999');
  });

  it('plus and minus', () => {
    fireEvent.click(keys.k2);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.plus);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.calculate);
    expect(mainDisplay.textContent).toBe('24');
    fireEvent.click(keys.minus);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.calculate);
    expect(mainDisplay.textContent).toBe('22');
  });

  it('multiply and division', () => {
    fireEvent.click(keys.k2);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.multiply);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.calculate);
    expect(mainDisplay.textContent).toBe('44');
    fireEvent.click(keys.division);
    fireEvent.click(keys.k2);
    fireEvent.click(keys.calculate);
    expect(mainDisplay.textContent).toBe('22');
  });

  it('power and root', () => {
    fireEvent.click(keys.k3);
    fireEvent.click(keys.power);
    expect(mainDisplay.textContent).toBe('9');
    fireEvent.click(keys.power);
    expect(mainDisplay.textContent).toBe('81');
    fireEvent.click(keys.root);
    expect(mainDisplay.textContent).toBe('9');
    fireEvent.click(keys.root);
    expect(mainDisplay.textContent).toBe('3');
  });

  it('inverse and opposite', () => {
    fireEvent.click(keys.k4);
    fireEvent.click(keys.inverse);
    expect(mainDisplay.textContent).toBe('0.25');
    fireEvent.click(keys.opposite);
    expect(mainDisplay.textContent).toBe('-0.25');
    fireEvent.click(keys.inverse);
    expect(mainDisplay.textContent).toBe('-4');
    fireEvent.click(keys.opposite);
    expect(mainDisplay.textContent).toBe('4');
  });
});
