import { useState, useEffect } from "react";
import {
  getFromStorage,
  setToStorage,
  removeFromStorage,
} from "../utils/localStorage";
import type { UseLocalStorageReturn } from "../types/todo";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T>(() =>
    getFromStorage(key, defaultValue)
  );

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;

      setValue(valueToStore);
      setToStorage(key, valueToStore);
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    setValue(defaultValue);
    removeFromStorage(key);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(
            `Error parsing storage change for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [value, setStoredValue, removeValue];
};
