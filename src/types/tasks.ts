export interface Todo {
  id: string;
  name: string;
  isChecked: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  todos: Todo[];
}
