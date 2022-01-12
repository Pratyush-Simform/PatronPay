import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import "../../App.css";
import { useStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import { addUsers, editUsers } from "../../services/userApi"
import {Constants} from "../DndTable/Constants"
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function EditUserModal({ row, name }) {
  const classes = useStyles();
  const [snackState, setsnackState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const [snackMsg, setSnackMsg] = React.useState("")
  const { vertical, horizontal } = snackState;
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setsnackState({ ...snackState, open: false });
  };

  const formik = useFormik({
    initialValues: {
      email: row?.email || "",
      first_name: row?.first_name || "",
      last_name: row?.last_name || "",
      password: "",
      is_superuser: row?.is_superuser === "No" ? false : true || false,
      is_active: row?.active === "No" ? false : true || false,
      can_use_portal: row?.can_use_portal === "No" ? false : true || false,
      can_use_terminal: row?.can_use_terminal === "No" ? false : true || false,
      manual_card_entry: row?.manual_card_entry === "No" ? false : true || false,
    },
    onSubmit: (values) => {
     if(name === Constants.ADD) {
         addUsers(values).then(() => window.location.reload()
        //  getUsers()
        //  .then((res) => dispatch({type: "USER_DATA", payload:res.data.data.results}))
         )
         .catch(() => setSnackMsg("Cannot Create User"), setSnackbar(true))
         setSnackMsg("User Created Succesfully")
         setSnackbar(true)
         setOpen(false);
     }else {
         editUsers(row.id, values)
         .then(() => window.location.reload())
         .catch(() => setSnackMsg("Cannot Edit User"), setSnackbar(true))
         setSnackMsg("User Edited Succesfully")
         setSnackbar(true)
         setOpen(false);
     }
    },
  });
  return (
    <>
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        onClose={handleSnackClose}
        message={snackMsg}
        key={vertical + horizontal}
      />
      <span type="button" onClick={handleOpen}>
        {name ===  Constants.ADD ? <AddIcon /> : <EditIcon />}
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.editModal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper pModal">
            <div className="pModal__header">
              {name === Constants.ADD ? (
                <h2 id="transition-modal-title">Add Users</h2>
              ) : (
                <h2 id="transition-modal-title">Edit Users</h2>
              )}
            </div>
            <div className="pModal__body">
              <form onSubmit={formik.handleSubmit}>
              <div className="pRow">
                <div className="pCol pCol--col12">
                  <TextField
                    id="outlined-basic"
                    name="email"
                    type="text"
                    label="Email"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="text"
                  />
                </div>
              </div>
                  <div className="pRow">
                    <div className="pCol pCol--col6 pCol--col-md-12">
                    <TextField
                      id="outlined-basic"
                      name="first_name"
                      type="text"
                      label="First Name"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                    />
                    </div>
                    <div className="pCol pCol--col6 pCol--col-md-12">
                    <TextField
                      lid="outlined-basic"
                      name="last_name"
                      type="text"
                      label="Last Name"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                    />
                    </div>
                  </div>
                  <div className="pRow">
                  <div className="pCol pCol--col12">
                  <TextField
                    lid="outlined-basic"
                    name="password"
                    type="text"
                    label="Password"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  </div>
                  </div>
                  <div className="pRow">
                    <div className="pCol pCol--col12">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            name="is_superuser"
                            value={formik.values.is_superuser}
                            checked={formik.values.is_superuser}
                          />
                        }
                        label="Admin User"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            name="is_active"
                            value={formik.values.is_active}
                            checked={formik.values.is_active}
                          />
                        }
                        label="Active"
                      />
                    </div>
                  </div>
                  <div className="pRow">
                    <div className="pCol pCol--col12">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            name="can_use_terminal"
                            value={formik.values.can_use_terminal}
                            checked={formik.values.can_use_terminal}
                          />
                        }
                        label="Can Use Terminal"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            name="manual_card_entry"
                            value={formik.values.manual_card_entry}
                            checked={formik.values.manual_card_entry}
                          />
                        }
                        label="Manual Card Entry"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            name="can_use_portal"
                            value={formik.values.can_use_portal}
                            checked={formik.values.can_use_portal}
                          />
                        }
                        label="Can Use Web"
                      />
                    </div>
                  </div>
                <div className="profileSubmitBtn">
                  {/* <button className="btn" type="submit">Submit</button> */}
                  <Button variant="contained" color="primary" size="large" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default React.memo(EditUserModal);
