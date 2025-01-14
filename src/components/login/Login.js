import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { login, subdomainUrl, passwordReset } from "../../services/authenticationApi";
import { useHistory } from "react-router-dom";
import "../../App.css";
import {TextField, InputAdornment, IconButton} from "@material-ui/core";
// import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { privateLogin , privateLogout } from "../../utils/Index";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loginInterface, setLoginInterface] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [domain, setDomain] = useState("");
  const snackState = {
    vertical: "top",
    horizontal: "center",
  };
  const [snackMsg, setSnackMsg] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const { vertical, horizontal } = snackState;

  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {
    setSubmitted(!submitted);
    setLoginInterface(true);
  };
  const loginFunction = () => {
    if (loginInterface && password.length > 0) {
      login(email, password)
        .then(() => {
          history.push("/dashboard");
          // setSnackMsg("Logged in");
          // setSnackbar(true);
          privateLogin()
        })
        .catch(() => {setSnackMsg("Login Failed"); setSnackbar(true);});
      }
      if (email.length > 0 && !forgotPassword && password.length === 0) {
        subdomainUrl(email)
        .then((res) => {
          setDomain(res.data.data.domain);
          localStorage.setItem("subDomain", res.data.data.domain)
          // setSnackMsg("Subdomain Logged in");
          // setSnackbar(true);
        })
        .catch(() => {setSnackMsg("Incorrect email"); setSnackbar(true);});
    }
    if (email.length > 0 && forgotPassword) {
      subdomainUrl(email)
      .then((res) => {
        passwordReset(email, res.data.data.domain)
        .then(() => {
          setSnackMsg(`Mail sent to ${email}`);
          setSnackbar(true);
          setForgotPassword(false)
        })
      })
      .catch(() => {setSnackMsg("Incorrect email"); setSnackbar(true);});
      }
  };

  useEffect(() => {
    loginFunction();
    setPassword("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const onInputChnage = (value) => {
    setEmail(value);
  };
  const onPasswordChnage = (value) => {
    setPassword(value);
  };

  const handleSnackClose = () => {
    setSnackbar(false);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    loginFunction()
  };

  const handleLoginPrevent = () => {
    privateLogout();
    localStorage.removeItem("subDomain");
    history.push("/");
  }

  const handleEnterEvent = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="pMainContainer pMainContainer--login">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        onClose={handleSnackClose}
        message={snackMsg}
        key={vertical + horizontal}
      />
      {!(localStorage.getItem('subDomain') === 'Deny') && (
        <>
          <h1 className="loginHead">Welcome!</h1>
          <div className="login">
          {!domain ? (
            forgotPassword ? (
              <h2 className="loginHead">Password Reset</h2>
            ) : (
              <h2 className="loginHead">Sign In</h2>
            )
          ) : forgotPassword ? (
            <h2 className="loginHead">Password Reset</h2>
          ) : (
            <h2 className="loginHead">Sign In</h2>
          )}
          {domain && !forgotPassword ? (
            <p className="pTextCenter">{`You have logged in for the sub domain ${domain}`}</p>
          ) : null}
          {forgotPassword ? (
            <p className="pTextCenter">
              {/* Forgotten your password?<br /> */}
              Enter your email address below, and
              we’ll email instructions for setting a new one.
            </p>
          ) : null}
          {/* <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            // onSubmit={handleSubmit}
            // className="loginHead"
          > */}
            <div>
              <TextField
                id="standard-required"
                label="Email"
                variant="outlined"
                onChange={(e) => onInputChnage(e.target.value)}
                value={email}
                onKeyDown={handleEnterEvent}
              />
            </div>
            {domain && !forgotPassword ? (
              <div>
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={(e) => onPasswordChnage(e.target.value)}
                  value={password}
                  onKeyDown={handleEnterEvent}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            ) : null} 
          {/* </Box> */}
          <div className="loginHead">
            <Button variant="contained" size="large" color="primary" onClick={handleSubmit}>
              Sign in
            </Button>
          </div>
          { !forgotPassword && (<div className="pForgotPassword">
          <Button size="large" onClick={handleForgotPassword}>Forgot Password?</Button>
          </div>)}
        </div>
      </>
    )}

    {/* Prevent User To Login if they Have Not Permission to Use PWA*/}
    {(localStorage.getItem('subDomain') === 'Deny') && (
      <div className="login">
        <p className="pTextCenter">{"You don't have required permission to use the portal."}</p>
        <p className="pTextCenter">
          Please see your organization PatronPay administrator to request access.
        </p>
      <div className="loginHead">
        <Button variant="contained" size="large" color="primary" onClick={handleLoginPrevent}>
          Try Login Again?
        </Button>
      </div>
    </div>
  )}
    </div>
  );
}

export default Login;
