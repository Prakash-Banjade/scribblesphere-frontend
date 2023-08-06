import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useOAuthMutation } from "./authApiSlice";


const GoogleOAuth = ({setErrMsg}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // google oauth implementation
    const [oAuth, oAuthState] = useOAuthMutation();

    const handleOAuthSuccess = async (response) => {
        const { clientId, credential } = response;

        try {
            const response = await oAuth({ clientId, credential }).unwrap();
            dispatch(setCredentials({ token: response.accessToken }));

            navigate('/dash')

        } catch (e) {
            console.log(e);
            setErrMsg(e.message);
        }

    };
    const handleOAuthError = (error) => {
        console.log(error);
    };

    return (
        <div className="wrapper flex flex-col items-center justify-center gap-1">
            <GoogleLogin onSuccess={handleOAuthSuccess} onError={handleOAuthError} />

            {oAuthState.isLoading && <p className="text-sm" style={{ color: 'var(--text-300)' }}>Logging in...</p>}
        </div>
    )
}

export default GoogleOAuth
