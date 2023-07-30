import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.toggle('dark', dark);
    }, [dark]);
  
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