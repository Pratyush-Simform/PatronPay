import Axios from "axios";
import React, { useEffect, useState } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";

const Transaction = () => {
  const [data, setData] = useState([]);
 const[ newData, setNewData] = useState([])
  let cols = [
    {
      id: "newDate",
      numeric: false,
      disablePadding: false,
      label: "Date/time",
      width: 200,
    },
    {
      id: "payment_url",
      numeric: false,
      disablePadding: false,
      label: "Payment Url",
      width: 200,
    },
    {
      id: "trs_type",
      numeric: false,
      disablePadding: false,
      label: "Transaction type",
      width: 200,
    },
    {
      id: "settled",
      numeric: true,
      disablePadding: true,
      label: "Settled",
      width: 200,
    },
    {
      id: "noOfItems",
      numeric: true,
      disablePadding: true,
      label: "No of Items",
      width: 200,
    }
  ];
 
  useEffect(() => {
    async function fetchMyApi() {
      const api = `https://tenant3.mypatronpay.us/api/transaction/`;
      const token = localStorage.getItem("token");
      const response = await Axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.results);
    }
    fetchMyApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let newData =  data.map(d => ({...d, noOfItems: d.trs_items.length, newDate: d.date_created.substring(0, 10)}))
    setNewData(newData)
  }, [data])

  return (
    <div className="transHead">
      <EnhancedTable data={newData} columnData={cols} name="Transaction" />
    </div>
  );
};

export default Transaction;
