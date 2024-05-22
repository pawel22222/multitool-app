import './style.scss';
import { useSettings } from '@/store/settings';
import { FormWrapper } from '@/components/form';
import InputCheckbox from '@/components/form/InputCheckbox';

export default function PersonalForm() {
  const { settings, setTheme } = useSettings();

  function handleSubmit() {}

  return (
    <FormWrapper submit={handleSubmit} title='General'>
      <InputCheckbox
        id='theme'
        label='Dark mode'
        checked={settings.general.theme === 'dark'}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
    </FormWrapper>
  );
}
