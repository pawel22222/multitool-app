import { useState } from 'react';
import FormContainer from '@/containers/FormContainer';
import { Todo } from '../../types';
import Input from '@/components/Input';
import Button from '@/components/Button';

type Props = {
  todo: Todo;
  listId: string | null;
  onSave: (listId: string, todoId: string, todo: Partial<Omit<Todo, 'id'>>) => void;
  onCancel: () => void;
};

export default function EditTodoForm({ todo, listId, onSave, onCancel }: Props) {
  const [todoInput, setTodoInput] = useState(todo?.name || '');

  function handleOnSave() {
    onSave(listId || '', todo.id, { name: todoInput });
    onCancel();
  }

  function handleToggleIsChecked() {
    onSave(listId || '', todo.id, { name: todoInput, isChecked: !todo.isChecked });
    onCancel();
  }

  return (
    <FormContainer title='Edit todo' save={handleOnSave} cancel={onCancel}>
      <Input
        value={todoInput}
        setValue={setTodoInput}
        placeholder='Todo name'
        testid='todo-rename-input'
        autoFocus
        required
      />

      <Button
        label={todo.isChecked ? 'Mark uncompleted' : 'Mark completed'}
        onClick={handleToggleIsChecked}
      />
    </FormContainer>
  );
}
