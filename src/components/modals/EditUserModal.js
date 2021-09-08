import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
// import Input from "../input/input";
// import Button from "../input/Button";
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import "../../App.css";
import { useStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import { addUsers, editUsers } from "../../services/userApi"

function EditUserModal({ row, name }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: row?.email ? row.email : "",
      first_name: row?.first_name ? row.first_name : "",
      last_name: row?.last_name ? row.last_name : "",
      password: "",
    },
    onSubmit: (values) => {
     if(name === "ADD") {
         addUsers(values)
         setOpen(false);
         window.location.reload();
     }else {
         editUsers(row.id, values)
         setOpen(false);
         window.location.reload();
     }
    },
  });
  return (
    <div>
      <span type="button" onClick={handleOpen}>
        {name === "ADD" ? <AddIcon /> : <EditIcon />}
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
          <div className="paper">
            {name === "ADD" ? (
              <h2 id="transition-modal-title">Add Users</h2>
            ) : (
              <h2 id="transition-modal-title">Edit Users</h2>
            )}
            <div className="addMod">
              <form onSubmit={formik.handleSubmit}>
                <div style={{ display: "block" }}>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    type="text"
                    label="Email"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
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
                <div className="profileSubmitBtn">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditUserModal;
