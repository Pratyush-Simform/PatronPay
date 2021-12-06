import React, { useContext, useEffect } from 'react'
import EnhancedTable from '../DndTable/Table'
import { Context } from "../../store/Context"
import { cols } from "./PaymentCols"
import { getMembershipPayments } from "../../services/membershipPaymentApi"

function MemberPayment() {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
      getMembershipPayments().then((res) => {
        const newDataSource = res.data.data.results.map((temp) => {
          temp["txn_date_time"] = `${temp.txn_date_time.substring(0, 10)} ${temp.txn_date_time.substring(11, 19)}`;
          return temp
        })
        dispatch({ type: "MEMBER_PAYMENTS", payload: newDataSource });
      })

      // getTransactions().then(response => {
      //   const newDataSource = response.data.data.results.filter(
      //     obj => !(obj && Object.keys(obj.membership_payment).length === 0)
      //   ).map(td => td.membership_payment);
      //   dispatch({ type: "MEMBER_PAYMENTS", payload: newDataSource });
      // })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="pMainContainer">
        <EnhancedTable data={state.memberPayments} columnData={cols} name="Membership Payments" />
      </div>
    )
}

export default MemberPayment
