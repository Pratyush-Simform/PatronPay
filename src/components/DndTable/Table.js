import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import TablePagination from "@material-ui/core/TablePagination";
import EditUserModal from "../modals/EditUserModal";
import "../../App.css";
import ReactExport from "react-data-export";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import DatePicker from "../date/DatePicker";
import Dropdown from "../input/Dropdown";
import Button from "@material-ui/core/Button";
import { styles } from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUsers, getUsers } from "../../services/userApi";
import { withContext } from "../../store/WithContext";
import Snackbar from "@material-ui/core/Snackbar";
import ExportTransactions from "../modals/ExportTranactions";
import AddModal from "../modals/AddModal";
import  ImportFile  from "../modals/ImportFile";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super();

    this.state = {
      open: false,
      order: "asc",
      orderBy: "calories",
      selected: [],
      renderer: [],
      datacopy: [],
      updatedCol: [],
      columnDataCopy: [],
      transactionHeader: [
        { label: "Date/time", key: "newDate" },
        { label: "Payment Url", key: "payment_url" },
        { label: "Transaction type", key: "trs_type" },
        { label: "Settled", key: "settled" },
        { label: "No of Items", key: "noOfItems" },
      ],
      profileItemsHeader: [
        { label: "Barcode", key: "barcode" },
        { label: "Description", key: "description" },
        { label: "Short Name", key: "short_name" },
        { label: "Price", key: "price" },
      ],
      paymentProfileHeader: [
        { label: "Configuration Type", key: "config_type" },
        { label: "Name", key: "name" },
      ],
      memberPaymentsHeader: [
        { label: "Amount", key: "amount" },
        { label: "Card number", key: "card_number" },
        { label: "Currency", key: "currency" },
        { label: "Name", key: "first_name" },
        { label: "Tip", key: "tip" },
        { label: "Tax", key: "tax" },
        { label: "Tip Tax", key: "tip_tax" },
        { label: "Transaction Type", key: "txn_type" },
      ],
      cashPaymentsHeader: [
        { label: "Amount", key: "amount" },
        { label: "Currency", key: "currency" },
        { label: "Tip", key: "tip" },
        { label: "Tax", key: "tax" },
        { label: "Tip Tax", key: "tip_tax" },
        { label: "Transaction Type", key: "txn_type" },
      ],
      cashlessPaymentsHeader: [
        { label: "Amount", key: "amount_auth" },
        { label: "Card type", key: "card_type" },
        { label: "Currency", key: "currency" },
        { label: "Name", key: "first_name" },
        { label: "Tip", key: "tip" },
        { label: "Tax", key: "tax" },
        { label: "Tip Tax", key: "tip_tax" },
        { label: "Transaction Type", key: "txn_type" },
      ],
      users: [
        { label: "Email", key: "email" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
      ],
      snackbar: false,
      vertical: "top",
      horizontal: "center",
      snackMsg: "",
      columnData: [],
      page: 0,
      rowsPerPage: 6,
      amount_auth_total: 0,
      tip_total: 0,
      tip_tax_total: 0,
      amount_total: 0,
    };
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const columnData = reorder(
      this.state.columnData,
      result.source.index,
      result.destination.index
    );

    this.setState({
      columnData: columnData,
    });
    if (this.props.name === "Transaction") {
      localStorage.setItem("Tcols", JSON.stringify(this.state.columnData));
    } else if (this.props.name === "Payment Profiles") {
      localStorage.setItem("Pcols", JSON.stringify(this.state.columnData));
    } else if (this.props.name === "Membership Payments") {
      localStorage.setItem("MemCols", JSON.stringify(this.state.columnData));
    } else if (this.props.name === "Cashless Payments") {
      localStorage.setItem(
        "CashlessCols",
        JSON.stringify(this.state.columnData)
      );
    } else localStorage.setItem("Cols", JSON.stringify(this.state.columnData));
  };
  handleWidthChange = (columnId, width) => {
    this.setState((state) => {
      const currentColumns = state.columnData;
      const currentColumnIndex = currentColumns.findIndex((column) => {
        return column.id === columnId;
      });
      const columnToChange = currentColumns[currentColumnIndex];
      const changedColumn = { ...columnToChange, width };
      currentColumns.splice(currentColumnIndex, 1, changedColumn);
      const newState = {
        columnData: currentColumns,
      };
      return newState;
    });
  };

  handleArrayMove = (from, to, oldData) => {
    const newData = [].concat(oldData);
    from >= to
      ? newData.splice(to, 0, newData.splice(from, 1)[0])
      : newData.splice(to - 1, 0, newData.splice(from, 1)[0]);

    return newData;
  };

  handleReorderColumn = (from, to) => {
    this.setState((state) => {
      return {
        columnData: this.handleArrayMove(from, to, state.columnData),
        data: this.handleArrayMove(from, to, state.data),
      };
    });
  };

  // material-ui code
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.props.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.data.map((n) => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  componentDidMount() {
    const columnData = localStorage.getItem("Cols");
    const tableColdata = localStorage.getItem("Tcols");
    const profileColData = localStorage.getItem("Pcols");
    const memberCols = localStorage.getItem("MemCols");
    const cashlessCols = localStorage.getItem("CashlessCols");
    this.setState(
      {
        dataCopy: this.props.data,
        renderer: this.props.data,
        ...(columnData && { columnData: JSON.parse(columnData) }),
        columnData:
          this.props.name === "Profile Items"
            ? columnData
              ? JSON.parse(columnData)
              : this.props.columnData
            : this.props.name === "Payment Profiles"
            ? profileColData
              ? JSON.parse(profileColData)
              : this.props.columnData
            : this.props.name === "Membership Payments"
            ? memberCols
              ? JSON.parse(memberCols)
              : this.props.columnData
            : this.props.name === "CashLess Payments"
            ? cashlessCols
              ? JSON.parse(cashlessCols)
              : this.props.columnData
            : tableColdata
            ? JSON.parse(tableColdata)
            : this.props.columnData,
      },
      () => {}
    );
    const reduceAmountData = this.props?.data?.map((rd) => rd.amount);
    const reduceAmountAuthData = this.props?.data?.map((rd) => rd.amount_auth);
    const reduceTipData = this.props?.data.map((rt) => rt.tip);
    const reduceTipTaxTotal = this.props?.data.map((rtt) => rtt.tip_tax);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const ReduceData =
      reduceAmountData.length > 0 && reduceAmountData.reduce(reducer);
    const ReduceTipData =
      reduceTipData.length > 0 && reduceTipData.reduce(reducer);
    const ReduceAmountAuth =
      reduceAmountAuthData.length > 0 && reduceAmountAuthData.reduce(reducer);
    const ReduceTipTaxData =
      reduceTipTaxTotal.length > 0 && reduceTipTaxTotal.reduce(reducer);
    this.setState({
      amount_total: ReduceData,
      amount_auth_total: ReduceAmountAuth,
      tip_total: ReduceTipData,
      tip_tax_total: ReduceTipTaxData,
    });
  }

  searchedFunc = (input) => {
    if (input.length > 0) {
      this.setState({
        renderer: input,
      });
    } else {
      this.setState({
        renderer: this.state.dataCopy,
      });
    }
  };

  exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    let title = "";
    let content = {};
    if (this.props.name === "Transaction") {
      title = "Transaction";
      const headers = [
        [
          "Date/time",
          "Payment Url",
          "Transaction type",
          "Settled",
          "No of Items",
        ],
      ];

      const data = this.props.data.map((elt) => [
        elt.newDate,
        elt.payment_url,
        elt.trs_type,
        elt.settled,
        elt.noOfItems,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Profile Items") {
      title = "Profile Items";
      const headers = [["Barcode", "Description", "Short Name", "Price"]];

      const data = this.props.data.map((elt) => [
        elt.barcode,
        elt.description,
        elt.short_name,
        elt.price,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Payment Profiles") {
      title = "Payment Profiles";
      const headers = [["Name", "Configuration Type"]];

      const data = this.props.data.map((elt) => [elt.name, elt.config_type]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Membership Payments") {
      title = "Membership Payments";
      const headers = [
        [
          "Amount",
          "Card Number",
          "Curremcy",
          "Name",
          "Tip",
          "Tax",
          "Tip Tax",
          "Transaction Type",
        ],
      ];
      const data = this.props.data.map((elt) => [
        elt.amount,
        elt.card_number,
        elt.currency,
        elt.first_name,
        elt.tip,
        elt.tax,
        elt.tip_tax,
        elt.txn_type,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Cash Payments") {
      const headers = [
        ["Amount", "Curremcy", "Tip", "Tax", "Tip Tax", "Transaction Type"],
      ];
      const data = this.props.data.map((elt) => [
        elt.amount,
        elt.currency,
        elt.tip,
        elt.tax,
        elt.tip_tax,
        elt.txn_type,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Cashless Payments") {
      const headers = [
        [
          "Amount",
          "Card Type",
          "Currency",
          "Name",
          "Tip",
          "Tax",
          "Tip Tax",
          "Transaction Type",
        ],
      ];
      const data = this.props.data.map((elt) => [
        elt.amount_auth,
        elt.card_type,
        elt.currency,
        elt.first_name,
        elt.tip,
        elt.tax,
        elt.tip_tax,
        elt.txn_type,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    } else if (this.props.name === "Users") {
      const headers = [["email", "first_name", "last_name"]];
      const data = this.props.data.map((elt) => [
        elt.email,
        elt.first_name,
        elt.last_name,
      ]);

      content = {
        startY: 50,
        head: headers,
        body: data,
      };
    }

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  setStartDate = (date) => {
    let createdDate = this.props.data.map((i) => {
      return {
        date: new Date(i.date_created).getDate(),
        id: i.id,
        url: i.payment_url,
        type: i.trs_type,
      };
    });

    let filteredDates = createdDate.filter((fd) => {
      return fd.date < date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setEndDate = (date) => {
    let endDate = this.props.data.map((j) => {
      return {
        date: new Date(j.date_modified).getDate(),
        id: j.id,
        url: j.payment_url,
        type: j.trs_type,
      };
    });

    let filteredDates = endDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  selectedData = (data) => {
    const filLogs = [];
    data?.forEach((element) => {
      const a = this.state.columnData.filter((j) => j.id.includes(element));
      filLogs.push(...a);
    });
    if (filLogs.length > 0) {
      this.setState({
        columnDataCopy: filLogs,
      });
    }
  };

  columnRender = () => {
    if (this.state.columnDataCopy.length > 0) {
      return this.state.columnDataCopy;
    } else if (this.props.name === "Transaction") {
      return this.state.columnData;
    } else {
      return this.state.columnData;
    }
  };

  setMemEndDate = (date) => {
    const endDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_created).getDate(),
        amount: sd.amount,
        card_number: sd.card_number,
        first_name: sd.first_name,
        last_name: sd.last_name,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = endDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setMemStartDate = (date) => {
    const startDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_modified).getDate(),
        amount: sd.amount,
        card_number: sd.card_number,
        first_name: sd.first_name,
        last_name: sd.last_name,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = startDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setCashlessStartDate = (date) => {
    const startDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_modified).getDate(),
        amount_auth: sd.amount_auth,
        card_type: sd.card_type,
        cc_last4: sd.cc_last4,
        currency: sd.currency,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = startDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setCashlessEndDate = (date) => {
    const startDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_created).getDate(),
        amount_auth: sd.amount_auth,
        card_type: sd.card_type,
        cc_last4: sd.cc_last4,
        currency: sd.currency,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = startDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setCashStartDate = (date) => {
    const startDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_created).getDate(),
        amount: sd.amount,
        currency: sd.currency,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = startDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  setCashEndDate = (date) => {
    const startDate = this.props.data.map((sd) => {
      return {
        date: new Date(sd.date_modified).getDate(),
        amount: sd.amount,
        currency: sd.currency,
        tip: sd.tip,
        tip_tax: sd.tip_tax,
        txn_type: sd.txn_type,
      };
    });
    let filteredDates = startDate.filter((fd) => {
      return fd.date > date.getDate();
    });
    this.setState({
      renderer: filteredDates,
    });
  };

  handleDelete = (row) => {
    deleteUsers(row.id).then(() =>
      getUsers()
        .then((res) =>
          this.setState({
            renderer: res.data.data.results,
            snackbar: true,
            snackMsg: "User Deleted Succesfully",
          })
        )
        .catch(() =>
          this.setState({ snackbar: true, snackMsg: "Could Delete User" })
        )
    );
  };

  handleClose = () => {
    this.setState({ snackbar: false });
  };

  render() {
    const { classes, data, name } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      renderer,
      amount_auth_total,
      amount_total,
      tip_total,
      tip_tax_total,
      vertical,
      horizontal,
      snackbar,
      snackMsg,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className="searchBox">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbar}
          onClose={this.handleClose}
          message={snackMsg}
          key={vertical + horizontal}
        />
        <EnhancedTableToolbar
          title={name}
          numSelected={selected.length}
          items={data}
          searchedData={this.searchedFunc}
        />
        {name === "Transaction" ? (
          <DatePicker
            setEndDate={this.setEndDate}
            setStartDate={this.setStartDate}
          />
        ) : name === "Membership Payments" ? (
          <DatePicker
            setEndDate={this.setMemEndDate}
            setStartDate={this.setMemStartDate}
          />
        ) : name === "Cashless Payments" ? (
          <DatePicker
            setEndDate={this.setCashlessEndDate}
            setStartDate={this.setCashlessStartDate}
          />
        ) : name === "Cash Payments" ? (
          <DatePicker
            setEndDate={this.setCashEndDate}
            setStartDate={this.setCashStartDate}
          />
        ) : null}
        <div className={classes.tableWrapper}>
          <span className="drpDwn">
            <Dropdown
              data={data}
              selectedData={(data) => this.selectedData(data)}
            />
          </span>
          <div className="buttonGrp">
            {name === "Transction" ? <ExportTransactions data={data} /> : null}
            <ImportFile />
            <span className="btnMargin">
              {name === "Profile Items" ? (
                 <CSVLink
                 data={this.props.data}
                 headers={this.state.profileItemsHeader}
               >
                <Button variant="contained">Export All</Button>
                </CSVLink>
              ) : null}
              <ExcelFile
                element={<Button variant="contained">Download Execl</Button>}
              >
                {name === "Transction" ? (
                  <ExcelSheet data={this.props.data} name="Transction">
                    <ExcelColumn label="Date/time" value="newDate" />
                    <ExcelColumn label="Payment Url" value="payment_url" />
                    <ExcelColumn label="Transaction type" value="trs_type" />
                    <ExcelColumn label="Settled" value="settled" />
                    <ExcelColumn label="No of Items" value="noOfItems" />
                  </ExcelSheet>
                ) : name === "Profile Items" ? (
                  <ExcelSheet data={this.props.data} name="Profile Items">
                    <ExcelColumn label="Barcode" value="barcode" />
                    <ExcelColumn label="Description" value="description" />
                    <ExcelColumn label="Short Name" value="short_name" />
                    <ExcelColumn label="Price" value="price" />
                  </ExcelSheet>
                ) : name === "Payment Profiles" ? (
                  <ExcelSheet data={this.props.data} name="Payment Profile">
                    <ExcelColumn label="Name" value="name" />
                    <ExcelColumn
                      label="Configuration Type"
                      value="config_type"
                    />
                  </ExcelSheet>
                ) : name === "Membership Payments" ? (
                  <ExcelSheet data={this.props.data} name="Membership Payments">
                    <ExcelColumn label="Amount" value="amount" />
                    <ExcelColumn label="Card number" value="card_number" />
                    <ExcelColumn label="Currency" value="currency" />
                    <ExcelColumn label="Name" value="first_name" />
                    <ExcelColumn label="Tip" value="tip" />
                    <ExcelColumn label="Tax" value="tax" />
                    <ExcelColumn label="Tip Tax" value="tip_tax" />
                    <ExcelColumn label="Transaction Type" value="txn_type" />
                  </ExcelSheet>
                ) : name === "Cash Payments" ? (
                  <ExcelSheet data={this.props.data} name="Cash Payments">
                    <ExcelColumn label="Amount" value="amount" />
                    <ExcelColumn label="Currency" value="currency" />
                    <ExcelColumn label="Tip" value="tip" />
                    <ExcelColumn label="Tax" value="tax" />
                    <ExcelColumn label="Tip Tax" value="tip_tax" />
                    <ExcelColumn label="Transaction Type" value="txn_type" />
                  </ExcelSheet>
                ) : name === "Cashless Payments" ? (
                  <ExcelSheet data={this.props.data} name="Cashless Payments">
                    <ExcelColumn label="Amount" value="amount_auth" />
                    <ExcelColumn label="Card Type" value="card_type" />
                    <ExcelColumn label="Currency" value="currency" />
                    <ExcelColumn label="Name" value="first_name" />
                    <ExcelColumn label="Tip" value="tip" />
                    <ExcelColumn label="Tax" value="tax" />
                    <ExcelColumn label="Tip Tax" value="tip_tax" />
                    <ExcelColumn label="Transaction Type" value="txn_type" />
                  </ExcelSheet>
                ) : name === "Users" ? (
                  <ExcelSheet data={this.props.data} name="Users">
                    <ExcelColumn label="Email" value="email" />
                    <ExcelColumn label="First Name" value="first_name" />
                    <ExcelColumn label="Last Name" value="last_name" />
                  </ExcelSheet>
                ) : null}
              </ExcelFile>
            </span>
            <Button
              className="btnMargin"
              onClick={() => this.exportPDF()}
              variant="contained"
            >
              Generate pdf
            </Button>
            <span className="btnMargin">
              {name === "Transaction" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.transactionHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Profile Items" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.profileItemsHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Payment Profiles" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.paymentProfileHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Membership Payments" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.memberPaymentsHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Cash Payments" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.cashPaymentsHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Cashless Payments" ? (
                <CSVLink
                  data={this.props.data}
                  headers={this.state.cashlessPaymentsHeader}
                >
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : name === "Users" ? (
                <CSVLink data={this.props.data} headers={this.state.users}>
                  <Button variant="contained">Download csv</Button>
                </CSVLink>
              ) : null}
            </span>
          </div>
          <Table
            table-layout="fixed"
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                <TablePagination
                  component="div"
                  count={this.props.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page",
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page",
                  }}
                  rowsPerPageOptions={[15, 25, 50]}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableHead>
            <EnhancedTableHead
              handleReorderColumnData={this.onDragEnd}
              handleResizeColumn={this.handleWidthChange}
              columnData={this.columnRender()}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            {data.length > 0 ? (
              <TableBody>
                {renderer.length
                  ? renderer
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((n) => {
                        const isSelected = this.isSelected(n.id);
                        return (
                          <TableRow
                            hover
                            onClick={(event) => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                          >
                            <td className="tableDir">
                              <Table className="table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell padding="checkbox">
                                      <Checkbox checked={isSelected} />
                                    </TableCell>
                                    {this.columnRender().map((column) => {
                                      return column.numeric ? (
                                        <>
                                          <TableCell
                                            key={column.id}
                                            padding="none"
                                            width={
                                              `${column.width}px` || "100px"
                                            }
                                            // numeric
                                          >
                                            <div
                                              width={
                                                `${column.width}px` || "100px"
                                              }
                                              className="tableWidth"
                                            >
                                              {console.log(n[column.id], 929)}
                                              {n[column.id]}
                                            </div>
                                          </TableCell>
                                          {/* <TableCell><image src={n.icon} /></TableCell> */}
                                        </>
                                      ) : (
                                        <TableCell
                                          key={column.id}
                                          padding="none"
                                          width={`${column.width}px` || "100px"}
                                        >
                                          <div
                                            style={{
                                              width:
                                                `${column.width}px` || "100px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              // wordBreak: "break-all",
                                              // wordWrap: "break-word"
                                            }}
                                          >
                                            {n[column.id]}
                                          </div>
                                        </TableCell>
                                      );
                                    })}
                                    <div className="toolHead">
                                      {/* <CashlessTrans name="Cashless Transaction" data={data}/> */}
                                      <EditUserModal row={n} />
                                      <DeleteIcon
                                        onClick={() => this.handleDelete(n)}
                                      />
                                    </div>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </td>
                          </TableRow>
                        );
                      })
                  : data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((n) => {
                        const isSelected = this.isSelected(n.id);
                        return (
                          <TableRow
                            hover
                            onClick={(event) => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                          >
                            <td className="tableDir">
                              <Table className="table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell padding="checkbox">
                                      <Checkbox checked={isSelected} />
                                    </TableCell>
                                    {this.columnRender()?.map((column) => {
                                      return column.numeric ? (
                                        <TableCell
                                          key={column.id}
                                          padding="none"
                                          width={`${column.width}px` || "100px"}
                                          // numeric
                                        >
                                          <div
                                            width={
                                              `${column.width}px` || "100px"
                                            }
                                            className="tableWidth"
                                          >
                                            {n[column.id]}
                                          </div>
                                        </TableCell>
                                      ) : (
                                        <TableCell
                                          key={column.id}
                                          padding="none"
                                          width={`${column.width}px` || "100px"}
                                        >
                                          <div
                                            style={{
                                              width:
                                                `${column.width}px` || "100px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              // wordBreak: "break-all",
                                              // wordWrap: "break-word"
                                            }}
                                          >
                                            {n[column.id]}
                                          </div>
                                        </TableCell>
                                      );
                                    })}
                                    {name === "Users" ? (
                                      <div className="toolHead">
                                        {/* <CashlessTrans name="Cashless Transaction" data={data}/> */}
                                        <EditUserModal row={n} />
                                        <DeleteIcon
                                          onClick={() => this.handleDelete(n)}
                                        />
                                      </div>
                                    ) : name === "Profile Items" ? (
                                      <div className="toolHead">
                                        <AddModal row={n} />
                                        <DeleteIcon />
                                      </div>
                                    ) : null}
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </td>
                          </TableRow>
                        );
                      })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <div className="spinner">
                <CircularProgress />
              </div>
            )}
          </Table>
          {name === "Transaction" ||
          name === "Payment Profiles" ||
          name === "Profile Items" ||
          name === "Users" ? null : (
            <div className="totals">
              {name === "Cashless Payments" ? (
                <h3>Amount: {amount_auth_total}</h3>
              ) : (
                <h3>Amount Total: {amount_total} </h3>
              )}
              <h3>Tip: {tip_total}</h3>
              <h3>Tip Tax: {tip_tax_total}</h3>
            </div>
          )}
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(EnhancedTable));
