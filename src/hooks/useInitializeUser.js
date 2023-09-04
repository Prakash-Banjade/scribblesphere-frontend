import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useGetUserByIdQuery } from "../features/user/userApiSlice"
import { setUser } from "../features/user/userSlice"
import useAuth from './useAuth'


const useInitializeUser = () => {
    const { userId } = useAuth();
    const { data, isLoading, isError, isSuccess } = useGetUserByIdQuery(userId, { skip: Boolean(!userId) })
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && data && !isError) {
            console.log('from useInitialize hook' + data)
            dispatch(setUser(data));
        }
    }, [data, isLoading, userId])
}

export default useInitializeUser