'use client';

import { useState, useEffect } from 'react';

const ThemeToggle = ({ onThemeChange, onBoardRegenerate }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bingoTheme') || 'light';
    setTheme(savedTheme);
    onThemeChange(savedTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('bingoTheme', newTheme);
    onThemeChange(newTheme);
    onBoardRegenerate();
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle; 