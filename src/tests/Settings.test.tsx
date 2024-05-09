/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Settings from '@/apps/Settings';

describe('Settings', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(<Settings />);
  });

  it('Renders settings', () => {
    const sidebar = component.getByTestId('settings-categories');
    expect(sidebar.childNodes.length).toBe(2);
    expect(component.getByText('General')).toBeInTheDocument();
    expect(component.getByText('Personal')).toBeInTheDocument();
  });

  it('Should update personal settings', () => {
    const generalButton = component.getByTestId('general');
    const personalButton = component.getByTestId('personal');
    fireEvent.click(personalButton);

    const nameInput = component.getByTestId('input-name') as HTMLInputElement;
    const submitButton = component.getByText('Save');
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    fireEvent.click(generalButton);
    fireEvent.click(personalButton);

    expect(nameInput.value).toBe('123');
  });
});
