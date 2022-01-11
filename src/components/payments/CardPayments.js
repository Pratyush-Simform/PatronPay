import React, { useContext, useEffect } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cashlessCols } from "./PaymentCols"
import { getCardPayments } from "../../services/cardPaymentApi"

function CardPayment() {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
      getCardPayments().then((res) => {
        const newDataSource = res.data.data.results.map((temp) => {
          temp["txn_date_time"] = `${temp.txn_date_time.substring(0, 10)} ${temp.txn_date_time.substring(11, 19)}`;
          return temp
        })
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
