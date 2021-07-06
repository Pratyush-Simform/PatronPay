import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from "./styles"

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