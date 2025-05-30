import React, { useState } from "react";
import Layout from "./components/Layout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./hooks/useTheme";
import type { Todo } from "./types/todo";
import "./styles/globals.css";

const App: React.FC = () => {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    deleteAllForDate,
  } = useTodos();
  useTheme();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = async (
    todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ) => {
    addTodo(todoData);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (
    todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (id: string) => {
    deleteTodo(id);
    if (editingTodo?.id === id) {
      setEditingTodo(null);
    }
  };

  const handleToggleTodo = async (id: string) => {
    toggleTodo(id);
  };

  const handleDeleteAllForDate = async (date: string) => {
    deleteAllForDate(date);
    if (editingTodo?.date === date) {
      setEditingTodo(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <TodoForm
          onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
        />

        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onDeleteAllForDate={handleDeleteAllForDate}
        />
      </div>
    </Layout>
  );
};

export default App;
