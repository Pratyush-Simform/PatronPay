import Axios from "axios";
import React, { useEffect, useState } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Transaction = () => {
  let cols = [
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
      id: "createdAt",
      numeric: true,
      disablePadding: true,
      label: "Created At",
      width: 300,
    },
  ];
  const [colData, setColData] = useState([]);
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    setColData(cols);
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
  }, []);

  console.log(colData);

  return (
    <div className="transHead">
      {/* <div className="Trans">
        <span className="back">
          <ArrowBackIcon
            onClick={() => history.push("/")}
            classes="icon"
            fontSize="large"
          />
        </span>
        <h1 className="heading">PatronPay</h1>
      </div> */}
      <EnhancedTable data={data} columnData={cols} name="Transaction" />
    </div>
  );
};

export default Transaction;
