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
import EditModal from "../modals/EditModal";
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
        {label: "Configuration Type", key: "config_type"},
        {label: "Name", key: "name"}
      ],
      columnData: [],
      page: 0,
      rowsPerPage: 15,
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
    console.log(this.state.columnData);

    this.setState({
      columnData: columnData,
    });
    console.log(this.props);
    if (this.props.name === "Transaction") {
      localStorage.setItem("Tcols", JSON.stringify(this.state.columnData));
    } else if (this.props.name === "Payment Profiles") {
      localStorage.setItem("Pcols", JSON.stringify(this.state.columnData));
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
    console.log(this.props.data);
    const columnData = localStorage.getItem("Cols");
    const tableColdata = localStorage.getItem("Tcols");
    const profileColData = localStorage.getItem("Pcols")
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
            : tableColdata
            ? JSON.parse(tableColdata)
            : this.props.columnData,
      },
      () => {}
    );
    console.log(this.state);
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
    } else if(this.props.name === "Payment Profiles") {
      title = "Payment Profiles";
      const headers = [["Name", "Configuration Type"]];

      const data = this.props.data.map((elt) => [
        elt.name,
        elt.config_type,
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
    console.log(date);
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
    console.log(date);
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

  render() {
    const { classes, data, name } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, renderer } =
      this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className="searchBox">
        <EnhancedTableToolbar
          title={name}
          numSelected={selected.length}
          items={this.props.data}
          searchedData={this.searchedFunc}
        />
        {name === "Transaction" ? (
          <DatePicker
            setEndDate={this.setEndDate}
            setStartDate={this.setStartDate}
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
            <span className="btnMargin">
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
                    <ExcelColumn label="Configuration Type" value="config_type" />
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
                                    <div className="toolHead">
                                      {/* <CashlessTrans name="Cashless Transaction" data={data}/> */}
                                      <EditModal row={n} />
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
                                    <div className="toolHead">
                                      {/* <CashlessTrans name="Cashless Transaction" data={data}/> */}
                                      {this.props.name === "Transaction" ? (
                                        <EditModal row={n} />
                                      ) : null}
                                    </div>
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
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
