import React, { useState, useContext, useEffect, useRef } from "react";
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
import Axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../../App.css";
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

function Order() {
  const [state, dispatch] = useContext(Context);
  const [config, setConfig] = useState([]);
  const [open, setOpen] = useState(false);
  const [pcfId, setPcfId] = useState("");
  const [socketData, setSoketdata] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [totalData, setTotalData] = useState([])

  const handleStatus = (td, index) => {
    let spliceAry = [...totalData]
    if (index > -1) {
      spliceAry.splice(index, 1);
      setTotalData(spliceAry)
    }
    dispatch({ type: "DONE" });
    dispatch({ type: "TOTALDATA", payload: td})
    dispatch({ type: "RETURN", payload: null})
    // localStorage.setItem("orders", JSON.stringify(totalData))
    // let localOrders = JSON.parse(localStorage.getItem("orders"))
    // console.log(localOrders);
  };

  let newArray = [...totalData]
  useEffect(() => {
    if(state.returnData){
      newArray.push(state.returnData)
      setTotalData(newArray)
      dispatch({ type: "RETURN", payload: null})
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [state])
  useEffect(() => {
    async function getConfigApi() {
      const api = "https://tenant3.mypatronpay.us/api/patron_configuration/";
      const token = localStorage.getItem("token");
      const response = await Axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConfig(response.data.data.results);
    }
    getConfigApi();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/${pcfId}/`
    );
    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      setSoketdata(data.message);
    };
  }, [pcfId]);
  useEffect(() => {
    Object.keys(socketData).length > 0 && setTotalData(prev => [...prev, socketData])
    let date = new Date(socketData.date_created);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear() - 2000;
    let renderDate = `${day}/${month}/${year}`;
    let renderTime = `${hours}:${minutes}`;
    setTime(renderTime);
    setDate(renderDate);
    let name = socketData?.trs_items?.map((i) => {
      return i.tri_id_name;
    });
    let quantity = socketData?.trs_items?.map((j) => {
      return j.quantity;
    });
    dispatch({
      type: "ORDERS",
      payload: {
        date: renderDate,
        time: renderTime,
        type: socketData?.membership_payment?.txn_type || socketData?.cash_payment?.txn_type,
        amount: socketData?.membership_payment?.amount || socketData?.cash_payment?.amount,
        name: name,
        quantity: quantity,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketData]);

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

const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      {pcfId === "" ? <h2 className="profileSubmitBtn">Please select configuration</h2> : null}
      {Object.keys(socketData).length === 0 ||
      (totalData.length === 0 && pcfId === "") ? (
        <div>
          <h1 className="profileSubmitBtn">NO orders available</h1>
        </div>
      ) : (
        totalData?.map((td, index) => (
        <Card
          className="orderCard"
        >
          <CardActionArea>
            <CardContent>
              <div className="listStyles">
                <Typography gutterBottom variant="h5" component="h2">
                  ORDER #{td.order_id}
                </Typography>
                <h3>
                  {date} {time}
                </h3>
              </div>
              <List dense className="listItems">
                <div style={{ display: "flex" }}>
                  <h3>
                    {td?.membership_payment?.txn_type ||
                      td?.cash_payment?.txn_type}
                  </h3>
                  <h3 style={{ marginLeft: "3%" }}>
                    ${td?.membership_payment?.amount ||
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
                      {/* <div className="marg">cash | credit card </div> */}
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
                onClick={()=>handleStatus(td,index)}
              >
                Done
              </Button>
            </CardActions>
          </div>
        </Card>
        ))
      )}
      <div className="printBtn">
        <div style={{display: "none"}}>
      <ComponentToPrint ref={componentRef} data={totalData} />
      </div>
      <Button 
        size="medium"
        variant="outlined"
        color="primary"
        onClick={handlePrint}
      >Print this out!</Button>
      </div>
    </div>
  );
}
export default Order;
