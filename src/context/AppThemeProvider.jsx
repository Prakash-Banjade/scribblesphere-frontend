import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', dark);
    // localStorage.setItem('dark', dark) // when app loads dark is changed false always, so implement this logic in navbar theme toggle
  }, [dark]);

  useEffect(() => {
    const dark = localStorage.getItem('dark')
    setDark(dark === 'true' ? true : false)
  }, [])

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;