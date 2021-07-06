import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useStyles } from "./styles"
import "../../App.css"


function InputButton({name, icon}) {
  const classes = useStyles();

  return (
    <div className="btnDiv">
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