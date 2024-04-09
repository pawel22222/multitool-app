import { useState } from 'react';
import Input from '@/components/Input';
import FormContainer from '@/containers/FormContainer';

type Props = {
  onSave: (listName: string) => void;
  onCancel: () => void;
};

export default function CreateListForm({ onSave, onCancel }: Props) {
  const [listName, setListName] = useState('');

  return (
    <FormContainer title='Create new list' save={() => onSave(listName)} cancel={onCancel}>
      <Input value={listName} setValue={setListName} placeholder='List name' autoFocus required />
    </FormContainer>
  );
}
