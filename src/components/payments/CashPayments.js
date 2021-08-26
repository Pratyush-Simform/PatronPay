import React, { useContext } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cols } from "./PaymentCols"

function CashPayment() {
    const [state] = useContext(Context)
    const data = state.transaction.filter(
        obj => !(obj && Object.keys(obj.cash_payment).length === 0)
      ).map(td => td.cash_payment);
 
 console.log(data);

    return (
          <EnhancedTable data={data} columnData={cols} name="Cash Payments" />
    )
}

export default CashPayment
