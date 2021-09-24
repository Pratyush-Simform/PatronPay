import React, {useEffect, useContext} from 'react';
import EnhancedTable from "../DndTable/Table";
import { cols } from "./paymentProfileColumns";
import { getPaymentProfiles } from "../../services/profileApi";
import {Context} from "../../store/Context";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function PaymentProfiles() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        getPaymentProfiles().then(response => {
            const newDataSource = response.data.data.results.map((temp) => {
                temp["customPayments"] = temp.custom_payments ? "Yes" : "No";
                temp["enableTip"] = temp.enable_tip ? "Yes" : "No";
                temp["payByAccountNumber"] = temp.pay_by_account_number ? "Yes" : "No";
                temp["Active"] = temp.is_deleted ? "Yes" : "No"   
                temp["actions"] = <Button onClick={() => history.push("/profile")} variant="contained">Items</Button>
                return temp
            }); 
            dispatch({ type: "PAYMENT_PROFILES", payload: newDataSource})
        })
        .catch((err) => console.error(err));
    }, [dispatch, history])

    return (
        <div>
            <EnhancedTable data={state.paymentProfiles} columnData={cols} name="Payment Profiles" />
        </div>
    )
}

export default PaymentProfiles
