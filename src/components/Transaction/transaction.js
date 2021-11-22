import React, { useEffect, useState, useContext } from "react";
import EnhancedTable from "../DndTable/Table";
import "../../App.css";
import { cols } from "./Columns";
import { Context } from "../../store/Context";
import { getTransactions } from "../../services/transactionApi"

const Transaction = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    getTransactions().then(response => {
      setData(response.data.data.results);
      dispatch({ type: "TRANSACTION", payload: response.data.data.results });
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    data.forEach((temp) => {
      temp["noOfItems"] = temp.trs_items.length;
      temp["newDate"] = temp.date_created.substring(0, 10);
      temp["amount"] = temp.cash_payment.amount || temp.cashless_payment.amount_auth || temp.membership_payment.amount
      temp["firstName"] = temp.cash_payment.first_name || temp.cashless_payment.first_name || temp.membership_payment.first_name
      temp["lastName"] = temp.cash_payment.last_name || temp.cashless_payment.last_name || temp.membership_payment.last_name
      temp["cardNumber"] = temp.membership_payment.card_number
      temp["cc_last4"] = temp.cashless_payment.cc_last4
      temp["card_type"] = temp.cashless_payment.card_type || temp.cash_payment.txn_type
      temp["tip"] = temp.cashless_payment.tip || temp.membership_payment.tip || temp.cash_payment.tip
    });
    setNewData(data);
  }, [data]);

  return (
    <div className="transHead pMainContainer">
      <EnhancedTable data={newData} columnData={cols} name="Transaction" />
    </div>
  );
};

export default Transaction;
