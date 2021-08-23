import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import Button from "@material-ui/core/Button"

function DatePicker({setEndDate, setStartDate}) {
  // The first commit of Material-UI
  const [selectedStartDate, setSelecteStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelecteEndDate] = React.useState(new Date());


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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
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
        <KeyboardDatePicker
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
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;