import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../../App.css";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { CSVLink } from "react-csv";

function ExportTransactions({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedFromDate, setSelectedFromDate] = React.useState([]);
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());
  const [showFromDate, setShowFromDate] = React.useState(new Date());
  const [showToDate, setShowToDate] = React.useState(new Date());
  // const [trsItems, setTrsItems] = React.useState([])

  const handleFromDateChange = (date) => {
    setShowFromDate(date);
    const transactionDates = data.map((date) => {
      return {
        date: new Date(date.date_created).getDate(),
        date_created: date.date_created,
        date_modified: date.date_modified,
        dvc_serial: date.dvc_serial,
        id: date.id,
        mid: date.mid,
        payment_url: date.payment_url,
        pcf_id: date.pcf_id,
        receipt: date.receipt,
        receipt_receiver: date.receipt_receiver,
        settled: date.settled,
        settled_on: date.settled_on,
        settlement_status: date.settlement_status,
        settlement_swipe_fee: date.settlement_swipe_fee,
        settlement_txn_rate: date.settlement_txn_rate,
        status: date.status,
        tid: date.tid,
        trs_date_time: date.trs_date_time,
        trs_id: date.trs_id,
        trs_items: date.trs_items,
        trs_type: date.trs_type,
        tru_id: date.tru_id,
      };
    });
    let filteredDates = transactionDates.filter((fd) => {
      return fd.date > date.getDate();
    });
    setSelectedToDate(filteredDates);
    // let filteredTrs = transactionDates.map(trs => trs.trs_items)
    // setTrsItems(filteredTrs)
  };

  const handleToDateChange = (date) => {
    setShowToDate(date);
    const transactionDates = data.map((date) => {
      return {
        date: new Date(date.date_created).getDate(),
        date_created: date.date_created,
        date_modified: date.date_modified,
        dvc_serial: date.dvc_serial,
        id: date.id,
        mid: date.mid,
        payment_url: date.payment_url,
        pcf_id: date.pcf_id,
        receipt: date.receipt,
        receipt_receiver: date.receipt_receiver,
        settled: date.settled,
        settled_on: date.settled_on,
        settlement_status: date.settlement_status,
        settlement_swipe_fee: date.settlement_swipe_fee,
        settlement_txn_rate: date.settlement_txn_rate,
        status: date.status,
        tid: date.tid,
        trs_date_time: date.trs_date_time,
        trs_id: date.trs_id,
        trs_items: date.trs_items,
        trs_type: date.trs_type,
        tru_id: date.tru_id,
      };
    });
    let filteredDates = transactionDates.filter((fd) => {
      return fd.date < date.getDate();
    });
    setSelectedFromDate(filteredDates);
  };

  // console.log(selectedFromDate, selectedToDate, 87);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(trsItems);

  const headers = [
    { label: "date", key: "date" },
    { label: "Created Date", key: "date_created" },
    { label: "Modified Date", key: "date_modified" },
    { label: "DVC Serial", key: "dvc_serial" },
    { label: "Id", key: "id" },
    { label: "MID", key: "mid" },
    { label: "Payment URL", key: "payment_url" },
    { label: "PCF Id", key: "pcf_id" },
    { label: "Receipt", key: "receipt" },
    { label: "Receipt Receiver", key: "receipt_receiver" },
    { label: "Settled", key: "settled" },
    { label: "Settled On", key: "settled_on" },
    { label: "Settlement Status", key: "settlement_status" },
    { label: "Settlement Swipe Fee", key: "settlement_swipe_fee" },
    { label: "Settlement Transaction Rate", key: "settlement_txn_rate" },
    { label: "status", key: "status" },
    { label: "TID", key: "tid" },
    { label: "Transaction Date Time", key: "trs_date_time" },
    { label: "Transaction Id", key: "trs_id" },
    { label: "Transactions Items", key: "trs_items" },
    { label: "Transaction Type", key: "trs_type" },
    { label: "TRU ID", key: "tru_id" },
  ];

// const trsHeaders = [
//   {label: "Amount", key: "amount"},
//   {label: "Amount Overridden", key: "amount_overridden"},
//   {label: "Created Date", key: "date_created"},
//   {label: "Modified Date", key: "date_modified"},
//   {label: "Id", key: "id"},
//   {label: "Original Amount", key: "original_amount"},
//   {label: "Other Amount", key: "other_amount"},
//   {label: "Quantity", key: "quantity"},
//   {label: "Tax", key: "tax"},
//   {label: "Tri Id", key: "tri_id"},
//   {label: "Tri Id Name", key: "tri_id_name"},
// ]

  return (
    <div>
      <span type="button" onClick={handleOpen}>
        <Button variant="contained">Export</Button>
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <h2 id="transition-modal-title">Export</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className="gridCon">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="from-date"
                  label="From Date"
                  value={showFromDate}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="to-date"
                  label="To Date"
                  value={showToDate}
                  onChange={handleToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <div className="gridBtn">
                <CSVLink data={selectedFromDate} headers={headers}>
                  <Button variant="contained" color="primary">
                    Export Tranactions
                  </Button>
                </CSVLink>

                {/* <CSVLink data={trsItems} headers={trsHeaders}> */}
                  <Button variant="contained" color="primary">
                    Export Tranaction Items
                  </Button>
                {/* </CSVLink> */}
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ExportTransactions;
