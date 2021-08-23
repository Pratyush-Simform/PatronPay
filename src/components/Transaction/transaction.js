import Axios from "axios";
import React, { useEffect, useState } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import {cols} from "./Columns"

const Transaction = () => {
  const [data, setData] = useState([]);
 const[ newData, setNewData] = useState([])
 
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
