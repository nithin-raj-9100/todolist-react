import type { Todo, Theme } from "../types/todo";

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

export const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

export const validateTodos = (data: unknown): Todo[] => {
  if (!Array.isArray(data)) return [];

  return data
    .filter((item): item is Todo => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.date === "string" &&
        typeof item.completed === "boolean" &&
        (typeof item.description === "string" || item.description === undefined)
      );
    })
    .map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
};

export const validateTheme = (data: unknown): Theme => {
  const defaultTheme: Theme = { mode: "light" };

  if (
    typeof data === "object" &&
    data !== null &&
    "mode" in data &&
    (data.mode === "light" || data.mode === "dark")
  ) {
    return data as Theme;
  }

  return defaultTheme;
};

export const migrateTodosData = (data: unknown): Todo[] => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (!item.createdAt) {
        item.createdAt = new Date();
      }
      if (!item.updatedAt) {
        item.updatedAt = new Date();
      }
      return item;
    });
  }
  return [];
};
