import React, { useEffect, useState, useContext } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import { cols } from "./Columns";
import { Context } from "../../store/Context";
import { getTransactions } from "../../services/transactionApi"

const Transaction = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    getTransactions().then(response => {
      setData(response.data.data.results);
      dispatch({ type: "TRANSACTION", payload: response.data.data.results });
    })
    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    data.forEach((temp) => {
      temp["noOfItems"] = temp.trs_items.length;
      temp["newDate"] = temp.date_created.substring(0, 10);
    });

    console.log(data);
    setNewData(data);
  }, [data]);

  return (
    <div className="transHead">
      <EnhancedTable data={newData} columnData={cols} name="Transaction" />
    </div>
  );
};

export default Transaction;
