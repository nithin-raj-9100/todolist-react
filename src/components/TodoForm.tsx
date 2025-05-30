import React, { useState, useEffect } from "react";
import { getTodayDate } from "../utils/dateHelpers";
import type { TodoFormProps } from "../types/todo";

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  editingTodo,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: getTodayDate(),
  });

  const [errors, setErrors] = useState({
    title: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || "",
        date: editingTodo.date,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: getTodayDate(),
      });
    }
    setErrors({ title: "", date: "" });
  }, [editingTodo]);

  const validateForm = () => {
    const newErrors = { title: "", date: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be 100 characters or less";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (formData.description.length > 500) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        completed: editingTodo?.completed || false,
      });

      if (!editingTodo) {
        setFormData({
          title: "",
          description: "",
          date: getTodayDate(),
        });
      }
    } catch (error) {
      console.error("Error submitting todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      date: getTodayDate(),
    });
    setErrors({ title: "", date: "" });
    onCancel?.();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {editingTodo ? "Edit Todo" : "Add New Todo"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
              errors.title
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter todo title..."
            maxLength={100}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formData.title.length}/100 characters
          </p>
        </div>{" "}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Enter description (optional)..."
            rows={3}
            maxLength={500}
            disabled={isSubmitting}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formData.description.length}/500 characters
          </p>
        </div>{" "}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date *
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
              errors.date
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            }`}
            disabled={isSubmitting}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.date}
            </p>
          )}{" "}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium transition-colors focus-ring"
          >
            {isSubmitting
              ? "Saving..."
              : editingTodo
              ? "Update Todo"
              : "Add Todo"}
          </button>

          {(editingTodo || onCancel) && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md font-medium transition-colors focus-ring"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
