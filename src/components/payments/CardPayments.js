import React, { useContext, useEffect } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cashlessCols } from "./PaymentCols"
import { getTransactions } from "../../services/transactionApi"

function CardPayment() {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
      getTransactions().then(response => {
        const newDataSource = response.data.data.results.filter(
          obj => !(obj && Object.keys(obj.cashless_payment).length === 0)
        ).map(td => td.cashless_payment);
        dispatch({ type: "CARD_PAYMENTS", payload: newDataSource });
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pMainContainer">
          <EnhancedTable data={state.cardPayments} columnData={cashlessCols} name="Cashless Payments" />
        </div>
    )
}

export default CardPayment
