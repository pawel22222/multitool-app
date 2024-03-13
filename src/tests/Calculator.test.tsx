/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Calculator from '../components/calculator';
import { CalculatorContextProvider } from '../context/CalculatorContext';
import WindowWrapper from '../containers/windowWrapper';

describe('Calculator', () => {
  it('renders calculator', () => {
    render(
      <CalculatorContextProvider>
        <WindowWrapper
          windowData={{
            displayName: 'Calculator123',
            iconSrc: '',
            id: '1',
            isFullscreen: false,
            isMinimalize: false,
            minSize: { height: '600px', width: '500px' },
            type: 'calculator',
            zIndex: 1,
          }}
          closeApp={() => {}}
          setIsMinimalize={() => {}}
          setIsFullscreen={() => {}}
          isFocused
          handleSetFocusedWindowId={() => {}}
        >
          <Calculator isFocused />
        </WindowWrapper>
      </CalculatorContextProvider>,
    );
    const result = screen.getByText(/Calculator123/i);
    expect(result).toBeInTheDocument();
  });
});
