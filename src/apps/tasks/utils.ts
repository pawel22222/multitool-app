import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './types';

export function createTodoList(name: string) {
  return {
    id: uuidv4(),
    name,
    todos: [],
  };
}

export function useSelectedList(lists: TodoList[]) {
  const [selectedListId, setSelectedListId] = useState<string | null>(lists[0].id);

  const setSelectedListIdToNext = (listId: string) => {
    const indexSelectedList = lists.findIndex(({ id }) => id === listId);
    const nextList = lists[indexSelectedList + 1] || lists[indexSelectedList - 1];
    setSelectedListId(nextList.id);
  };

  const setSelectedListIdById = (listId: string) => {
    const list = lists.find(({ id }) => id === listId) || null;
    setSelectedListId(list?.id || null);
  };

  return {
    selectedListId,
    setSelectedListId,
    setSelectedListIdToNext,
    setSelectedListIdById,
  };
}
