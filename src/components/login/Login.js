import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '../input/input';
import { login, subdomainUrl } from "../../services/orderApi"
import { useHistory } from "react-router-dom";
import "../../App.css"
import { useStyles } from "./styles"


function Login() {
  const classes = useStyles();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {                                                        
      setSubmitted(!submitted)
  }

  useEffect(() => {
  // login(email, password).then(() => history.push('/orders'))
  subdomainUrl(email)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  const onInputChnage = (value) =>{
      setEmail(value);
  }
  const onPasswordChnage = value => {
      setPassword(value)
  }
  return (
    <div className={classes.root}>
      <div className="login">
        <h3 className="loginHead">Please enter login details</h3>
      <Input label="Email" placeholder="Please enter email" onChange={onInputChnage} />
      <Input label="Password" placeholder="Please enter password" onChange={onPasswordChnage} type="password"/>
      <Button className="loginBtn" variant="contained" onClick={(e) => handleSubmit(e)}>Submit</Button>
      </div>
    </div>
  );
}

export default Login;