import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

function DatePicker({setEndDate, setStartDate}) {
  const [selectedStartDate, setSelecteStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelecteEndDate] = React.useState(new Date());
  const [newDate, setNewDate] = React.useState(0)
  const [newEndDate, setNewEndDate] = React.useState(0)

  const handleStartDateChange = (date) => {
    setSelecteStartDate(date);
  };

  const handleEndDateChange = (date) => {
      setSelecteEndDate(date);
  }

  useEffect(() => {
    setEndDate(selectedEndDate)
  }, [selectedEndDate, setEndDate])

  useEffect(() => {
    setStartDate(selectedStartDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate])

  // const handleAddDate = () => {
  //   setNewDate(newDate + 1)
  // }

  // const handleAddEndDate = () => {
  //   setNewEndDate(newEndDate + 1)
  // }

  // const handleSubtractDate = () => {
  //   setNewDate(newDate - 1);
  // }

  // const handleSubEndDate = () => {
  //   setNewEndDate(newEndDate - 1);
  // }

  useEffect(() => {
    selectedStartDate.setDate(selectedStartDate.getDate() + newDate)
    setSelecteStartDate(selectedStartDate)
    setNewDate(0)
    setStartDate(selectedStartDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDate])

  useEffect(() => {
    selectedEndDate.setDate(selectedEndDate.getDate() + newEndDate)
    setSelecteEndDate(selectedEndDate)
    setNewEndDate(0)
    setEndDate(selectedEndDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEndDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className="pDateFilter">
        <div className="pDateFilter__item">
          <Button variant="text" size="medium" className="pFontW600" color="info">Yesterday</Button>
          <Button variant="text" size="medium" className="pFontW600" color="secondary">Today</Button>
          <Button variant="text" size="medium" className="pFontW600" color="info">WTD</Button>
          <Button variant="text" size="medium" className="pFontW600" color="info">MTD</Button>
          <Button variant="text" size="medium" className="pFontW600" color="info">YTD</Button>
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
              'aria-label': 'change date',
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
              'aria-label': 'change date',
            }}
          />
          {/* <Button variant="contained" size="large" color="primary" onClick={handleAddEndDate}>+1 day</Button> */}
          </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;