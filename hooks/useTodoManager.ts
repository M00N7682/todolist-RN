import { useState } from 'react';

export type TodoType = 'todo' | 'fun';

export interface Todo {
  id: string;
  text: string;
  type: TodoType;
  progress: number; // 0~100 수치만 유지
}

export default function useTodoManager() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, type: TodoType) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      type,
      progress: 0,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  
  const markComplete = (id: string) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, progress: 100 } : todo
    )
  );
};

  return { todos, addTodo, removeTodo, markComplete };
}
