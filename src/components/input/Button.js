import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function InputButton({name, icon}) {
  const classes = useStyles();

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={icon ? <SaveIcon /> : null}
      >
        {name}
      </Button>
    </div>
  );
}

export default InputButton;