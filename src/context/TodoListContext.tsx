import { createContext, useContext, useMemo, type ReactNode, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoList } from '../apps/tasks/types';

interface TasksActions {
  addList: (name: string) => void;
  removeList: (listId: string) => void;
  addTodo: (name: string, listId: string) => void;
  checkTodo: (listId: string, todoId: string, isChecked: boolean) => void;
  removeTodo: (todoId: string, listId: string) => void;
  renameTodo: (listId: string, todoId: string, name: string) => void;
  renameList: (listId: string, name: string) => void;
  updateTodo: (listId: string, todoId: string, todo: Partial<Omit<Todo, 'id'>>) => void;
  clearChecked: (listId: string) => void;
  setSelectedListId: (id: string) => void;
  getSelectedList: () => TodoList | undefined;
}

interface TasksValue {
  lists: TodoList[];
  selectedListId: string | null;
  actions: TasksActions;
}

const TasksContext = createContext<TasksValue | null>(null);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<TodoList[]>([
    { id: '1', name: 'Zakupy', todos: [{ id: '1', name: 'Mleko', isChecked: false }] },
  ]);
  const [selectedListId, setSelectedListId] = useState<string | null>('1');

  const addList = (name: string) => {
    const newList = {
      id: uuidv4(),
      name,
      todos: [],
    };
    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
  };

  const renameList = (listId: string, name: string) => {
    setLists((prev) => {
      return prev.map((list) => {
        if (list.id === listId) {
          return { ...list, name };
        }
        return list;
      });
    });
  };

  const removeList = useCallback(
    (listId: string) => {
      if (selectedListId === listId) {
        setSelectedListId(lists[0]?.id || null);
      }
      setLists((prev) => prev.filter(({ id }) => id !== listId));
    },
    [lists, selectedListId],
  );

  const addTodo = (name: string, listId: string) => {
    const newTodo = {
      id: uuidv4(),
      name,
      isChecked: false,
    };
    setLists((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === listId) {
          return { ...todoList, todos: [...todoList.todos, newTodo] };
        }
        return todoList;
      });
    });
  };

  const checkTodo = (listId: string, todoId: string, isChecked: boolean) => {
    setLists((prev) => {
      return prev.map((todoList) => {
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
    });
  };

  const renameTodo = (listId: string, todoId: string, name: string) => {
    setLists((prev) => {
      return prev.map((todoList) => {
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
    });
  };

  const updateTodo = (listId: string, todoId: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
    setLists((prev) => {
      return prev.map((list) => {
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
    });
  };

  const removeTodo = (todoId: string, listId: string) => {
    setLists((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === listId) {
          return { ...todoList, todos: todoList.todos.filter(({ id }) => id !== todoId) };
        }
        return todoList;
      });
    });
  };

  const clearChecked = (listId: string) => {
    setLists((prev) => {
      return prev.map((todoList) => {
        if (todoList.id === listId) {
          return { ...todoList, todos: todoList.todos.filter(({ isChecked }) => !isChecked) };
        }
        return todoList;
      });
    });
  };

  const getSelectedList = useCallback(() => {
    const selectedList = lists.find(({ id }) => id === selectedListId);
    // if (!selectedList) {
    //   throw new Error(`not found selectedListId=${selectedListId}`);
    // }
    return selectedList;
  }, [lists, selectedListId]);

  const actions: TasksActions = useMemo(() => {
    return {
      addList,
      renameList,
      removeList,
      addTodo,
      checkTodo,
      removeTodo,
      clearChecked,
      setSelectedListId,
      getSelectedList,
      renameTodo,
      updateTodo,
    };
  }, [getSelectedList, removeList]);
  const value = useMemo(
    () => ({ lists, selectedListId, actions }),
    [actions, lists, selectedListId],
  );

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
