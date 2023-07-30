import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false;

    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles, fullname } = decoded.userInfo

        if (roles?.includes(2023)) isAdmin = true;

        return { email, roles, fullname, isAdmin }
    }
    return { email: null, roles: [], fullname: null, isAdmin }
}
export default useAuth