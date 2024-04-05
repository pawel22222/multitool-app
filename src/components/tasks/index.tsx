import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { useTasks } from '../../context/TodoListContext';
import Nav from '../../containers/nav';
import OutsideMouseDownHandler from '../../containers/OutsideMouseDownHandler';
import Todo from '../todo';
import NavTabs from '../NavTabs';

export default function Tasks() {
  const { lists, actions, selectedListId } = useTasks();

  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollToItem = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function handleSetSelectedList(id: string) {
    actions.setSelectedListId(id);
  }

  useEffect(() => {
    if (selectedListId) scrollToItem(selectedListId);
  }, [selectedListId, carouselRef.current?.offsetWidth]);

  return (
    <div className='tasks-container'>
      <Nav className='tasks-nav'>
        <NavTabs tabs={lists} activeTabId={selectedList?.id} selectTab={handleSetSelectedList} />

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

      <div className='carousel' ref={carouselRef}>
        {lists.map(({ id, todos }) => (
          <div className='list-container' id={id}>
            {todos.map((todo) => (
              <Todo key={todo.id} listId={id} todo={todo} />
            ))}
          </div>
        ))}
      </div>

      {selectedList && (
        <div className='add-todo-form'>
          <input
            className='add-todo-input'
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
      )}
    </div>
  );
}
