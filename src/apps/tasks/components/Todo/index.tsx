import './style.scss';
import { Todo as TodoType } from '../../types';
import EditableField from '@/components/EditableField';
import { EditSvg, TrashSvg } from '@/assets/svg';
import Button from '@/components/Button';
import { useTasks } from '@/store/tasks';

type Props = { todo: TodoType; listId: string; onEdit: (todo: TodoType) => void };

export default function Todo({ todo, listId, onEdit }: Props) {
  const { renameTodo, checkTodo, removeTodo } = useTasks();
  const { id, name, isChecked } = todo;

  function handleRenameTodo(name: string) {
    renameTodo(listId, id, name);
  }

  return (
    <div className='todo-container' data-testid='todo-container'>
      <div className='todo-checkbox-container'>
        <input
          className='todo-checkbox'
          type='checkbox'
          checked={isChecked}
          onChange={() => checkTodo(listId, id, !isChecked)}
          data-testid='todo-radio'
        />

        <EditableField
          value={name}
          type='textarea'
          className='todo-name'
          saveField={handleRenameTodo}
        />
      </div>

      <div className='todo-buttons'>
        <Button
          className='button edit'
          icon={<EditSvg />}
          onClick={() => onEdit(todo)}
          testid='todo-edit-button'
        />

        <Button
          className='button remove'
          icon={<TrashSvg />}
          onClick={() => removeTodo(id, listId)}
          testid='todo-remove-button'
        />
      </div>
    </div>
  );
}
