import React, { useEffect, useState, useContext } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import { cols } from "./TransactionItemCols";
import { Context } from "../../store/Context";
import { getTransactions } from "../../services/transactionApi"

const TransactionItems = () => {
  const [data, setData] = useState([]);
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    getTransactions().then(response => {
        const newDataSource = response.data.data.results.map((data) => data?.trs_items[0]);
        let filtereddata = newDataSource.filter((element) => element !== undefined);
        filtereddata.map((temp) => {
            temp["date_created"] = `${temp.date_created.substring(0, 10)} ${temp.date_created.substring(11, 19)}`;
            return temp;
        })
        setData(filtereddata);
        dispatch({ type: "TRANSACTION_ITEMS", payload: newDataSource });
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transHead pMainContainer">
      <EnhancedTable data={data} columnData={cols} name="Transaction Items" />
    </div>
  );
};

export default TransactionItems;
