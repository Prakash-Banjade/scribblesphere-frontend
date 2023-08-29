import { useContext } from 'react'
import LayoutContext from '../context/LayoutProvider'

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;