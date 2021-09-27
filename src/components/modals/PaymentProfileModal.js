import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function PaymentProfileModal() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      description: "",
      profileMode: "",
      enableOtherAmount: false,
      enablePriceDetails: false,
      enableTips: false,
      otherAmountTax: 0,
      tipButton1: 0,
      tipButton2: 0,
      tipButton3: 0,
      defaultTip: 0,
      tipTax: 0,

    }
  })

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Profle
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Profile Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Profile Mode"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Enable Other $ Amount"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Enable Price/Amount Details "
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Enable Tips"
            />
            <TextField
              type="number"
              id="outlined-basic"
              label="Other $ Amount Tax %: "
              variant="outlined"
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Tip Button #1 (%)"
              variant="outlined"
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Tip Button #2 (%)"
              variant="outlined"
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Tip Button #3 (%)"
              variant="outlined"
              type="number"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Default Tip
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Default Tip"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Tip Tax"
              variant="outlined"
              type="number"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Prompt for receipt"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Ask for customer name?"
            />
          </div>
          <h3>CLUB MEMBER PAYMENTS</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Pay by account number"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Require first name"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Require last name"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained">Submit</Button>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Active"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Dbg upl log lvl:</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Dbg upl log lvl:"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Dbg upl scheme:</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Dbg upl scheme:"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PaymentProfileModal;
