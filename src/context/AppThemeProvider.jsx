import { createContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', dark);
    // localStorage.setItem('dark', dark) // when app loads dark is changed false always, so implement this logic in navbar theme toggle
  }, [dark]);

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  useCallback(() => {
    const dark = localStorage.getItem('dark')
    setDark(dark === 'true' ? true : false)
  }, [dark, toggleTheme])



  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;