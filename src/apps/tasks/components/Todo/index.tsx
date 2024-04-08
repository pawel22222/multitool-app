import './style.scss';
import { Todo as TodoType } from '../../types';
import { useTasks } from '../../../../context/TodoListContext';
import EditableField from '../../../../components/EditableField';
import { EditSvg, TrashSvg } from '../../../../assets/svg';
import Button from '../../../../components/Button';

type Props = { todo: TodoType; listId: string; onEdit: (todo: TodoType) => void };

export default function Todo({ todo, listId, onEdit }: Props) {
  const { actions } = useTasks();
  const { id, name, isChecked } = todo;

  function handleRenameTodo(name: string) {
    actions.renameTodo(listId, id, name);
  }

  return (
    <div className='todo-container'>
      <input
        className='todo-checkbox'
        type='checkbox'
        checked={isChecked}
        onChange={() => actions.checkTodo(listId, id, !isChecked)}
      />

      <EditableField value={name} className='todo-name' saveField={handleRenameTodo} />

      <div className='todo-buttons'>
        <Button className='button edit' icon={<EditSvg />} onClick={() => onEdit(todo)} />

        <Button
          className='button remove'
          icon={<TrashSvg />}
          onClick={() => actions.removeTodo(id, listId)}
        />
      </div>
    </div>
  );
}
