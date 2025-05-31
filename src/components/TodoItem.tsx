import React, { useState } from "react";
import {
  formatDateForDisplay,
  isOverdue,
  isToday,
  formatDateDDMMYYYY,
} from "../utils/dateHelpers";
import { highlightText } from "../utils/textHighlight";
import type { TodoItemProps } from "../types/todo";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggle,
  searchQuery,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setIsDeleting(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error("Error deleting todo:", error);
        setIsDeleting(false);
      }
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const dateDisplay = formatDateForDisplay(todo.date);
  const overdue = !todo.completed && isOverdue(todo.date);
  const today = isToday(todo.date);

  return (
    <div
      className={`group p-4 border-l-4 transition-all duration-200 animate-fade-in ${
        todo.completed
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : overdue
          ? "border-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
          : today
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          : "border-transparent hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
      } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors focus-ring ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 dark:border-gray-600 hover:border-green-500"
          }`}
          aria-label={`Mark as ${todo.completed ? "incomplete" : "complete"}`}
        >
          {todo.completed && (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-semibold text-lg leading-tight ${
                todo.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {searchQuery
                ? highlightText(todo.title, searchQuery)
                : todo.title}
            </h3>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  overdue
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    : today
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {dateDisplay}
              </span>
            </div>
          </div>

          {todo.description && (
            <div className="mt-2">
              <p
                className={`text-sm leading-relaxed ${
                  todo.completed
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {(() => {
                  const description =
                    isExpanded || todo.description.length <= 100
                      ? todo.description
                      : `${todo.description.substring(0, 100)}...`;

                  return searchQuery
                    ? highlightText(description, searchQuery)
                    : description;
                })()}
              </p>

              {todo.description.length > 100 && (
                <button
                  onClick={toggleExpanded}
                  className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created {formatDateDDMMYYYY(todo.createdAt)}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleEdit}
                className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus-ring rounded"
                aria-label="Edit todo"
                title="Edit todo"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors focus-ring rounded disabled:opacity-50"
                aria-label="Delete todo"
                title="Delete todo"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
