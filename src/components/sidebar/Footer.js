import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footRoot}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
           Patron pay Footer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;