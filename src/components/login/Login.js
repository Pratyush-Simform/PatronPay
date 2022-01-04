import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { login, subdomainUrl, passwordReset } from "../../services/orderApi";
import { useHistory } from "react-router-dom";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
// import { useStyles } from "./styles";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { privateLogin } from "../../utils/Index";

function Login() {
  // const classes = useStyles();
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
      passwordReset(email)
        .then(() => {
          setSnackMsg(`Mail sent to ${email}`);
          setSnackbar(true);
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

  return (
    <div className="pMainContainer pMainContainer--login">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        onClose={handleSnackClose}
        message={snackMsg}
        key={vertical + horizontal}
      />
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
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          // onSubmit={handleSubmit}
          // className="loginHead"
        >
          <div>
            <TextField
              id="standard-required"
              label="Email"
              variant="outlined"
              onChange={(e) => onInputChnage(e.target.value)}
              value={email}
            />
          </div>
          {domain && !forgotPassword ? (
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => onPasswordChnage(e.target.value)}
                value={password}
              />
            </div>
          ) : null} 
        </Box>
        <div className="loginHead">
          <Button variant="contained" size="large" color="primary" onClick={handleSubmit}>
            Sign in
          </Button>
        </div>
        <div className="pForgotPassword">
        <Button size="large" onClick={handleForgotPassword}>Forgot Password?</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
