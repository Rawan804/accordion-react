import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "accordion-demo-theme";
const DEFAULT_THEME = "light"; // app default — never follows OS

/**
 * useTheme — manages manual light/dark theme.
 *
 * - Reads initial value from localStorage (falls back to DEFAULT_THEME).
 * - Writes data-theme attribute on <html> on every change.
 * - Persists selection to localStorage.
 * - Never reads prefers-color-scheme.
 *
 * Returns: { theme, toggleTheme, isDark }
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  // Apply data-theme to <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme, isDark: theme === "dark" };
}
