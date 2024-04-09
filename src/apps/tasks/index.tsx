import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { useTasks } from '@/context/TodoListContext';
import Nav from '@/containers/Nav';
import Todo from './components/Todo';
import NavTabs from '@/components/NavTabs';
import EditTodoForm from './components/EditTodoForm';
import Input from '@/components/Input';
import Button from '@/components/Button';
import EditListForm from './components/EditListForm';
import { ClearAllSvg, EditSvg, PlusSvg, TrashSvg } from '@/assets/svg';
import CreateListForm from './components/CreateListForm';
import { Todo as TodoType } from './types';

type FormTypes = 'create-list' | 'edit-list' | 'edit-todo';

export default function Tasks() {
  const { lists, actions, selectedListId } = useTasks();
  const selectedList = actions.getSelectedList();

  const carouselRef = useRef<HTMLDivElement>(null);

  const [showForm, setShowForm] = useState<FormTypes | null>(null);
  const [editedTodo, setEditedTodo] = useState<TodoType | null>(null);
  const [newTodoName, setNewTodoName] = useState('');

  const scrollToItem = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    }
  };

  function handleEditTodo(todo: TodoType) {
    setShowForm('edit-todo');
    setEditedTodo(todo);
  }

  function resetForm() {
    setShowForm(null);
    setEditedTodo(null);
  }

  function handleTabOnClick(id: string) {
    scrollToItem(id);
    actions.setSelectedListId(id);
  }

  useEffect(() => {
    if (selectedListId) scrollToItem(selectedListId);
  }, [selectedListId, carouselRef.current?.offsetWidth, showForm]);

  useEffect(() => {
    if (selectedListId) scrollToItem(selectedListId, 'instant');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm]);

  switch (showForm) {
    case 'create-list':
      return <CreateListForm onSave={actions.addList} onCancel={resetForm} />;

    case 'edit-list':
      return (
        selectedList && (
          <EditListForm list={selectedList} onSave={actions.renameList} onCancel={resetForm} />
        )
      );

    case 'edit-todo':
      return (
        editedTodo && (
          <EditTodoForm
            todo={editedTodo}
            listId={selectedList?.id}
            onSave={actions.updateTodo}
            onCancel={resetForm}
          />
        )
      );

    default:
      return (
        <div className='tasks-container'>
          <Nav className='tasks-nav'>
            <NavTabs tabs={lists} activeTabId={selectedList?.id} onClick={handleTabOnClick} />

            <Button
              className='add-list-button'
              data-testid='add-list-button'
              icon={<PlusSvg />}
              label='New list'
              onClick={() => setShowForm('create-list')}
            />
          </Nav>

          <div className='carousel-container'>
            <div className='carousel' ref={carouselRef}>
              {lists.map(({ id, todos }) => (
                <div className='list-container' id={id} key={id}>
                  {todos.length ? (
                    todos.map((todo) => (
                      <Todo key={todo.id} listId={id} todo={todo} onEdit={handleEditTodo} />
                    ))
                  ) : (
                    <div>No tasks yet</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedList && (
            <div className='add-todo-form'>
              <Input
                data-testid='add-todo-input'
                placeholder='New task'
                value={newTodoName}
                setValue={setNewTodoName}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    actions.addTodo(newTodoName, selectedList.id);
                    setNewTodoName('');
                  }
                }}
              />

              <div className='buttons'>
                <Button
                  icon={<ClearAllSvg />}
                  label='Clear checked'
                  onClick={() => actions.clearChecked(selectedList.id)}
                />
                <Button
                  icon={<EditSvg />}
                  label='Rename list'
                  onClick={() => setShowForm('edit-list')}
                />
                <Button
                  icon={<TrashSvg />}
                  label='Remove list'
                  onClick={() => actions.removeList(selectedList.id)}
                />
              </div>
            </div>
          )}
        </div>
      );
  }
}
