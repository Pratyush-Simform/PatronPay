import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import "../../App.css";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PaymentForm from './PaymentForm';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getUserAssignment } from "../../services/userAssignmentApi";

const MenuProps = {
    PaperProps: {
      style: {
        maxWidth: 250,
      },
    },
  };

const TakePayment = () => {
    const [total, setTotal] = useState()
    const [payment, setPayment] = useState(false)
    const [profileMode, setProfileMode] = useState("");
    const [config, setConfig] = useState([])
    
    useEffect(() => {
        getUserAssignment().then(response => {
            const dataSource = response.data.data.results.filter((temp) => !temp.pcf_id.is_deleted)
            setConfig(dataSource);
          })
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    const formik = useFormik({
        initialValues: {
            amount: 0.0,
            tax: 0.0,
            tip: 0.0,
            memo: "",
            pmode: "",
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

    const handleChange = (event) => {
        setProfileMode(event.target.value);
    };
   
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
                                <div className="pCol pCol--col4 pCol--col-md-12">
                                <FormControl>
                                    <InputLabel id="demo-simple-select-helper-label">
                                    Select Mode
                                    </InputLabel>
                                    <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={profileMode}
                                    label="Select Mode"
                                    onChange={(event) => handleChange(event)}
                                    MenuProps={MenuProps}
                                    required
                                    >
                                    {config?.map((con) => (
                                        <MenuItem value={con} key={con.id} onChange={formik.handleChange}>
                                        {con.pcf_id.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                </div>
                            </div>
                        <div className="pRow profileSubmitBtn">
                                <div className="pCol pCol--col4 pCol--col-md-12">
                                    <TextField
                                        required={true}
                                        id="outlined-basic"
                                        label="Memo"
                                        name="memo"
                                        type="text"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.memo}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="pRow profileSubmitBtn">
                                <div className="pCol pCol--col4 pCol--col-md-12">
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
                                <div className="pCol pCol--col4 pCol--col-md-12">
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
                                <div className="pCol pCol--col4 pCol--col-md-12">
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
                        // <iframe
                        // id="myFrame"
                        // src={paymentURL}
                        // frameBorder="0"
                        // width="100%"
                        // height="1000px"
                        // allowtransparency="true"
                        // title="Payment"
                        // />
                        <PaymentForm amount={total} cardData={profileMode} data={formik.values}/>
                    )}
                </div>
            </Paper>
        </div>
    );
}

export default TakePayment;