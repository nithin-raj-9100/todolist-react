import type { Todo } from "../types/todo";

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

export const formatDateDDMMYYYY = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateForDisplay = (dateString: string): string => {
  const date = parseDate(dateString);
  const today = new Date();
  const todayString = formatDate(today);

  if (dateString === todayString) {
    return "Today";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = formatDate(tomorrow);

  if (dateString === tomorrowString) {
    return "Tomorrow";
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = formatDate(yesterday);

  if (dateString === yesterdayString) {
    return "Yesterday";
  }

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0 && diffDays <= 7) {
    return date.toLocaleDateString("en-GB", { weekday: "long" });
  }

  if (diffDays < 0 && diffDays >= -7) {
    return `Last ${date.toLocaleDateString("en-GB", { weekday: "long" })}`;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const groupTodosByDate = (todos: Todo[]): Record<string, Todo[]> => {
  return todos.reduce((groups, todo) => {
    const date = todo.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {} as Record<string, Todo[]>);
};

export const sortDates = (dates: string[]): string[] => {
  return dates.sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateA.getTime() - dateB.getTime();
  });
};

export const isOverdue = (dateString: string): boolean => {
  const date = parseDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayDate();
};

export const isFuture = (dateString: string): boolean => {
  const date = parseDate(dateString);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return date > today;
};
