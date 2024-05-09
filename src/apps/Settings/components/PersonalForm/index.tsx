import './style.scss';
import { useState } from 'react';
import { useSettings } from '@/store/settings';
import { FormWrapper, InputText, Submit } from '@/components/form';

export default function PersonalForm() {
  const { settings, setName } = useSettings();
  const [inputName, setInputName] = useState(settings.personal.name);

  function handleSubmit() {
    setName(inputName);
  }

  return (
    <FormWrapper submit={handleSubmit}>
      <InputText
        id='settings-personal-name'
        label='Name'
        value={inputName}
        setValue={setInputName}
        testid='input-name'
      />

      <Submit label='Save' />
    </FormWrapper>
  );
}
