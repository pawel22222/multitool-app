import { createContext, useContext, useMemo, type ReactNode, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from '../apps/tasks/types';

interface TasksActions {
  addTodoList: (name: string) => void;
  removeTodoList: (listId: string) => void;
  addTodo: (name: string, listId: string) => void;
  checkTodo: (listId: string, todoId: string, isChecked: boolean) => void;
  removeTodo: (todoId: string, listId: string) => void;
  renameTodo: (listId: string, todoId: string, name: string) => void;
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
  const [lists, setLists] = useState<TodoList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const addTodoList = (name: string) => {
    const newTodoList = {
      id: uuidv4(),
      name,
      todos: [],
    };
    setLists((prev) => [...prev, newTodoList]);
    setSelectedListId(newTodoList.id);
  };

  const removeTodoList = (listId: string) => {
    if (selectedListId === listId) {
      setSelectedListId(lists[0]?.id || null);
    }
    setLists((prev) => prev.filter(({ id }) => id !== listId));
  };

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

  const actions = useMemo(() => {
    return {
      addTodoList,
      removeTodoList,
      addTodo,
      checkTodo,
      removeTodo,
      clearChecked,
      setSelectedListId,
      getSelectedList,
      renameTodo,
    } as TasksActions;
  }, [getSelectedList]);
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
