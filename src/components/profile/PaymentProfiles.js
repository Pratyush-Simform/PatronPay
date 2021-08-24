import React, {useState, useEffect} from 'react'
import EnhancedTable from "../DndTable/Table"
import { cols } from "./paymentProfileColumns"
import { getPaymentProfiles } from "../../services/profileApi"

function PaymentProfiles() {
    const [data, setData] = useState([])

    useEffect(() => {
        getPaymentProfiles().then(response => {
            setData(response.data.data.results);
        })
    }, [])

    return (
        <div>
            <EnhancedTable data={data} columnData={cols} name="Payment Profiles" />
        </div>
    )
}

export default PaymentProfiles
