import './style.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTasks } from '@/context/TasksContext';
import Nav from '@/containers/Nav';
import NavTabs from '@/components/NavTabs';
import EditTodoForm from './components/EditTodoForm';
import Button from '@/components/Button';
import EditListForm from './components/EditListForm';
import { PlusSvg } from '@/assets/svg';
import CreateListForm from './components/CreateListForm';
import { Todo } from './types';
import List from './components/List';
import AddTodoForm from './components/AddTodoForm';
import { useSelectedList } from './utils';
import NoContentStatement from '@/components/NoContentStatement';

type FormTypes = 'create-list' | 'edit-list' | 'edit-todo';

interface Props {
  windowId: string;
}

export default function Tasks({ windowId }: Props) {
  const { lists, actions } = useTasks();
  const { selectedListId, setSelectedListId, setSelectedListIdById, setSelectedListIdToNext } =
    useSelectedList(lists);
  const selectedList = actions.getListById(selectedListId);

  const carouselRef = useRef<HTMLDivElement>(null);

  const [showForm, setShowForm] = useState<FormTypes | null>(null);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

  const disabledClearChecked =
    selectedList?.todos.filter(({ isChecked }) => isChecked).length === 0;

  const scrollToItem = useCallback(
    (listId: string, behavior: ScrollBehavior = 'smooth') => {
      const element = document.getElementById(windowId + listId) as HTMLDivElement;
      if (element) {
        element.scrollIntoView({ behavior, block: 'start' });
      }
    },
    [windowId],
  );

  function handleEditTodo(todo: Todo) {
    setShowForm('edit-todo');
    setEditedTodo(todo);
  }

  function resetForm() {
    setShowForm(null);
    setEditedTodo(null);
  }

  function handleTabOnClick(listId: string) {
    scrollToItem(windowId + listId);
    setSelectedListIdById(listId);
  }

  useEffect(() => {
    if (selectedListId) scrollToItem(selectedListId);
  }, [selectedListId, carouselRef.current?.offsetWidth, showForm, scrollToItem]);

  useEffect(() => {
    if (selectedListId) scrollToItem(selectedListId, 'instant');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm]);

  switch (showForm) {
    case 'create-list':
      return (
        <CreateListForm
          onSave={actions.addList}
          onCancel={resetForm}
          setSelectedList={setSelectedListId}
        />
      );

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
            listId={selectedListId}
            onSave={actions.updateTodo}
            onCancel={resetForm}
          />
        )
      );

    default:
      return (
        <div className='tasks-container'>
          <Nav className='tasks-nav'>
            <NavTabs
              tabs={lists}
              activeTabId={selectedListId}
              onClick={handleTabOnClick}
              testid='todo-lists'
            />

            <Button
              className='add-list-button'
              testid='add-list-button'
              icon={<PlusSvg />}
              label='New list'
              onClick={() => setShowForm('create-list')}
            />
          </Nav>

          <div className='carousel-container'>
            {!selectedListId ? (
              <NoContentStatement title='Select list' />
            ) : !lists.length ? (
              <NoContentStatement title='No lists yet' />
            ) : (
              <div className='carousel' ref={carouselRef} data-testid='list-carousel'>
                {lists.map((list) => (
                  <List
                    key={list.id}
                    list={list}
                    handleEditTodo={handleEditTodo}
                    windowId={windowId}
                  />
                ))}
              </div>
            )}
          </div>

          {selectedListId && (
            <AddTodoForm
              selectedListId={selectedListId}
              removeList={() => {
                setSelectedListIdToNext(selectedListId);
                actions.removeList(selectedListId);
              }}
              disabledRemoveList={lists.length === 1}
              disabledClearChecked={disabledClearChecked}
              onClickEditList={() => setShowForm('edit-list')}
            />
          )}
        </div>
      );
  }
}
