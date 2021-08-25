import React, { useContext } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cashlessCols } from "./PaymentCols"

function CardPayment() {
    const [state] = useContext(Context)
    const data = state.transaction.filter(
        obj => !(obj && Object.keys(obj.cashless_payment).length === 0)
      ).map(td => td.cashless_payment);
 
 console.log(data);

    return (
        <div>
          <EnhancedTable data={data} columnData={cashlessCols} name="Cashless Payments" />
        </div>
    )
}

export default CardPayment
