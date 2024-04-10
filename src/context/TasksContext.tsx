import { createContext, useContext, useMemo, type ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoList } from '@/apps/tasks/types';

interface TasksActions {
  addList: (list: TodoList) => void;
  removeList: (listId: string) => void;
  addTodo: (name: string, listId: string) => void;
  checkTodo: (listId: string, todoId: string, isChecked: boolean) => void;
  removeTodo: (todoId: string, listId: string) => void;
  renameTodo: (listId: string, todoId: string, name: string) => void;
  renameList: (listId: string, name: string) => void;
  updateTodo: (listId: string, todoId: string, todo: Partial<Omit<Todo, 'id'>>) => void;
  clearChecked: (listId: string) => void;
  getListById: (listId: string | null) => TodoList | null;
}

interface TasksValue {
  lists: TodoList[];
  actions: TasksActions;
}

function storeLists(lists: TodoList[]) {
  localStorage.setItem('tasks', JSON.stringify(lists));
}
function getLists() {
  return JSON.parse(
    localStorage.getItem('tasks') || '[{ "id": "1", "name": "Home", "todos": [] }]',
  );
}

const TasksContext = createContext<TasksValue | null>(null);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<TodoList[]>(getLists());

  const actions: TasksActions = useMemo(() => {
    return {
      addList: (newList: TodoList) => {
        const newLists = [...lists, newList];
        storeLists(newLists);
        setLists(newLists);
      },
      renameList: (listId: string, name: string) => {
        const newLists = lists.map((list) => {
          if (list.id === listId) {
            return { ...list, name };
          }
          return list;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      removeList: (listId: string) => {
        const newLists = lists.filter(({ id }) => id !== listId);
        storeLists(newLists);
        setLists(newLists);
      },
      addTodo: (name: string, listId: string) => {
        const newTodo = {
          id: uuidv4(),
          name,
          isChecked: false,
        };
        const newLists = lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: [...todoList.todos, newTodo] };
          }
          return todoList;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      checkTodo: (listId: string, todoId: string, isChecked: boolean) => {
        const newLists = lists.map((todoList) => {
          if (todoList.id === listId) {
            return {
              ...todoList,
              todos: todoList.todos.map((todo) => {
                if (todo.id === todoId) {
                  return { ...todo, isChecked };
                }
                return todo;
              }),
            };
          }
          return todoList;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      removeTodo: (todoId: string, listId: string) => {
        const newLists = lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: todoList.todos.filter(({ id }) => id !== todoId) };
          }
          return todoList;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      clearChecked: (listId: string) => {
        const newLists = lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: todoList.todos.filter(({ isChecked }) => !isChecked) };
          }
          return todoList;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      renameTodo: (listId: string, todoId: string, name: string) => {
        const newLists = lists.map((todoList) => {
          if (todoList.id === listId) {
            return {
              ...todoList,
              todos: todoList.todos.map((todo) => {
                if (todo.id === todoId) {
                  return { ...todo, name };
                }
                return todo;
              }),
            };
          }
          return todoList;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      updateTodo: (listId: string, todoId: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
        const newLists = lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (todo.id === todoId) {
                  return { ...todo, ...updatedTodo };
                }
                return todo;
              }),
            };
          }
          return list;
        });
        storeLists(newLists);
        setLists(newLists);
      },
      getListById: (listId: string | null) => {
        if (!listId) return null;
        return lists.find(({ id }) => id === listId) || null;
      },
    };
  }, [lists]);

  const value = useMemo(() => ({ lists, actions }), [actions, lists]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext.Provider>');
  }

  return tasksContext;
};

export default TasksContext.Provider;
