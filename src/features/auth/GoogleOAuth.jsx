import React, { useEffect, useState } from 'react'
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useOAuthMutation } from "./authApiSlice";
import loading from '../../assets/signInLoading.gif'
import { Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

const GoogleOAuth = ({ setErrMsg }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // google oauth implementation
    const [oAuth, { isLoading }] = useOAuthMutation();

    const handleOAuthSuccess = async (response) => {
        console.log(response)
        const { code, credential } = response;

        if (code) {
            try {
                const response = await oAuth({ code, credential }).unwrap();
                dispatch(setCredentials({ token: response.accessToken }));

                navigate('/dash')

            } catch (e) {
                console.log(e);
                if (e.data?.message) return setErrMsg(e.data.message)
                setErrMsg(e.message);
            }
        }

    };
    const handleOAuthError = (error) => {
        console.log(error);
        if (error.data?.message) return setErrMsg(error.data.message);
        setErrMsg(error.message)
    };

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleOAuthSuccess,
        onError: handleOAuthError,
    });

    // one tap login implementation
    useGoogleOneTapLogin({
        flow: 'auth-code',
        auto_select: true,
        onSuccess: handleOAuthSuccess,
        onError: handleOAuthError,
    });

    return (
        <div className="wrapper flex flex-col items-center justify-center gap-1 w-full max-w-[500px]">
            {/* <GoogleLogin onSuccess={handleOAuthSuccess} onError={handleOAuthError} size="large" text="continue_with" /> */}

            <Button
                variant="contained"
                onClick={googleLogin}
                sx={{
                    fontWeight: "500",
                    width: "100%",
                    maxWidth: '500px',
                    maxHeight: '54px',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px',
                    gap: '8px',
                    background: '#f9f9f7',
                    border: '1px solid var(--line-color)',
                    color: '#232323',
                    boxShadow: '0 0',
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
