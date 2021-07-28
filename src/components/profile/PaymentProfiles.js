import axios from 'axios';
import React, {useState, useEffect} from 'react'
import EnhancedTable from "../DndTable/Table"

function PaymentProfiles() {
    let cols = [
        {
            id: "config_type",
            numeric: false,
            disablePadding: false,
            label: "Configuration Type",
            width: 500
        },
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: "Name",
            width: 500
        }
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchApi() {
            const api = `https://tenant3.mypatronpay.us/api/patron_configuration/`
            const token = localStorage.getItem("token");
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setData(response.data.data.results);
        }
        fetchApi()
    }, [])

    return (
        <div>
            <EnhancedTable data={data} columnData={cols} name="Payment Profiles" />
        </div>
    )
}

export default PaymentProfiles
