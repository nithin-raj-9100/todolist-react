import React from "react";
import DateGroup from "./DateGroup";
import { groupTodosByDate, sortDates } from "../utils/dateHelpers";
import type { TodoListProps } from "../types/todo";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  onDelete,
  onToggle,
  onDeleteAllForDate,
}) => {
  const groupedTodos = groupTodosByDate(todos);
  const dates = sortDates(Object.keys(groupedTodos));

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-sm mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No todos yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Get started by creating your first todo above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dates.map((date) => (
        <DateGroup
          key={date}
          date={date}
          todos={groupedTodos[date]}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          onDeleteAll={() => onDeleteAllForDate(date)}
        />
      ))}
    </div>
  );
};

export default TodoList;
