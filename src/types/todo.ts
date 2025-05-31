export interface Todo {
  id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  mode: "light" | "dark";
  primaryColor?: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  date: string;
}

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  searchQuery?: string;
}

export interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onDeleteAllForDate: (date: string) => void;
  searchQuery?: string;
}

export interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
  editingTodo?: Todo | null;
  onCancel?: () => void;
}

export interface DateGroupProps {
  date: string;
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onDeleteAll: () => void;
  searchQuery?: string;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export type UseLocalStorageReturn<T> = [
  T,
  (value: T | ((prev: T) => T)) => void,
  () => void
];

export type TodoAction =
  | { type: "ADD"; payload: Omit<Todo, "id" | "createdAt" | "updatedAt"> }
  | { type: "UPDATE"; payload: Todo }
  | { type: "DELETE"; payload: string }
  | { type: "TOGGLE"; payload: string };

export const STORAGE_KEYS = {
  TODOS: "todos",
  THEME: "theme",
  USER_PREFERENCES: "userPreferences",
} as const;
