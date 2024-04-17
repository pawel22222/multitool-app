import './style.scss';
import { useState } from 'react';
import { useSettings } from '@/store/settings';
import { Theme } from '../../types';
import { FormWrapper, InputRadioFieldset, Submit } from '@/components/form';

export default function PersonalForm() {
  const { settings, setTheme } = useSettings();
  const [inputTheme, setInputTheme] = useState(settings.general.theme);

  const themeValues: { label: string; value: Theme }[] = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
  ];

  function handleSubmit() {
    setTheme(inputTheme);
  }

  return (
    <FormWrapper submit={handleSubmit}>
      <InputRadioFieldset
        label='Theme'
        selected={inputTheme}
        setSelected={setInputTheme}
        values={themeValues}
      />

      <Submit label='Save' />
    </FormWrapper>
  );
}
