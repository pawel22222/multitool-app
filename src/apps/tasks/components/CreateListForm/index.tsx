import { useState } from 'react';
import Input from '@/components/Input';
import FormContainer from '@/containers/FormContainer';
import { TodoList } from '../../types';
import { createTodoList } from '../../utils';

type Props = {
  onSave: (list: TodoList) => void;
  onCancel: () => void;
  setSelectedList: (listId: string) => void;
};

export default function CreateListForm({ onSave, onCancel, setSelectedList }: Props) {
  const [listName, setListName] = useState('');

  function handleOnSave() {
    const newList = createTodoList(listName);
    onSave(newList);
    setSelectedList(newList.id);
  }

  return (
    <FormContainer title='Create new list' save={handleOnSave} cancel={onCancel}>
      <Input
        value={listName}
        setValue={setListName}
        placeholder='List name'
        testid='add-list-input'
        autoFocus
        required
      />
    </FormContainer>
  );
}
