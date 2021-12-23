import React, { useContext, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../store/Context";
import Icon from "../../assets/images/Icon.png";
import Snackbar from "@material-ui/core/Snackbar";
import { privateLogout } from "../../utils/Index";
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import Creditcard from '@material-ui/icons/CreditCard'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SvgIcon from '@mui/material/SvgIcon';
import AttachMoney from '@material-ui/icons/AttachMoney';

export default function TemporaryDrawer() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  const [leftState, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const snackState = {
    vertical: "top",
    horizontal: "center",
  };
  const [snackMsg, setSnackMsg] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const { vertical, horizontal } = snackState;
  const handleSnackClose = () => {
    setSnackbar(false)
  };

  const handleStatus = (sd, index) => {
    state.doneArray.splice(index, 1);
    dispatch({ type: "ORDERARRAY", payload: sd });
  };

  // const siderButton = (text, index) => {
  //   if (localStorage.getItem("token")?.length === 0) {
  //     setSnackbar(true)
  //     setSnackMsg(`Cannot redirect to ${text}`);
  //   } else {
  //     if (index === 0) {
  //       history.push("/orders");
  //     } else if (index === 1) {
  //       history.push("/transaction");
  //     } else if (index === 2) {
  //       history.push("/transactionitems");
  //     } else if (index === 3) {
  //       history.push("/profile");
  //     } else if (index === 4) {
  //       history.push("/paymentProfile");
  //     } else if (index === 5) {
  //       history.push("/userAssignment");
  //     } else if (index === 6) {
  //       history.push("/memberPayments");
  //     } else if (index === 7) {
  //       history.push("/cashlessPayments");
  //     } else if (index === 8) {
  //       history.push("/cashPayments");
  //     } else if (index === 9) {
  //       history.push("/users");
  //     } else if (index === 10) {
  //       history.push("/myorganisation");
  //     } else if (index === 11) {
  //       history.push("/debuglogs");
  //     } else if (index === 12) {
  //       localStorage.setItem("token", "");
  //       privateLogout();
  //       localStorage.removeItem("subDomain");
  //       history.push("/");
  //     }
  //   }
  // };

  const siderButton = (text,anchor,open) => {
    if (localStorage.getItem("token")?.length === 0) {
      setSnackbar(true)
      setSnackMsg(`Cannot redirect to ${text}`);
    } else if (text === "Log Out") {
        localStorage.setItem("token", "");
        privateLogout();
        localStorage.removeItem("subDomain");
        history.push("/");
    } else {
      history.push(text);
    }
    setState({ ...leftState, [anchor]: open });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...leftState, [anchor]: open });
  };

  const [opens, setOpens] = React.useState(false)

  const  handleClick = () => {
    setOpens(!opens)
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className={classes.logo}>
          <img src={Icon} alt="icon" />
        </div>
        <Divider />
        {/* {[
          "Order",
          "Transaction",
          "Transaction Items",
          "Profile Items",
          "Payment Profiles",
          "User Assignment",
          "Member Payments",
          "Cashless Payments",
          "Cash Payments",
          "Users",
          "My Organisation",
          "Debug Logs",
          "Log Out",
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => siderButton(text, index)}>
            <ListItemIcon className={classes.listItemIcon}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button className={classes.listItem} onClick={() => siderButton("/orders", anchor, false)}>
          <ListItemIcon className={classes.listItemIcon}>
            <IconShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Order" />
        </ListItem>

        <ListItem button className={classes.listItem} onClick={() => siderButton("/myorganisation", anchor, false)}>
          <ListItemIcon className={classes.listItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="My Organisation" />
        </ListItem>

      <ListItem button className={classes.listItem} onClick={() => siderButton("/users", anchor, false)}>
        <ListItemIcon className={classes.listItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>

      <ListItem button className={classes.listItem} onClick={() => siderButton("/paymentProfile", anchor, false)}>
        <ListItemIcon className={classes.listItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="Payment Profiles" />
      </ListItem>

      <ListItem button className={classes.listItem} onClick={() => siderButton("/userAssignment", anchor, false)}>
        <ListItemIcon className={classes.listItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="User Assignment" />
      </ListItem>

      <ListItem button className={classes.listItem} onClick={() => siderButton("/debuglogs", anchor, false)}>
        <ListItemIcon className={classes.listItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="Debug Logs" />
      </ListItem>

      <ListItem button onClick={handleClick} className={classes.listItem}>
        <ListItemIcon className={classes.listItemIcon}>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
        {opens ? <IconExpandLess style={{marginLeft: "100px", marginRight: "100%"}}/> : <IconExpandMore style={{marginLeft: "100px", marginRight: "100%"}}/>}
      </ListItem>

      <Collapse in={opens} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding style={{backgroundColor: "aliceblue"}}>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/dashboard", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/transaction", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
              <Creditcard />
            </ListItemIcon>
            <ListItemText primary="All Transactions" />
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/cashlessPayments", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
              <Creditcard />
            </ListItemIcon>
            <ListItemText primary="Card" />
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/cashPayments", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
            </ListItemIcon>
            <ListItemText primary="Cash" />
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/memberPayments", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
              <SvgIcon>
                <path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Member" />
          </ListItem>
          <ListItem button className={classes.listItem} onClick={() => siderButton("/transactionitems", anchor, false)}>
            <ListItemIcon className={classes.listItemIcon}>
              <Creditcard />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItem>
        </List>
        <Divider />
      </Collapse>

      <ListItem button className={classes.listItem} onClick={() => siderButton("Log Out", anchor, false)}>
        <ListItemIcon className={classes.listItemIcon}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
      </List>
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <>
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        onClose={handleSnackClose}
        message={snackMsg}
        key={vertical + horizontal}
      />
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className="pBtn pBtn--navToggle">
            <ListRoundedIcon fontSize="large" color="inherit" />
          </Button>
          <Drawer
            anchor={anchor}
            open={leftState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            {/* {state.buttonValue === true ? */}
            {state.doneArray.length > 0 && (<Divider />)}
            <div>
              {state.doneArray.length > 0 && (<h3 className="profileSubmitBtn">Closed Orders</h3>)}
              {state.doneArray?.map((sd, index) => (
                <Card className="siderOrderCard">
                  <CardActionArea>
                    <CardContent>
                      <div className="listStyles">
                        <Typography gutterBottom variant="h5" component="h2">
                          ORDER #{sd?.order_id}
                        </Typography>
                        {sd?.trs_items?.map((dt) => (
                          <h3>
                            {dt.date_created.toString().slice(0, 10)}{" "}
                            {dt.date_created.toString().slice(27, 32)}
                          </h3>
                        ))}
                      </div>
                      <List dense className="listItems">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {sd?.trs_items?.map((food) => (
                            <ListItem className="lists" key={food.id}>
                              <div>{food.tri_id_name}</div>
                              <div className="marg">{food.quantity}</div>
                              <div className="marg">($){food.amount}</div>
                            </ListItem>
                          ))}
                          <Divider />
                        </Typography>
                      </List>
                    </CardContent>
                  </CardActionArea>
                  <div className="cardButton">
                    <Typography>Status: Done</Typography>
                    <CardActions>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleStatus(sd, index)}
                      >
                        Reopen
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              ))}
            </div>
            {/* : null} */}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
