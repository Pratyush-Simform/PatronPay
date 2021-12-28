import React, { useState } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";

function DatePicker({ setDateSelect, setButtonFilter }) {
  const [selectedStartDate, setSelecteStartDate] = useState(new Date());
  const [selectedEndDate, setSelecteEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setSelecteStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelecteEndDate(date);
  };

  // Yesterday, Today and WTD
  const handleDayschange = (d) => {
    setSelecteEndDate(new Date())
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - d);
    setSelecteStartDate(startDate)
    setButtonFilter(startDate, new Date());
  }

  // MTD
  const handleMTD = () => {
    setSelecteEndDate(new Date())
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    setSelecteStartDate(startDate)
    setButtonFilter(startDate, new Date());
  }

  //YTD
  const handleYTD = () => {
    setSelecteEndDate(new Date())
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    setSelecteStartDate(startDate)
    setButtonFilter(startDate, new Date());
  }

  // Datepicker
  const handleDateSubmit = () => {
    setDateSelect(selectedStartDate,selectedEndDate);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className="pDateFilter">
        <div className="pDateFilter__item">
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            // color={clicked.btn1 ? "secondary" : "info"}
            onClick={() => handleDayschange(1)}
          >
            Yesterday
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            // color={clicked.btn2 ? "info" : "secondary"}
            onClick={() => handleDayschange(0)}
          >
            Today
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            // color={clicked.btn3 ? "secondary" : "info"}
            onClick={() => handleDayschange(7)}
          >
            WTD
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            // color={clicked.btn4 ? "secondary" : "info"}
            onClick={() => handleMTD()}
          >
            MTD
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            // color={clicked.btn5 ? "secondary" : "info"}
            onClick={() => handleYTD()}
          >
            YTD
          </Button>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start Date"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            id="date-picker-dialog"
            label="End Date"
            format="MM/dd/yyyy"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <Button variant="contained" size="medium" color="primary" onClick={handleDateSubmit}>Submit</Button>
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
