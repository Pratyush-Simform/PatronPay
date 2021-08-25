import React, { useContext } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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

export default function TemporaryDrawer() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  const [leftState, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const handleStatus = (sd, index) => {
    state.doneArray.splice(index, 1)
    dispatch({ type: "ORDERARRAY", payload: sd})
  }

  const siderButton = (text, index) => {
    if (index === 0) {
      history.push("/orders");
    } else if (index === 1) {
      history.push("/transaction");
    } else if (index === 2) {
      history.push("/profile");
    } else if (index === 3) {
      history.push("/paymentProfile");
    } else if (index === 4) {
      history.push("/memberPayments")
    } else if (index === 5){
      history.push("/cashlessPayments")
    } else if ( index === 6) {
      history.push("/cashPayments")
    } else if (index === 7) {
      localStorage.setItem("token", "")
      history.push("/");
    }
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <img src={Icon} alt="icon" />
        {[
          "Order",
          "Transaction",
          "Profile Items",
          "Payment Profiles",
          "Member Payments",
          "Cashless Payments",
          "Cash Payments",
          "Log Out",
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => siderButton(text, index)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
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
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <ListRoundedIcon fontSize="large" color="action" />
          </Button>
          <Drawer
            anchor={anchor}
            open={leftState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <Divider />
            {/* {state.buttonValue === true ? */}
            <div>
              <h3 className="profileSubmitBtn">Closed Orders</h3>
              {state.doneArray?.map((sd, index) => (
                <Card className="siderOrderCard">
                  <CardActionArea>
                    <CardContent>
                      <div className="listStyles">
                        <Typography gutterBottom variant="h5" component="h2">
                          ORDER #{sd?.order_id}
                        </Typography>
                        {sd?.trs_items?.map(dt => (
                          <h3>
                          {dt.date_created.toString().slice(0, 10)} {dt.date_created.toString().slice(27, 32)}
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
    </div>
  );
}
