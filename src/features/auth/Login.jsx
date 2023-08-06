import React, { useState, useEffect, useRef } from "react";
import "../../scss/Login.scss";
import logo from "../../assets/logo.svg";
import loading from '../../assets/signInLoading.gif'

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useLoginMutation, useOAuthMutation } from "./authApiSlice";

import { Button, Checkbox, FormHelperText, OutlinedInput, InputLabel, FormControl, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { setCredentials } from "./authSlice";
import useInternetConnection from "../../hooks/useInternetConnection";
import usePersist from "../../hooks/usePersist";
import GoogleOAuth from "./GoogleOAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const emailRef = useRef();
  const pwdRef = useRef();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();



  const navigate = useNavigate();

  const isOnline = useInternetConnection();
  const [persist, setPersist] = usePersist();

  // submit logic when done through email and pwd
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOnline)
      return setErrMsg(
        "You are offline. Make sure to be online and try again!"
      );

    try {
      const userData = await login({ email, pwd }).unwrap();
      dispatch(setCredentials({ token: userData.accessToken }));
      setEmail("");
      setPwd("");


      navigate("/dash");
    } catch (e) {
      if (e?.data) {
        setErrMsg(e.data.message);

        if (e.data.message === "Incorrect password") {
          setPwdErrMsg("The password you entered is incorrect");
          pwdRef.current.focus();
        }
        if (e.data.message === "Invalid Email") {
          setEmailErrMsg("No account with this email");
          emailRef.current.focus();
        }
      } else {
        setErrMsg("Login failed. No server response");
      }
    }
  };

  useEffect(() => {
    document.title = "Sign in | ScribbleSphere"
  }, [])

  useEffect(() => {
    setErrMsg("");
    setEmailErrMsg(false);
    setPwdErrMsg(false);
  }, [email, pwd]);

  useEffect(() => {
    localStorage.setItem('persist', persist)
  }, [persist])

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePwdChange = (e) => setPwd(e.target.value);

  const emailInputTheme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: emailErrMsg
              ? "var(--error-text-color)"
              : "var(--text-200)",
            "&.Mui-focused": {
              color: emailErrMsg
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: emailErrMsg
                ? "var(--error-text-color)"
                : "var(--text-200)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: emailErrMsg ? "var(--error-text-color)" : "var(--primary-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: emailErrMsg
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
    },
  });

  const pwdInputTheme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: pwdErrMsg ? "var(--error-text-color)" : "var(--text-200)",
            "&.Mui-focused": {
              color: pwdErrMsg
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: pwdErrMsg
                ? "var(--error-text-color)"
                : "var(--text-200)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: pwdErrMsg ? "var(--error-text-color)" : "var(--primary-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: pwdErrMsg
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
    },
  });

  return (
    <main className="grid-center login-main">
      <div className="form-wrapper flex-center-column g-20">
        <header className="flex-center-column g-20">
          <img src={logo} alt="ScribbleSphere Logo" />
          <h2>Sign in to ScribbleSphere</h2>
        </header>
        <form onSubmit={handleSubmit} className="flex-center-column g-10">
          {errMsg && (
            <Alert severity="error" sx={{ width: "100%", mb: 1.5 }}>
              {errMsg}
            </Alert>
          )}
          <ThemeProvider theme={emailInputTheme}>
            <FormControl sx={{ mb: 1, alignSelf: 'stretch' }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-email"
                error={Boolean(emailErrMsg)}
              >
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                inputRef={emailRef}
                type="email"
                autoFocus
                error={Boolean(emailErrMsg)}
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="false"
                autoCorrect="false"
                sx={{
                  color: "var(--text-200)",
                }}
                label="Email"
              />
              {emailErrMsg && (
                <FormHelperText
                  sx={{
                    marginLeft: 0,
                    marginTop: "5px",
                    color: "var(--error-text-color)",
                    fontFamily: "var(--primary-text-font)",
                  }}
                >
                  {emailErrMsg}
                </FormHelperText>
              )}
            </FormControl>
          </ThemeProvider>

          <ThemeProvider theme={pwdInputTheme}>
            <FormControl variant="outlined" sx={{ alignSelf: 'stretch' }}>
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={Boolean(pwdErrMsg)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="password"
                inputRef={pwdRef}
                value={pwd}
                onChange={handlePwdChange}
                autoComplete="false"
                autoCorrect="false"
                required
                error={Boolean(pwdErrMsg)}
                label="Password"
                sx={{
                  color: "var(--text-200)",
                }}
              />
              {pwdErrMsg && (
                <FormHelperText
                  sx={{
                    marginLeft: 0,
                    marginTop: "5px",
                    color: "var(--error-text-color)",
                    fontFamily: "var(--primary-text-font)",
                  }}
                >
                  {pwdErrMsg}
                </FormHelperText>
              )}
              <Link to="/" className="forgetPwd">
                <small className="hover:underline">Forget password?</small>
              </Link>
            </FormControl>
          </ThemeProvider>

          <div className="rememberMe flex items-center gap-1">
            <Checkbox
              id="persistInput"
              sx={{ padding: 0 }}
              checked={persist}
              onChange={() => setPersist(prev => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <label htmlFor="persistInput" title="Remember this device?">
              Remember Me?
            </label>
          </div>

          <Button
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            sx={{
              fontWeight: "600",
              width: "100%",
              display: 'flex',
              alignItems: 'center',
              padding: '14px',
              gap: '8px',
              color: 'white',
              '&:disabled': {
                backgroundColor: '#686868',
                color: '#aaa',
              }
            }}
            size="large"
            disabled={isLoading}
          >
            {isLoading && <img src={loading} alt="loading spinner" className="w-[20px] h-[20px]" />}
            {isLoading ? 'Signing in...' : 'sign in'}
          </Button>

        </form>

        <section className="needAccount flex-center" >
          <p>Need an account? &nbsp;</p>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </section>

        <span className="text-center text-xs" style={{ color: 'var(--text-300)' }}>Or,</span>

        <GoogleOAuth setErrMsg={setErrMsg} />
      </div>
    </main>
  );
};

export default Login;
