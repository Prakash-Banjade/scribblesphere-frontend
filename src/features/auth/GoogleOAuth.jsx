import React, { useEffect, useState } from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useOAuthMutation } from "./authApiSlice";
import loading from '../../assets/signInLoading.gif'
import { Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import jwtDecode from 'jwt-decode';
import axios from '../../app/api/axios'

const GoogleOAuth = ({ setErrMsg }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);


    // google oauth implementation
    const [oAuth, {isLoading}] = useOAuthMutation();

    const handleOAuthSuccess = async (response) => {
        const { code } = response;
        try {
            const response = await oAuth({ code }).unwrap();
            console.log(response)
            dispatch(setCredentials({ token: response.accessToken }));

            navigate('/dash')

        } catch (e) {
            console.log(e);
            if (e.data?.message) return setErrMsg(e.data.message)
            setErrMsg(e.message);
        }

    };
    const handleOAuthError = (error) => {
        console.log(error);
    };


    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleOAuthSuccess,
        onError: errorResponse => console.log(errorResponse),
    });

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     console.log(res.data)
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [user]
    // );

    return (
        <div className="wrapper flex flex-col items-center justify-center gap-1 w-full max-w-[500px]">
            {/* <GoogleLogin onSuccess={handleOAuthSuccess} onError={handleOAuthError} size="large" text="continue_with"  /> */}

            <Button
                variant="contained"
                onClick={googleLogin}
                sx={{
                    fontWeight: "500",
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px',
                    gap: '8px',
                    background: '#f9f9f7',
                    color: '#232323',
                    boxShadow: '0 2px 2px rgb(0 0 0 / .2)',
                    '&:hover': {
                        background: '#f9f9f7',
                    },
                    '&:disabled': {
                        opacity: .5,
                        background: '#f9f9f7',
                        color: '#454545'
                    }
                }}
                size="large"
                disabled={isLoading}
            >
                {!isLoading && <span className="text-2xl">
                    <FcGoogle />
                </span>}
                {isLoading && <img src={loading} alt="loading spinner" className="w-[20px] h-[20px]" />}
                {isLoading ? 'Signing in...' : 'Continue with google'}
            </Button>
        </div>
    )
}

export default GoogleOAuth
