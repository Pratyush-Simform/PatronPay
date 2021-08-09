import React, { useState, useContext, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Context } from "../../store/Context";
// import Axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../../App.css";
// import { useReactToPrint } from "react-to-print";
// import { ComponentToPrint } from "./ComponentToPrint";
import { getConfigApi } from "../../services/orderApi"
import Localbase from "localbase";

function Order() {
  let db = new Localbase("db");
  const [state, dispatch] = useContext(Context);
  const [config, setConfig] = useState([]);
  const [open, setOpen] = useState(false);
  const [pcfId, setPcfId] = useState("");
  const [socketData, setSoketdata] = useState({});
  const [renderData, setRenderData] = useState([])

  const handleStatus = (td, index) => {
    dispatch({ type: "DONEARRAY", payload: td });
    state.orderArray.splice(index, 1);
    db.collection('orderArray').doc({ id: td.id }).delete()
  };
  useEffect(() => {
    getConfigApi().then(res => (
      setConfig(res.data.data.results)
    ));
  }, []);

  const triggerSocket = () => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/${pcfId}/`
    );
    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      setRenderData(data);
      if(data) dispatch({ type: "ORDERARRAY", payload: data.message });
      setSoketdata(data.message);
    };
    console.log(socket);
  }

  console.log(state);

  useEffect(() => {
    triggerSocket()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcfId]);

  const handleChange = (event) => {
    setPcfId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //  const handlePrint = () => {
  //    window.print()
  //  }

  // const componentRef = useRef();
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //   });

  return (
    <div className="order">
      {/* <h2 style={{ display: "flex", justifyContent: "center" }}>Open Orders</h2> */}
      <Button onClick={handleOpen}></Button>
      <div className="orderDrpdwn">
        <FormControl>
          <InputLabel id="demo-controlled-open-select-label">
            {" "}
            Configurations{" "}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
            value={pcfId}
          >
            {config?.map((con) => (
              <MenuItem value={con.id}>{con.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {pcfId === "" ? (
        <h2 className="profileSubmitBtn">Please select configuration</h2>
      ) : null}
      {Object.keys(socketData).length === 0 ||
      (state?.orderArray?.length === 0 && pcfId === "") ? (
        <div>
          <h1 className="profileSubmitBtn">NO orders available</h1>
        </div>
      ) : (
        state.orderArray?.map((td, index) => (
          <Card className="orderCard">
            <CardActionArea>
              <CardContent>
                <div className="listStyles">
                  <Typography gutterBottom variant="h5" component="h2">
                    ORDER #{td?.order_id}
                  </Typography>
                  {td?.trs_items?.map((dt) => (
                    <h3>
                     {dt.date_created.toString().slice(0, 10)} {dt.date_created.toString().slice(27, 32)}
                    </h3>
                  ))}
                </div>
                <List dense className="listItems">
                  <div style={{ display: "flex" }}>
                    <h3>
                      {td?.membership_payment?.txn_type ||
                        td?.cash_payment?.txn_type}
                    </h3>
                    <h3 style={{ marginLeft: "3%" }}>
                      $
                      {td?.membership_payment?.amount ||
                        td?.cash_payment?.amount}
                    </h3>
                  </div>
                  {td?.trs_items?.map((od, index) => (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <ListItem className="lists" key={index}>
                        <div>{od.tri_id_name}</div>
                        <div className="marg">{od.quantity}</div>
                        <div className="marg">${od.amount}</div>
                      </ListItem>
                      <Divider />
                    </Typography>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
            <div className="cardButton">
              <Typography>Status: Preparing...</Typography>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleStatus(td, index)}
                >
                  Done
                </Button>
              </CardActions>
            </div>
          </Card>
        ))
      )}
      {/* <div className="printBtn">
        <div style={{display: "none"}}>
      <ComponentToPrint ref={componentRef} data={totalData} />
      </div>
      <Button 
        size="medium"
        variant="outlined"
        color="primary"
        onClick={handlePrint}
      >Print this out!</Button>
      </div> */}
    </div>
  );
}
export default Order;
