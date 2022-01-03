import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import "../../App.css";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const TakePayment = () => {

    const [total, setTotal] = useState()
    const [payment, setPayment] = useState(false)

    const paymentURL = `https://www.devpatronpay.us/manual-card-payment/?amount=${total}`

    const formik = useFormik({
        initialValues: {
            amount: 0.0,
            tax: 0.0,
            tip: 0.0,
        },
        onSubmit: (values) => {
            if(values.amount === 0) {
                alert("Amount Must be > 0");
            } else {
                let x = values.amount + values.tax + values.tip;
                setTotal(parseFloat(x.toFixed(2)))
                setPayment((payment) => (!payment))
            }
          }
      });

      setInterval(() => {
        // console.log('Interval triggered',document.getElementById('myFrame'));
        if((document.getElementById('myFrame')?.contentWindow.length === 0) && payment) {
            var iframes = document.getElementsById("myFrame").contentWindow.document;
            //     for (var i = 0; i < iframes.length; i++) {
            //         iframes[i].parentNode.removeChild(iframes[i]);
            //     }
            // if(iframes[0]){
            
            console.log("iframe",iframes);
                // iframes?.parentNode.removeChild(iframes);
            // }
            
        }
        // const data = document.getElementById('myFrame')?.contentWindow
        // console.log("data",data?.location?.href);
      }, 5000);
   
    return (
        <div className="transHead pMainContainer">
            <Paper className="searchBox dashboard-page">
                <Toolbar className="pMainToolbar">
                    <Typography variant="subtitle1" id="tableTitle">
                        {"Take Payment"}
                    </Typography>
                </Toolbar> 
                { !payment && (
                <div>
                    <div className="pModal__body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="pRow profileSubmitBtn">
                                <div className="pCol pCol--col6 pCol--col-md-12">
                                    <TextField
                                        id="outlined-basic"
                                        label="Amount $"
                                        name="amount"
                                        type="number"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.amount}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="pRow profileSubmitBtn">
                                <div className="pCol pCol--col6 pCol--col-md-12">
                                    <TextField
                                        required={true}
                                        id="outlined-basic"
                                        label="Tax $"
                                        name="tax"
                                        type="number"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.tax}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="pRow profileSubmitBtn">
                                <div className="pCol pCol--col6 pCol--col-md-12">
                                    <TextField
                                        required={true}
                                        id="outlined-basic"
                                        label="Tip $"
                                        name="tip"
                                        type="number"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.tip}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="profileSubmitBtn">
                            <Button variant="contained" color="primary" size="large" type="submit">
                                Pay
                            </Button>
                            </div>
                        </form>
                    </div>
                </div>
                )}
                <div id="responseFrame">
                    { payment && (
                        <iframe
                        id="myFrame"
                        src={paymentURL}
                        frameBorder="0"
                        width="100%"
                        height="1000px"
                        allowtransparency="true"
                        title="Payment"
                        />
                    )}
                </div>
                {/* <iframe
                        id="myFrame"
                        src="http://localhost:3000/myorganisation"
                        frameBorder="0"
                        width="100%"
                        height="1000px"
                        allowtransparency="true"
                        title="Payment"
                        /> */}
            </Paper>
        </div>
    );
}

export default TakePayment;