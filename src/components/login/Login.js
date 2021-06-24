import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '../input/input';
import Axios from "axios"
import { useHistory } from "react-router-dom";
import "../../App.css"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {                                                        
      setSubmitted(true)
  }

  useEffect(async () => {
    const api = `https://tenant3.mypatronpay.us/api/token/`
    const response = await Axios.post(api, {
        email: email,
        password: password
    })
      console.log(response);
      const token = response.data.data.access
      localStorage.setItem("token", token)
      history.push('/transaction')
  }, [submitted])

  const onInputChnage = (value) =>{
      setEmail(value);
  }
  const onPasswordChnage = value => {
      setPassword(value)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="login">
        <h3 style={{marginLeft: "18%"}}>Please enter login details</h3>
      <Input label="Email" placeholder="Please enter email" onChange={onInputChnage} />
      <Input label="Password" placeholder="Please enter password" onChange={onPasswordChnage} type="password"/>
      <Button style={{backgroundColor: "#3f51b5", marginLeft: "36%", color: "#fff" }} variant="contained" onClick={(e) => handleSubmit(e)}>Submit</Button>
      </div>
    </div>
  );
}

export default Login;