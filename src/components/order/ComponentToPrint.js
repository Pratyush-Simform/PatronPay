import React from "react"
import "../../App.css"
export class ComponentToPrint extends React.Component {
    render() {
      return (
        <table className="table">
            <h1>Orders</h1>
          <thead>
            <th>Order Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </thead>
          <tbody>
            {this.props?.data?.map(data => (
                <tr>
                <td>{data.order_id}</td>
                {data.trs_items.map(trs => (
                    <>
                    <td>{trs.tri_id_name}</td>
                    <td>{trs.quantity}</td>
                    <td>{trs.amount}</td>
                    </>
                ))}
                </tr>     
            ))}
          </tbody>
        </table>
      );
    }
}
