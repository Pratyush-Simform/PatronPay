import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@mui/material/Modal";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { getConfigApi } from "../../services/orderApi";
// import { Context } from "../../store/Context"
import { useStyles } from "./styles";
import { getUsers } from "../../services/userApi";
import { addUserAssignment, editUserAssignment } from "../../services/userAssignmentApi";
import {Constants} from "../DndTable/Constants";

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: 250,
    },
  },
};

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

function UserAssignmentModal({ row, names}) {
  const classes = useStyles();

  const loginvalue = row && (row?.login_persistence === "No Login Required" ? "none" : (row?.login_persistence === "Require Username and Password" ? "full" : "password_only"))

  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState([]);
  // const [name, setName] = useState("");
  const [nameid, setNameId] = useState(row ? row?.pcf_id?.id : "");
  // const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserid, setSelectedUserId] = useState(row ? row?.tur_id?.id : "");
  const [loginOption, setLoginOption] = useState(row ? loginvalue : "");
  const [users, setUsers] = useState([]);
  // const [, dispatch] = useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      tur_id: row?.tur_id.id || "",
      pcf_id: row?.pcf_id.id || "",
      price_override_allowed: (row?.price_override_allowed === "Yes" ? true : false) || false,
      default_for_user: (row?.default_for_user === "Yes" ? true : false) || false,
      login_persistence: row?.login_persistence || "0",
      timeout: row?.timeout || "0",
      txn_receipt_receiver: "",
      password_required_after_timeout: (row?.password_required_after_timeout === "Yes" ? true : false) || false,
      transaction_access: (row?.transaction_access === "Yes" ? true : false) || false,
      is_deleted: (row && (row?.is_deleted === "Yes" ? false : true)) || false,
    },
    onSubmit: (values) => {
      const newPcf = {
        ...values,
        tur_id: selectedUserid,
        pcf_id: nameid,
        login_persistence: loginOption,
      };
      if(names === Constants.ADD) {
        addUserAssignment(newPcf)
        .then(() => {
          window.location.reload()
        setOpen(false)
        })
        .catch((err) => console.error(err));
      } else {
        editUserAssignment(row.id, newPcf)
        .then(() => {
          window.location.reload()
        setOpen(false)
        })
        .catch((err) => console.error(err));
      }
    },
  });

  const handleChange = (event, identifier) => {
    if (identifier === "name") {
      setNameId(event.target.value)
      // setName(event.target.value);
    } else if (identifier === "selected_user") {
      setSelectedUserId(event.target.value)
      // setSelectedUser(event.target.value);
    } else if (identifier === "login_persistence") {
      setLoginOption(event.target.value);
    }
  };

  useEffect(() => {
    if(open) {
      getConfigApi()
        .then((res) => setConfig(res.data.data.results))
        .catch(() => alert("Cannot load profile configurations"));

      getUsers()
      .then((res) => setUsers(res.data.data.results))
      .catch((err) => console.error(err));
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <span type="button" onClick={handleOpen}>
        {names ===  Constants.ADD ? <AddIcon /> : <EditIcon />}
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         <div className="paper pModal">
          <div className="pModal__header">
            <h2>{names ===  Constants.ADD ? "Add User Assignment" : "Edit User Assignment"}</h2>
          </div>
          <div className="pModal__body">
          <form onSubmit={formik.handleSubmit}>
          <div className="pRow">
            <div className="pCol pCol--col6 pCol--col-md-12">
            <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                  Select User
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={selectedUserid}
                  label="Select User"
                  onChange={(event) => handleChange(event, "selected_user")}
                  MenuProps={MenuProps}
                  required
                >
                  {users?.map((con) => (
                    <MenuItem value={con.id} key={con.email} onChange={formik.handleChange}>
                      {con.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="pCol pCol--col6 pCol--col-md-12">
              <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                  Select Mode
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={nameid}
                  label="Select Mode"
                  onChange={(event) => handleChange(event, "name")}
                  MenuProps={MenuProps}
                  required
                >
                  {config?.map((con) => (
                    <MenuItem value={con.id} key={con.id} onChange={formik.handleChange}>
                      {con.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </div>
            </div>
            <div className="pRow">
            <div className="pCol pCol--col12">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="price_override_allowed"
                    value={formik.values.price_override_allowed}
                    checked={formik.values.price_override_allowed}
                  />
                }
                label="Allow Price/Amount Override"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="default_for_user"
                    value={formik.values.default_for_user}
                    checked={formik.values.default_for_user}
                  />
                }
                label="Default mode for user"
              />
            </div>
            </div>
            <div className="pRow">
            <div className="pCol pCol--col6 pCol--col-md-12">
              <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                  Login Options
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={loginOption}
                  label="Login Options"
                  onChange={(event) => handleChange(event, "login_persistence")}
                  MenuProps={MenuProps}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="full">Require Username and Password</MenuItem>
                  <MenuItem value="password_only">Remember Username But Require Password</MenuItem>
                  <MenuItem value="none">No Login Required</MenuItem>
                </Select>
              </FormControl>
              </div>
              <div className="pCol pCol--col6 pCol--col-md-12">
              <TextField
                id="outlined-basic"
                label="Automatically logout after (mins)"
                variant="outlined"
                type="number"
                name="timeout"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.timeout}
                required
              />
            </div>
            </div>
            <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
                <TextField
                    id="outlined-basic"
                    label="Auto-send transaction receipt to"
                    variant="outlined"
                    name="txn_receipt_receiver"
                    placeholder="2027953213"
                    helperText="Don't include +1 at the beginning."
                    onChange={formik.handleChange}
                    value={formik.values.txn_receipt_receiver}
                />
                </div>
                <div className="pCol pCol--col6 pCol--col-md-12">
                    <FormControlLabel
                        control={
                        <Checkbox
                            onChange={formik.handleChange}
                            name="password_required_after_timeout"
                            value={formik.values.password_required_after_timeout}
                            checked={formik.values.password_required_after_timeout}
                        />
                        }
                        label="Password required after timeout"
                    />
                </div>
            </div>
            <div className="pRow">
              <div className="pCol pCol--col6 pCol--col-md-12">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="transaction_access"
                    value={formik.values.transaction_access}
                    checked={formik.values.transaction_access}
                  />
                }
                label="Transaction access"
              />
              </div>
              <div className="pCol pCol--col6 pCol--col-md-12">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="is_deleted"
                    value={formik.values.is_deleted}
                    checked={formik.values.is_deleted}
                  />
                }
                label="Inactive"
              />
            </div>
            </div>
            <div className="profileSubmitBtn">
              <Button variant="contained" color="primary" size="large" type="submit">
                Submit
              </Button>
            </div>
          </form>
          </div>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default UserAssignmentModal;
