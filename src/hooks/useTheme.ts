import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateTheme } from "../utils/localStorage";
import type { Theme } from "../types/todo";
import { STORAGE_KEYS } from "../types/todo";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, {
    mode: "light",
  });

  const validatedTheme = validateTheme(theme);

  const toggleTheme = () => {
    const newMode = validatedTheme.mode === "light" ? "dark" : "light";
    setTheme({ ...validatedTheme, mode: newMode });
  };

  const setLightTheme = () => {
    setTheme({ ...validatedTheme, mode: "light" });
  };

  const setDarkTheme = () => {
    setTheme({ ...validatedTheme, mode: "dark" });
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");
    body.removeAttribute("data-theme");

    if (validatedTheme.mode === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      body.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      body.classList.add("light");
      body.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }
  }, [validatedTheme.mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (!storedTheme) {
        setTheme({ mode: e.matches ? "dark" : "light" });
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  return {
    theme: validatedTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: validatedTheme.mode === "dark",
    isLight: validatedTheme.mode === "light",
  };
};
