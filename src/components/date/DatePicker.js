import React, { useState, useEffect } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";

function DatePicker({ setEndDate, setStartDate }) {
  const [selectedStartDate, setSelecteStartDate] = useState(new Date());
  const [selectedEndDate, setSelecteEndDate] = useState(new Date());
  const [newDate, setNewDate] = useState(0);
  const [newEndDate, setNewEndDate] = useState(0);
  const [clicked, setClicked] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
  });

  const handleStartDateChange = (date) => {
    setSelecteStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelecteEndDate(date);
  };

  useEffect(() => {
    setEndDate(selectedEndDate);
  }, [selectedEndDate, setEndDate]);

  useEffect(() => {
    setStartDate(selectedStartDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  // const handleAddDate = () => {
  //   setNewDate(newDate + 1)
  // }

  // const handleAddEndDate = () => {
  //   setNewEndDate(newEndDate + 1)
  // }

  const handleSubtractDate = () => {
    setNewDate(newDate - 1);
  }

  // const handleSubEndDate = () => {
  //   setNewEndDate(newEndDate - 1);
  // }

  useEffect(() => {
    selectedStartDate.setDate(selectedStartDate.getDate() + newDate);
    setSelecteStartDate(selectedStartDate);
    setNewDate(0);
    setStartDate(selectedStartDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDate]);

  useEffect(() => {
    selectedEndDate.setDate(selectedEndDate.getDate() + newEndDate);
    setSelecteEndDate(selectedEndDate);
    setNewEndDate(0);
    setEndDate(selectedEndDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEndDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className="pDateFilter">
        <div className="pDateFilter__item">
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            color={clicked.btn1 ? "secondary" : "info"}
            onClick={(prev) => (
              // eslint-disable-next-line
              setClicked({ ...prev, btn1: !clicked.btn1, btn2: false }),
              handleSubtractDate()
            )}
          >
            Yesterday
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            color={clicked.btn2 ? "info" : "secondary"}
            onClick={(prev) => setClicked({ ...prev, btn2: !clicked.btn2 })}
          >
            Today
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            color={clicked.btn3 ? "secondary" : "info"}
            onClick={(prev) => setClicked({ ...prev, btn3: !clicked.btn3, btn2: false })}
          >
            WTD
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            color={clicked.btn4 ? "secondary" : "info"}
            onClick={(prev) => setClicked({ ...prev, btn4: !clicked.btn4, btn2: false })}
          >
            MTD
          </Button>
          <Button
            variant="text"
            size="medium"
            className="pFontW600"
            color={clicked.btn5 ? "secondary" : "info"}
            onClick={(prev) => setClicked({ ...prev, btn5: !clicked.btn5, btn2: false })}
          >
            YTD
          </Button>
          {/* <Button variant="contained" size="large" color="primary"  onClick={handleSubtractDate}>-1 day</Button> */}
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
          {/* <Button variant="contained" size="large" color="primary"  onClick={handleAddDate}>+1 day</Button> */}

          {/* <Button variant="contained" size="large" color="primary" onClick={handleSubEndDate}>-1 day</Button> */}
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
          {/* <Button variant="contained" size="large" color="primary" onClick={handleAddEndDate}>+1 day</Button> */}
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
