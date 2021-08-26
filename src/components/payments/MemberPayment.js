import React, { useContext } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cols } from "./PaymentCols"

function MemberPayment() {
    const [state] = useContext(Context)
    const data = state.transaction.filter(
        obj => !(obj && Object.keys(obj.membership_payment).length === 0)
      ).map(td => td.membership_payment);
 
 console.log(data);

    return (
          <EnhancedTable data={data} columnData={cols} name="Membership Payments" />
    )
}

export default MemberPayment
