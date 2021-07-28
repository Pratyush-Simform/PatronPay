import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from "./styles"

function Input({label, placeholder, onChange, value, type, id}) {
  const classes = useStyles();
 
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id={id}
          label={label}
          placeholder={placeholder}
          multiline
          variant="outlined"
          onChange={(e)=> onChange(e.target.value)}
          value={value}
          type={type}
        />
      </div>
    </form>
  );
}

export default Input