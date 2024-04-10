import './style.scss';
import { Todo as TodoType, TodoList } from '../../types';
import Todo from '../Todo';
import NoContentStatement from '@/components/NoContentStatement';
import DropdownContent from '@/containers/DropdownContent';

type Props = {
  list: TodoList;
  handleEditTodo: (todo: TodoType) => void;
  windowId: string;
};

export default function List({ list, handleEditTodo, windowId }: Props) {
  const { id, todos } = list;

  const currentTodos = todos.filter(({ isChecked }) => !isChecked);
  const checkedTodos = todos.filter(({ isChecked }) => isChecked);

  return (
    <div className='list-container' id={windowId + id}>
      {currentTodos.length ? (
        currentTodos.map((todo) => (
          <Todo key={todo.id} listId={id} todo={todo} onEdit={handleEditTodo} />
        ))
      ) : (
        <NoContentStatement title='No tasks yet' />
      )}

      {!!checkedTodos.length && (
        <DropdownContent title={`Completed (${checkedTodos.length})`}>
          {checkedTodos.map((todo) => (
            <Todo key={todo.id} listId={id} todo={todo} onEdit={handleEditTodo} />
          ))}
        </DropdownContent>
      )}
    </div>
  );
}
