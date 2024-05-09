import './style.scss';
import { useState } from 'react';
import { ClearAllSvg, EditSvg, TrashSvg } from '@/assets/svg';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useTasks } from '@/store/tasks';

type Props = {
  selectedListId: string;
  removeList: () => void;
  disabledRemoveList: boolean;
  disabledClearChecked: boolean;
  onClickEditList: () => void;
};

export default function AddTodoForm({
  selectedListId,
  removeList,
  disabledRemoveList,
  disabledClearChecked,
  onClickEditList,
}: Props) {
  const [newTodoName, setNewTodoName] = useState('');
  const { addTodo, clearChecked } = useTasks();

  return (
    <div className='add-todo-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTodoName, selectedListId);
          setNewTodoName('');
        }}
      >
        <Input
          testid='add-todo-input'
          placeholder='New task'
          value={newTodoName}
          setValue={setNewTodoName}
          autoFocus
        />
      </form>

      <div className='buttons'>
        <Button
          icon={<ClearAllSvg />}
          label='Clear checked'
          onClick={() => clearChecked(selectedListId)}
          disabled={disabledClearChecked}
          testid='clear-checked-button'
        />
        <Button
          icon={<EditSvg />}
          label='Rename list'
          onClick={onClickEditList}
          testid='rename-list-button'
        />
        <Button
          icon={<TrashSvg />}
          label='Remove list'
          onClick={removeList}
          disabled={disabledRemoveList}
          testid='remove-list-button'
        />
      </div>
    </div>
  );
}
