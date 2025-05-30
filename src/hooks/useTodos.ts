import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { validateTodos } from "../utils/localStorage";
import type { Todo } from "../types/todo";
import { STORAGE_KEYS } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEYS.TODOS, []);

  const validatedTodos = validateTodos(todos);

  const addTodo = useCallback(
    (todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
      const newTodo: Todo = {
        id: uuidv4(),
        ...todoData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      return newTodo;
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        )
      );
    },
    [setTodos]
  );

  const deleteAllForDate = useCallback(
    (date: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.date !== date));
    },
    [setTodos]
  );

  const deleteAllCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  const deleteAll = useCallback(() => {
    setTodos([]);
  }, [setTodos]);

  const todoStats = {
    total: validatedTodos.length,
    completed: validatedTodos.filter((todo) => todo.completed).length,
    pending: validatedTodos.filter((todo) => !todo.completed).length,
  };

  return {
    todos: validatedTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    deleteAllForDate,
    deleteAllCompleted,
    deleteAll,
    todoStats,
  };
};
