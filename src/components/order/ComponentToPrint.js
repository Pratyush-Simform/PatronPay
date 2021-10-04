import React from "react";
import "../../App.css";

export class ComponentToPrint extends React.Component {  
  render() {
    return (
      <div className="allTables">
        <table className="printTable">
        <thead><tr><td>Open Orders</td></tr></thead>
          <thead>
            <tr><td>Order Id</td></tr>
            <tr><td>Name</td></tr>
            <tr><td>Quantity</td></tr>
            <tr><td>Price</td></tr>
            <tr><td>name</td></tr>
          </thead>
          <tbody>
            {this.props?.otherData?.map((data) => (
              <tr>
                <td>{data.order_id}</td>
                {data?.trs_items?.map((trs) => (
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
          <thead><tr><td>Done Orders</td></tr></thead>
          <thead>
            <tr><td>Order Id</td></tr>
            <tr><td>Name</td></tr>
            <tr><td>Quantity</td></tr>
            <tr><td>Price</td></tr>
            <tr><td>name</td></tr>
          </thead>
          <tbody>
            {this.props?.data?.map((data) => (
              <tr>
                <td>{data.order_id}</td>
                {data?.trs_items?.map((trs) => (
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
