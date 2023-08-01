import React, { useState, useEffect, useRef } from "react";
import "../../scss/Login.scss";
import logo from "../../assets/logo.svg";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useRegisterMutation } from "./authApiSlice";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import PropagateLoader from "react-spinners/PropagateLoader";
import useInternetConnection from "../../hooks/useInternetConnection";
import useAppTheme from "../../hooks/useAppTheme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [conPwd, setConPwd] = useState('')
  const [fullname, setFullname] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [fullnameErrMsg, setFullNameErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [conPwdErr, setConPwdErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(true);
  const {dark} = useAppTheme();

  const emailRef = useRef();
  const pwdRef = useRef();
  const fullnameRef = useRef();
  const conPwdRef = useRef()
  const [register, { isLoading }] = useRegisterMutation();

  const isOnline = useInternetConnection();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOnline)
      return setErrMsg(
        "You are offline. Make sure to be online and try again!"
      );

    if (pwd !== conPwd) {
      console.log('confirm Pwd err')
      return setConPwdErr(true)
    }

    try {
      setSuccess(false);
      const userData = await register({ email, pwd, fullname }).unwrap();
      setEmail("");
      setPwd("");
      setFullname("");
      setConPwd('')

      fullnameRef.current.blur();
      emailRef.current.blur();
      pwdRef.current.blur();
      conPwdRef.current.blur();
      setSuccess(true);
    } catch (e) {
      console.log(e);
      if (e?.data) {
        setErrMsg(e.data.message);

        if (e.data.type === "Invalid fullname") {
          setFullNameErrMsg(e.data.message);
          fullnameRef.current.focus();
          return;
        }

        if (e.data.type === "Invalid email") {
          setEmailErrMsg(e.data.message);
          emailRef.current.focus();
          return;
        }

        if (e.data.type === "Invalid password") {
          setPwdErrMsg(e.data.pwdCorrectionMsg);
          pwdRef.current.focus();
          return;
        }
      } else {
        setErrMsg("Registration failed. No server response");
      }
    }
  };

  useEffect(() => {
    document.title = "Sign Up | ScribbleSphere"
  }, [])

  useEffect(() => {
    setErrMsg("");
    setEmailErrMsg(false);
    setPwdErrMsg(false);
    setFullNameErrMsg("");

  }, [email, pwd, fullname]);

  useEffect(() => {
    if (pwd !== conPwd) return setConPwdErr(true)
    setConPwdErr(false)
  }, [pwd, conPwd])

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePwdChange = (e) => setPwd(e.target.value);
  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleConPwdChange = (e) => setConPwd(e.target.value);

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

  const fullnameInputTheme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: fullnameErrMsg
              ? "var(--error-text-color)"
              : "var(--text-200)",
            "&.Mui-focused": {
              color: fullnameErrMsg
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
              borderColor: fullnameErrMsg
                ? "var(--error-text-color)"
                : "var(--text-200)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: fullnameErrMsg ? "var(--error-text-color)" : "var(--primary-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: fullnameErrMsg
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
    },
  });
  const conPwdInputTheme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: conPwdErr
              ? "var(--error-text-color)"
              : "var(--text-200)",
            "&.Mui-focused": {
              color: conPwdErr
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
              borderColor: conPwdErr
                ? "var(--error-text-color)"
                : "var(--text-200)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: conPwdErr ? "var(--error-text-color)" : "var(--primary-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: conPwdErr
                ? "var(--error-text-color)"
                : "var(--primary-color)",
            },
          },
        },
      },
    },
  });

  const override = {
    marginTop: "-20px",
    marginBottom: "20px",
  };

  const successAlert = (
    <Collapse in={open} sx={{ width: '100%' }}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
            sx={{color: '#232323', '&:hover': {color: '#f2f2f2'}}}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2, background: dark? '' : 'lightgreen' }}
      >
        <AlertTitle>Registration Success!</AlertTitle>
        You can head to login —{" "}
        <strong>
          <Link to="/login" style={{ color: "green" }}>
            Login
          </Link>
        </strong>
      </Alert>
    </Collapse>
  );

  return (
    <main className="grid-center signup-main">
      <div className="form-wrapper flex-center-column g-20">
        <header className="flex-center-column g-20">
          <img src={logo} alt="ScribbleSphere Logo" />
          <h2>Sign Up to ScribbleSphere</h2>
        </header>
        <PropagateLoader
          color="#0bbe64"
          cssOverride={override}
          loading={isLoading}
        />
        <form onSubmit={handleSubmit} className="flex-center-column g-20">
          {errMsg && (
            <Alert severity="error" sx={{ width: "100%", mb: 1 }}>
              {errMsg}
            </Alert>
          )}
          {success && successAlert}
          <ThemeProvider theme={fullnameInputTheme}>
            <FormControl sx={{ alignSelf: 'stretch' }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-fullname"
                error={Boolean(fullnameErrMsg)}
              >
                Full name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-fullname"
                inputRef={fullnameRef}
                type="text"
                autoFocus
                value={fullname}
                onChange={handleFullnameChange}
                required
                error={Boolean(fullnameErrMsg)}
                autoComplete="false"
                autoCorrect="false"
                sx={{
                  color: "var(--text-200)",
                }}
                label="Full name"
              />
              {fullnameErrMsg && (
                <FormHelperText
                  sx={{
                    marginLeft: 0,
                    marginTop: "5px",
                    color: "var(--error-text-color)",
                    fontFamily: "var(--primary-text-font)",
                  }}
                >
                  {fullnameErrMsg}
                </FormHelperText>
              )}
            </FormControl>
          </ThemeProvider>
          <ThemeProvider theme={emailInputTheme}>
            <FormControl sx={{ alignSelf: 'stretch' }} variant="outlined">
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
            <FormControl sx={{ alignSelf: 'stretch' }} variant="outlined">
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
            </FormControl>
          </ThemeProvider>
          <ThemeProvider theme={conPwdInputTheme}>
            <FormControl sx={{ alignSelf: 'stretch' }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-confirmPassword"
                error={Boolean(conPwdErr)}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword"
                type="password"
                inputRef={conPwdRef}
                value={conPwd}
                onChange={handleConPwdChange}
                autoComplete="false"
                autoCorrect="false"
                required
                error={Boolean(conPwdErr)}
                label="Confirm Password"
                sx={{
                  color: "var(--text-200)",
                }}
              />
              {conPwdErr && (
                <FormHelperText
                  sx={{
                    marginLeft: 0,
                    marginTop: "5px",
                    color: "var(--error-text-color)",
                    fontFamily: "var(--primary-text-font)",
                  }}
                >
                  Confirm Password do not match
                </FormHelperText>
              )}
            </FormControl>
          </ThemeProvider>



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
            {isLoading ? 'signing up...' : 'Sign up'}
          </Button>
        </form>

        <section className="needAccount flex-center">
          <p>Already have an account? &nbsp;</p>
          <Link to="/login" className="hover:underline">Sign In</Link>
        </section>
      </div>
    </main>
  );
};

export default Login;
