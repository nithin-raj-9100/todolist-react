import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { formatDateForDisplay, isOverdue, isToday } from "../utils/dateHelpers";
import type { DateGroupProps } from "../types/todo";

const DateGroup: React.FC<DateGroupProps> = ({
  date,
  todos,
  onEdit,
  onDelete,
  onToggle,
  onDeleteAll,
  searchQuery,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const dateDisplay = formatDateForDisplay(date);
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const hasOverdue = todos.some(
    (todo) => !todo.completed && isOverdue(todo.date)
  );
  const isDateToday = isToday(date);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteAll = () => {
    if (
      window.confirm(
        `Are you sure you want to delete all ${totalCount} todos for ${dateDisplay}?`
      )
    ) {
      onDeleteAll();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      <div
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          hasOverdue
            ? "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
            : isDateToday
            ? "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        }`}
        onClick={handleToggleExpand}
      >
        {" "}
        <div className="flex items-center gap-3">
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus-ring"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>{" "}
          </button>

          <h2
            className={`text-xl font-semibold ${
              hasOverdue
                ? "text-red-900 dark:text-red-100"
                : isDateToday
                ? "text-blue-900 dark:text-blue-100"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {dateDisplay}{" "}
          </h2>

          <div className="flex items-center gap-2">
            {hasOverdue && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Overdue
              </span>
            )}
            {isDateToday && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Today
              </span>
            )}
          </div>
        </div>{" "}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                hasOverdue
                  ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  : isDateToday
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
              }`}
            >
              {completedCount}/{totalCount}{" "}
            </span>
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  hasOverdue
                    ? "bg-red-500"
                    : completedCount === totalCount
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                style={{
                  width: `${
                    totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                  }%`,
                }}
              />
            </div>{" "}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAll();
              }}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors focus-ring rounded"
              aria-label={`Delete all todos for ${dateDisplay}`}
              title={`Delete all todos for ${dateDisplay}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>{" "}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? "max-h-none opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-600">
            {todos.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p>No todos for {dateDisplay}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateGroup;
