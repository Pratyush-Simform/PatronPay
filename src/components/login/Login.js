import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Input from "../input/input";
import { login, subdomainUrl } from "../../services/orderApi";
import { useHistory } from "react-router-dom";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./styles";
import Box from "@material-ui/core/Box";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loginInterface, setLoginInterface] = useState(false);
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    setSubmitted(!submitted);
    setLoginInterface(true)
  };

  useEffect(() => {
    if(loginInterface) login(email, password).then(() => history.push('/orders'))
    subdomainUrl(email).then((res) => {
      setDomain(res.data.data.domain);
    });
    setEmail("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const onInputChnage = (value) => {
    setEmail(value);
  };
  const onPasswordChnage = (value) => {
    setPassword(value);
  };
  return (
    <div className={classes.root}>
      <div className="login">
        {!domain ? (
          <h3 className="loginHead">Please enter email to get sub domain</h3>
        ) : (
          <h3 className="loginHead">Please login details</h3>
        )}
        {domain ? (
          <p>{`You have logged in for the sub domain ${domain}`}</p>
        ) : null}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <>
            <TextField
              required
              id="standard-required"
              label="Email"
              variant="standard"
              onChange={(e) => onInputChnage(e.target.value)}
              value={email}
            />
            {domain ? (
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={(e) => onPasswordChnage(e.target.value)}
              />
            ) : null}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </>
        </Box>
      </div>
    </div>
  );
}

export default Login;
