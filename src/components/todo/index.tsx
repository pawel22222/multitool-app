import './style.scss';
import { Todo as TodoType } from '../../types/tasks';
import { useTasks } from '../../context/TodoListContext';
import EditableField from '../editableField';

type Props = { todo: TodoType; listId: string };

export default function Todo({ todo, listId }: Props) {
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

      <button className='todo-button remove' onClick={() => actions.removeTodo(id, listId)}>
        X
      </button>
    </div>
  );
}
