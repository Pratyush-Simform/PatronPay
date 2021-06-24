import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
}));

function Input({label, placeholder, onChange, value, type}) {
  const classes = useStyles();
 
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-textarea"
          label={label}
          placeholder={placeholder}
          multiline
          variant="outlined"
          onChange={(e)=> onChange(e.target.value)}
          value={value}
          type={type ? "password" : "text"}
        />
      </div>
    </form>
  );
}

export default Input