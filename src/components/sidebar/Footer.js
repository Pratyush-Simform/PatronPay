import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from './style';
import Link  from '@material-ui/core/Link';
import "../../App.css"

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footRoot}>
      <AppBar position="static">
        <Toolbar className="footToolBar" variant="dense">
          <div className="copy-right">
          © 2021 <Link href="https://patronpay.us/" target="_blank" underline="hover" className="white">PatronPay</Link>
          </div>
            <div style={{display: 'flex', justifyContent: "space-between", width: "12em"}}>
            <Link href="https://patronpay.us/" target="_blank" underline="hover" className="white">PatronPay</Link>
            <Link href="https://patronpay.us/about/" target="_blank" underline="hover" className="white">About Us</Link>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;