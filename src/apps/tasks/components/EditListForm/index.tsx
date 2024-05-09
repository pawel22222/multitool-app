import { useState } from 'react';
import Input from '@/components/Input';
import FormContainer from '@/containers/FormContainer';
import { TodoList } from '../../types';

type Props = {
  list: TodoList;
  onSave: (listId: string, listName: string) => void;
  onCancel: () => void;
};

export default function EditListForm({ list, onSave, onCancel }: Props) {
  const [listName, setListName] = useState(list.name);

  function handleOnSave() {
    onSave(list.id, listName);
  }

  return (
    <FormContainer title='Edit list' save={handleOnSave} cancel={onCancel}>
      <Input
        value={listName}
        setValue={setListName}
        placeholder='List name'
        testid='rename-list-input'
        autoFocus
        required
      />
    </FormContainer>
  );
}
