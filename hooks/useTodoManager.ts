import { useState } from 'react';

export type TodoType = 'todo' | 'fun';

export interface Todo {
  id: string;
  text: string;
  type: TodoType;
  completed: boolean;
}

export default function useTodoManager() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, type: TodoType) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      type,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}
