import { useContext } from 'react'
import ThemeContext from '../context/AppThemeProvider'

const useAppTheme = () => useContext(ThemeContext);

export default useAppTheme;
