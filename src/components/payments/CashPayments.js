import React, { useContext } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cashCols } from "./PaymentCols"

function CashPayment() {
    const [state] = useContext(Context)
    const data = state.transaction.filter(
        obj => !(obj && Object.keys(obj.cash_payment).length === 0)
      ).map(td => td.cash_payment);

    return (
        <div className="pMainContainer">
          <EnhancedTable data={data} columnData={cashCols} name="Cash Payments" />
        </div>
    )
}

export default CashPayment
