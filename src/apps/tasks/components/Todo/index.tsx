import './style.scss';
import { Todo as TodoType } from '../../types';
import { useTasks } from '@/context/TasksContext';
import EditableField from '@/components/EditableField';
import { EditSvg, TrashSvg } from '@/assets/svg';
import Button from '@/components/Button';

type Props = { todo: TodoType; listId: string; onEdit: (todo: TodoType) => void };

export default function Todo({ todo, listId, onEdit }: Props) {
  const { actions } = useTasks();
  const { id, name, isChecked } = todo;

  function handleRenameTodo(name: string) {
    actions.renameTodo(listId, id, name);
  }

  return (
    <div className='todo-container' data-testid='todo-container'>
      <div className='todo-checkbox-container'>
        <input
          className='todo-checkbox'
          type='checkbox'
          checked={isChecked}
          onChange={() => actions.checkTodo(listId, id, !isChecked)}
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
          onClick={() => actions.removeTodo(id, listId)}
          testid='todo-remove-button'
        />
      </div>
    </div>
  );
}
