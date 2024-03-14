/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const headline = screen.getByText(/Apps/i);
    expect(headline).toBeInTheDocument();
  });
});
