import { StateCreator, create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Todo, TodoList } from '@/apps/tasks/types';

interface State {
  lists: TodoList[];
  addList: (list: TodoList) => void;
  removeList: (listId: string) => void;
  addTodo: (name: string, listId: string) => void;
  checkTodo: (listId: string, todoId: string, isChecked: boolean) => void;
  removeTodo: (todoId: string, listId: string) => void;
  renameTodo: (listId: string, todoId: string, name: string) => void;
  renameList: (listId: string, name: string) => void;
  updateTodo: (listId: string, todoId: string, todo: Partial<Omit<Todo, 'id'>>) => void;
  clearChecked: (listId: string) => void;
}

const myMiddlewares = (f: StateCreator<State>) => {
  return immer(devtools(persist(f, { name: 'tasksStore' })));
};

export const useTasks = create<State>()(
  myMiddlewares((set) => ({
    lists: [{ id: '1', name: 'Home', todos: [] }],

    addList: (newList: TodoList) => {
      set((state) => {
        state.lists.push(newList);
        return state;
      });
    },

    renameList: (listId: string, name: string) => {
      set((state) => {
        const list = state.lists.find((list) => list.id === listId);
        if (list) {
          list.name = name;
        }
        return state;
      });
    },

    removeList: (listId: string) => {
      set((state) => {
        return { ...state, lists: state.lists.filter((list) => list.id !== listId) };
      });
    },

    addTodo: (name: string, listId: string) => {
      set((state) => {
        const newTodo = {
          id: uuidv4(),
          name,
          isChecked: false,
        };
        state.lists = state.lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: [...todoList.todos, newTodo] };
          }
          return todoList;
        });
        return state;
      });
    },

    checkTodo: (listId: string, todoId: string, isChecked: boolean) => {
      set((state) => {
        state.lists = state.lists.map((todoList) => {
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
        return state;
      });
    },

    removeTodo: (todoId: string, listId: string) => {
      set((state) => {
        state.lists = state.lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: todoList.todos.filter(({ id }) => id !== todoId) };
          }
          return todoList;
        });
        return state;
      });
    },

    renameTodo: (listId: string, todoId: string, name: string) => {
      set((state) => {
        state.lists = state.lists.map((todoList) => {
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
        return state;
      });
    },

    updateTodo: (listId: string, todoId: string, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
      set((state) => {
        state.lists = state.lists.map((list) => {
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
        return state;
      });
    },

    clearChecked: (listId: string) => {
      set((state) => {
        state.lists = state.lists.map((todoList) => {
          if (todoList.id === listId) {
            return { ...todoList, todos: todoList.todos.filter(({ isChecked }) => !isChecked) };
          }
          return todoList;
        });
        return state;
      });
    },
  })),
);
