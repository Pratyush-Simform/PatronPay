import React, { useContext, useEffect } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cashCols } from "./PaymentCols"
import { getCashPayments } from "../../services/cashPaymentApi"

function CashPayment() {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
      getCashPayments().then((res) => {
        const newDataSource = res.data.data.results
        dispatch({ type: "CASH_PAYMENTS", payload: newDataSource });
      })

      // getTransactions().then(response => {
      //   const newDataSource = response.data.data.results.filter(
      //     obj => !(obj && Object.keys(obj.cash_payment).length === 0)
      //   ).map(td => td.cash_payment);
      //   dispatch({ type: "CASH_PAYMENTS", payload: newDataSource });
      // })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pMainContainer">
          <EnhancedTable data={state.cashPayments} columnData={cashCols} name="Cash Payments" />
        </div>
    )
}

export default CashPayment
