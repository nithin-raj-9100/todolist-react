import React, { useState } from "react";
import Layout from "./components/Layout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./hooks/useTheme";
import { useSearch } from "./hooks/useSearch";
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

  const { searchQuery, filteredTodos, handleSearchChange, handleClearSearch } =
    useSearch(todos);

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

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />

        <TodoList
          todos={filteredTodos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onDeleteAllForDate={handleDeleteAllForDate}
          searchQuery={searchQuery}
        />
      </div>
    </Layout>
  );
};

export default App;
