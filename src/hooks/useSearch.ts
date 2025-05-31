import { useState, useEffect, useMemo } from "react";
import type { Todo } from "../types/todo";

export const useSearch = (todos: Todo[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTodos = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return todos;
    }

    const query = debouncedQuery.toLowerCase().trim();

    return todos.filter((todo) => {
      const titleMatch = todo.title.toLowerCase().includes(query);
      const descriptionMatch =
        todo.description?.toLowerCase().includes(query) || false;

      return titleMatch || descriptionMatch;
    });
  }, [todos, debouncedQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const hasActiveSearch = debouncedQuery.trim().length > 0;
  const hasResults = filteredTodos.length > 0;
  const showNoResults = hasActiveSearch && !hasResults;

  return {
    searchQuery,
    debouncedQuery,
    filteredTodos,
    handleSearchChange,
    handleClearSearch,
    hasActiveSearch,
    hasResults,
    showNoResults,
  };
};
