import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
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
    setLoginInterface(true);
  };

  useEffect(() => {
    if (loginInterface) {
      login(email, password).then(() => history.push("/orders"));
    }
    subdomainUrl(email).then((res) => {
      setDomain(res.data.data.domain);
    });
    setEmail("");
    setPassword("");
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
          <h2 className="loginHead">Please enter email to get sub domain</h2>
        ) : (
          <h2 className="loginHead">Please enter login details</h2>
        )}
        {domain ? (
          <h3 className="loginHead">{`You have logged in for the sub domain ${domain.toLocaleUpperCase()}`}</h3>
        ) : null}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="loginHead"
        >
          <>
            <TextField
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
                value={password}
              />
            ) : null}
          </>
        </Box>
        <div className="loginHead">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
