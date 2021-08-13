import React from "react";
import "../../App.css";

export class ComponentToPrint extends React.Component {  
  render() {
    return (
      <div className="allTables">
        <table className="printTable">
          <h1>Open Orders</h1>
          <thead>
            <th>Order Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>name</th>
          </thead>
          <tbody>
            {this.props?.otherData?.map((data) => (
              <tr>
                <td>{data.order_id}</td>
                {data.trs_items.map((trs) => (
                  <>
                    <td>{trs.tri_id_name}</td>
                    <td>{trs.quantity}</td>
                    <td>{trs.amount}</td>
                  </>
                ))}
                  <td>{data.receipt_receiver}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="printTable">
          <h1>Done Orders</h1>
          <thead>
            <th>Order Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>name</th>
          </thead>
          <tbody>
            {this.props?.data?.map((data) => (
              <tr>
                <td>{data.order_id}</td>
                {data.trs_items.map((trs) => (
                  <>
                    <td>{trs.tri_id_name}</td>
                    <td>{trs.quantity}</td>
                    <td>{trs.amount}</td>
                  </>
                ))}
                <td>{data.receipt_receiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
