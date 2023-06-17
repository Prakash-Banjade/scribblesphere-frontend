import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, userLogout } from '../../features/auth/authSlice';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;

        if (token) headers.set("authorization", `Bearer ${token}`)

        return headers;
    }
})


const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403){ // 403 comes from the backend that could mean access token is expired so, send the refresh token to generate new access token
        console.log('sending refresh token')

        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult)
        // check if refreshResult comes up with data (accessToken)
        if (refreshResult?.data){
            const email = api.getState().auth.email;

            api.dispatch(setCredentials({...refreshResult.data, email}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        }else{
            api.dispatch(userLogout())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})