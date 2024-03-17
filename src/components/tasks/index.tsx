import { useState } from 'react';
import './style.scss';
import { useTasks } from '../../context/TodoListContext';
import Nav from '../../containers/nav';
import OutsideMouseDownHandler from '../../containers/OutsideMouseDownHandler';
import Todo from '../todo';

export default function Tasks() {
  const { lists, actions } = useTasks();

  const [newListName, setNewListName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTodoName, setNewTodoName] = useState('');

  const selectedList = actions.getSelectedList();

  function handleAddList(name: string) {
    const listName = name.trim();
    if (listName) {
      actions.addTodoList(listName);
    }
    setShowForm(false);
    setNewListName('');
  }

  function handleAddTodo(name: string, listId: string) {
    const todoName = name.trim();
    if (todoName) {
      actions.addTodo(name, listId);
    }
  }

  return (
    <div className='tasks-container'>
      <Nav>
        <div className='tasks-lists' data-testid='todo-lists'>
          {lists.map(({ id, name }) => (
            <button
              className='tasks-list'
              key={id}
              onClick={() => {
                actions.setSelectedListId(id);
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {showForm ? (
          <OutsideMouseDownHandler
            capture
            onOutsideClick={() => {
              setShowForm(false);
              setNewListName('');
            }}
          >
            <input
              data-testid='add-list-input'
              autoFocus
              type='text'
              value={newListName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddList(newListName);
                  setNewListName('');
                }
                if (e.key === 'Escape') {
                  setShowForm(false);
                  setNewListName('');
                }
              }}
              onChange={(e) => setNewListName(e.currentTarget.value)}
            />
          </OutsideMouseDownHandler>
        ) : (
          <button data-testid='add-list-button' onClick={() => setShowForm(true)}>
            + New list
          </button>
        )}
      </Nav>

      {selectedList ? (
        <>
          <div className='tasks-todos'>
            <div data-testid='todo-list'>
              {selectedList.todos.map((todo) => (
                <Todo key={todo.id} listId={selectedList.id} todo={todo} />
              ))}
            </div>
          </div>

          <div className='add-todo-form'>
            <input
              placeholder='New task'
              data-testid='add-todo-input'
              autoFocus
              type='text'
              value={newTodoName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo(newTodoName, selectedList.id);
                  setNewTodoName('');
                }
                if (e.key === 'Escape') {
                  setNewTodoName('');
                }
              }}
              onChange={(e) => setNewTodoName(e.target.value)}
            />

            <div>
              <button onClick={() => actions.clearChecked(selectedList.id)}>Clear checked</button>
              <button onClick={() => actions.removeTodoList(selectedList.id)}>Remove list</button>
            </div>
          </div>
        </>
      ) : (
        <div>Select list</div>
      )}
    </div>
  );
}
