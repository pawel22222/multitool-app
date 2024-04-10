import './style.scss';
import { useState } from 'react';
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
  const showContentState = useState(false);
  const [showChecked] = showContentState;

  const currentTodos = todos.filter(({ isChecked }) => !isChecked);
  const checkedTodos = todos.filter(({ isChecked }) => isChecked);

  return (
    <div className='list-container' id={windowId + id}>
      {!!currentTodos.length &&
        currentTodos.map((todo) => (
          <Todo key={todo.id} listId={id} todo={todo} onEdit={handleEditTodo} />
        ))}

      {!!checkedTodos.length && (
        <DropdownContent
          title={`Completed (${checkedTodos.length})`}
          customShowContentState={showContentState}
        >
          {checkedTodos.map((todo) => (
            <Todo key={todo.id} listId={id} todo={todo} onEdit={handleEditTodo} />
          ))}
        </DropdownContent>
      )}

      {!currentTodos.length && !showChecked && <NoContentStatement title='No tasks yet' />}
    </div>
  );
}
