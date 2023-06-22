import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, userLogout } from '../../features/auth/authSlice';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;

        if (token) headers.set("authorization", `Bearer ${token}`)
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')

        return headers;
    }
})


const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403){ // 403 comes from the backend that could mean access token is expired so, send the refresh token to generate new access token
        console.log('sending refresh token')

        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult)

        const fullname = api.getState().auth.fullname
        const email = api.getState().auth.email

        console.log(fullname, email)
        // check if refreshResult comes up with data (accessToken)
        if (refreshResult?.data){
            api.dispatch(setCredentials({...refreshResult.data, fullname, email}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        }else{
            api.dispatch(userLogout())
            console.log('logging out user')
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Articles'],
    endpoints: builder => ({})
})