import Axios from "axios";
import React, { useEffect, useState } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Transaction = () => {
  const history = useHistory();
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchMyApi() {
      const api = `https://tenant3.mypatronpay.us/api/transaction/`;
      const token = localStorage.getItem("token")
      const response = await Axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.results);
    }
    fetchMyApi();
  }, []);

  return (
    <div className="transHead">
      <div className="Trans">
        <span className="back">
        <ArrowBackIcon onClick={() => history.push("/")} classes="icon" fontSize="large" />
        </span>
        <h1 className="heading" >PatronPay</h1> 
      </div>
      <EnhancedTable data={data}/>
    </div>
  );
};

export default Transaction;
