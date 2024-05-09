/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, getByText, getAllByTestId, getByTestId } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Tasks from '../apps/tasks';
import { TasksContextProvider } from '@/context/TasksContext';

Element.prototype.scrollIntoView = () => {};

describe('Tasks - list operations', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(
      <TasksContextProvider>
        <Tasks windowId='abc' />
      </TasksContextProvider>,
    );
  });

  it('Should add list', () => {
    let todoLists = component.getByTestId('todo-lists');
    const addListButton = component.getByTestId('add-list-button');

    expect(todoLists.children.length).toBe(1);
    expect(getByText(todoLists, 'Home')).toBeInTheDocument();

    fireEvent.click(addListButton);

    const addListInput = component.getByTestId('add-list-input');
    fireEvent.change(addListInput, { target: { value: 'Work' } });
    fireEvent.submit(addListInput);

    todoLists = component.getByTestId('todo-lists');
    expect(todoLists.children.length).toBe(2);
    expect(getByText(todoLists, 'Work')).toBeInTheDocument();
  });

  it('Should rename list', () => {
    const renameListButton = component.getByTestId('rename-list-button');
    let todoLists = component.getByTestId('todo-lists');

    fireEvent.click(renameListButton);

    const renameListInput = component.getByTestId('rename-list-input');

    fireEvent.change(renameListInput, { target: { value: 'Home2' } });
    fireEvent.submit(renameListInput);

    todoLists = component.getByTestId('todo-lists');
    expect(getByText(todoLists, 'Home2')).toBeInTheDocument();
  });

  it('Should remnove list', () => {
    const removeListButton = component.getByTestId('remove-list-button');
    const todoLists = component.getByTestId('todo-lists');

    fireEvent.click(removeListButton);

    expect(todoLists.children.length).toBe(1);
    expect(getByText(todoLists, 'Work')).toBeInTheDocument();
  });
});

describe('Tasks - todo operations', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(
      <TasksContextProvider>
        <Tasks windowId='abc' />
      </TasksContextProvider>,
    );
  });

  it('Should add todo', () => {
    const addTodoInput = component.getByTestId('add-todo-input');
    const todoList = component.getByTestId('list-carousel');

    fireEvent.change(addTodoInput, { target: { value: 'shopping' } });
    fireEvent.submit(addTodoInput);

    const addedTodo = getByText(todoList, 'shopping');
    expect(addedTodo).toBeInTheDocument();
  });

  it('Should rename todo', () => {
    const todoList = component.getByTestId('list-carousel');
    const firstList = todoList.children[0] as HTMLDivElement;
    const todos = getAllByTestId(firstList, 'todo-container');
    expect(todos.length).toBe(1);

    const renameButtons = getByTestId(todos[0], 'todo-edit-button');
    fireEvent.click(renameButtons);
    const input = component.getByTestId('todo-rename-input');
    fireEvent.change(input, { target: { value: 'shopping2' } });
    fireEvent.submit(input);

    expect(component.getByText('shopping2')).toBeInTheDocument();
  });

  it('Should remove todo', () => {
    fireEvent.click(component.getByTestId('todo-remove-button'));
    component.getByText('No tasks yet');
  });
});
