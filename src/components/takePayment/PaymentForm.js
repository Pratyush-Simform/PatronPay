import React, { useState, useEffect } from 'react';
import { GlobalPayments } from './globalpayments';
import { manualCardPayment } from '../../services/takePaymentApi';
import { addTransactions } from '../../services/transactionApi';
import Icon from "../../assets/images/card_types.png";
import "./argon.css"
import {
  gzip
} from 'pako';

const PaymentForm = (props) => {

    const [cardForm, setCardForm] = useState()
    const [paymentStatus, setPaymentStatus] = useState("")
    const [finalData, setFinalData] = useState({})

    useEffect(() => {
        GlobalPayments.configure({
            publicApiKey: "pkapi_cert_7oBp8dt3vHK0fnfZo2"
          });

          setCardForm(GlobalPayments.ui.form({
            fields: {
              "card-holder-name": {
                placeholder: "Jane Smith",
                target: "#credit-card-card-holder"
              },
              "card-number": {
                placeholder: "•••• •••• •••• ••••",
                target: "#credit-card-card-number"
              },
              "card-expiration": {
                placeholder: "MM / YYYY",
                target: "#credit-card-card-expiration"
              },
              "card-cvv": {
                placeholder: "•••",
                target: "#credit-card-card-cvv"
              },
              "submit": {
                value: "Submit",
                target: "#credit-card-submit"
              }
            },
            styles: {
              // Your styles
              'iframe': {
                'width': '100%',
                'height': '50px !important'
              },
              '#credit-card-submit': {
                'height': '50px !important'
              },
              'input': {
                'font-size': '.875rem',
                'font-weight': '400',
                'line-height': '1.5',
                'display': 'block',
                'width': '100% !important',
                'height': 'calc(1.5em + 1.25rem + 2px)', // last 5px
                'padding': '0.625rem 0.75rem',
                'transition': 'all .15s ease-in-out',
                'color': '#8898aa',
                'border': '1px solid #dee2e6',
                'border-radius': '0.25rem',
                'background-color': '#fff',
                'background-clip': 'padding-box',
                'box-shadow': '0 3px 2px rgb(233 236 239 / 5%)',
                'overflow': 'visible',
                'font-family': 'inherit',
                'margin': '0',
                'box-sizing': 'border-box',
              },
              'input:focus': {
                'border-color': 'blue',
                'color': '#8898aa',
                // 'box-shadow': ' inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px lighten(, 20%)',
                'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6)',
                'outline': '0 none',
              },
              '.submit': {
                  'font-size': '.875rem',
                  'position': 'relative',
                  'transition': 'all .15s ease',
                  'letter-spacing': '.025em',
                  'text-transform': 'none',
                  'will-change': 'transform',
        
                  'color': '#fff',
                  'border-color': '#5e72e4',
                  'background-color': '#5e72e4',
                  'box-shadow': '0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)',
        
                  'font-weight': '600',
                  'line-height': '2',
                  'display': 'inline-block',
                //   'padding': '0.625rem 1.25rem',
                  'user-select': 'none',
                  'text-align': 'center',
                  'vertical-align': 'middle',
                  'border': '1px solid transparent',
                  'border-radius': '0.25rem',
                  'cursor': 'pointer',
              }
            }
          }))
    },[])
    // Configure account

  // Create Form
  cardForm?.ready(() => {
    console.log("Registration of all credit card fields occurred");
  });

  cardForm?.on("token-success", (resp) => {
    const payload = {"billing-zip": document.getElementById("billing-zip").value, "amount": props.amount, "payment-reference": resp.paymentReference}
    const datas = {"cardLast4": resp.details.cardLast4, "cardType": resp.details.cardType}
    console.log("resp",resp.details);

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }

    // Manual Card Entry Api call
    manualCardPayment(form_data).then((response) => {
      console.log("manual response",response.data);
      const data = response.data
      setFinalData({...finalData, ...data, ...datas})
      setPaymentStatus(response.data.status)
    })
  });

  cardForm?.on("token-error", (resp) => {
    console.log("resp",resp);
    // show error to the consumer
  });

  // field-level event handlers. example:
  cardForm?.on("card-number", "register", () => {
    console.log("Registration of Card Number occurred");
  });

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
      return v.toString(16);
    });
  }

  if(paymentStatus){
    console.log("final data",finalData);
    const trs_date = (new Date()).toISOString();
    if(paymentStatus === "success"){
      const payload = {
        "dvc_serial": "000150194008969",
        "Pcf_id": props?.cardData?.pcf_id?.id,
        "transactionDateTime": trs_date,
        "manualEntry": true,
        "Transactions": [{
            "cashPayment": [],
            "cashlessPayment": [{
                "amountAuth": props?.amount,
                "authNumber": finalData?.AuthCode,
                "cardType": finalData?.cardType,
                "ccLast4": finalData?.cardLast4,
                "currency": "USD",
                "firstName": "",
                "mid": "",
                "lastName": "",
                "Ref Id1": finalData?.HostTransactionID,
                "refId2": finalData?.HostReferenceNumber,
                "txnDateTime": trs_date,
                "txnResult": "DECLINE",
                "txnType": "CC",
                "payment_url": "https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx",
                "tid": "6399858",
                "tip": props?.data?.tip,
                "tipTax": "0.00"
            }],
            "trsDateTime": trs_date,
            "Trs_id": uuidv4(),
            "trsItems": [{
                "Amount": props?.amount,
                "Amount_Overiden": "N",
                "Original_Amount": props?.data?.amount,
                "Other_Amount": 0.0,
                "TRI_ID": "",
                "Tax": props?.data?.tax,
                "short_name": props?.data?.memo,
                "quantity": 1
            }],
            "trsType": props?.cardData?.pcf_id?.name,
            "vendResult": true,
            "membershipPayment": []
        }],
        "Tru_id": props?.cardData?.tur_id?.id
      }
      const payloadData = JSON.stringify(payload)

      // Add Transaction Post request
      addTransactions(gzip(payloadData, {to: 'string'}))
    }
    setTimeout(function(){
        window.location.reload();
    }, 3000);
  }

    return (
        // <div>
        //     <form id="payment-form" action="/charge" method="get">
        //         <label htmlFor="billing-zip">Billing Zip Code</label>
        //         <input id="billing-zip" name="billing-zip" type="tel" />

        //         <label htmlFor="billing-zip">CardHolder Name</label>
        //         <div id="credit-card-card-holder"></div>
        //         <div id="credit-card-card-number"></div>
        //         <div id="credit-card-card-cvv"></div>
        //         <div id="credit-card-card-expiration"></div>
        //         <div id="credit-card-submit"></div>
        //     </form>
        // </div>
        <>
            {paymentStatus === "" && (   
            <div className="patronpay-theme">
                  <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                <div className="container">
                    {/* <div className="navbar-brand">
                    <img src={PatronpayIcon} alt="pp_logo" />
                    </div> */}
                </div>
            </nav>
            <div className="main-content">
            <div className="container mt-8 pb-5">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary border-0 mb-0">
                    <div className="card-body px-lg-5 py-lg-5">
                    <img src={Icon} className="img-fluid" alt="logo"/>

                    <form id="payment_form" method="get" action="/charge">
                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Billing Zip Code:</label>
                        <input id="billing-zip" name="billing-zip" type="number" className="form-control" required />
                        </div>

                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Card Holder:</label>
                        <div id="credit-card-card-holder"></div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Card Number:</label>
                        <div id="credit-card-card-number"></div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Card CVV:</label>
                        <div id="credit-card-card-cvv"></div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Card Expiration:</label>
                        <div id="credit-card-card-expiration"></div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="billing-zip" className="label">Amount:</label>
                        <input className="form-control" id="amount" name="amount" defaultValue={props.amount} type="number" disabled/>
                        </div>
                        <div id="credit-card-submit"></div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* <footer class="py-5" id="footer-main">
    <div class="container">
      <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-white">
            &copy; 2021 <a href="https://patronpay.us/" class="font-weight-bold ml-1 text-white" rel="noreferrer" target="_blank">PatronPay</a>
          </div>
        </div>
        <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <a href="https://patronpay.us/" class="nav-link" rel="noreferrer" target="_blank">PatronPay</a>
            </li>
            <li class="nav-item">
              <a href="https://patronpay.us/about/" class="nav-link" rel="noreferrer" target="_blank">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer> */}
        </div>  
        )}
            { paymentStatus === "success" && (
              <div className="payment-success">
                  {"Payment Successful"}
              </div>
            )}
            { paymentStatus === "failure" && (
                <div className="payment-failure">
                    {"Payment Failed"}
                </div>
            )}
        </>
    )
}

export default PaymentForm;