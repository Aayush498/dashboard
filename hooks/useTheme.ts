'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('auto');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = saved === 'auto' || !saved ? (prefersDark ? 'dark' : 'light') : saved;
    setIsDark(effectiveTheme === 'dark');
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : prev === 'dark' ? 'auto' : 'light';
      localStorage.setItem('theme', next);

      // Update effective theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const effectiveTheme = next === 'auto' ? (prefersDark ? 'dark' : 'light') : next;
      setIsDark(effectiveTheme === 'dark');
      updateDocumentClass(effectiveTheme);

      return next;
    });
  };

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = newTheme === 'auto' ? (prefersDark ? 'dark' : 'light') : newTheme;
    setIsDark(effectiveTheme === 'dark');
    updateDocumentClass(effectiveTheme);
  };

  const updateDocumentClass = (effectiveTheme: 'light' | 'dark') => {
    if (effectiveTheme === 'dark') {
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.style.colorScheme = 'light';
    }
  };

  return {
    theme,
    isDark,
    isLoading,
    toggleTheme,
    setTheme: setThemeValue,
  };
}
