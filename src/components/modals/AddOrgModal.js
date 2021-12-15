import React, {useContext} from "react";
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
import { Context } from "../../store/Context";
import {Constants} from "../DndTable/Constants"
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from "@mui/material";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { getTenantInfo, editTenantInfo, addTenantInfo } from "../../services/myorganisationApis";


function AddOrganization({ row, name }) {
  const classes = useStyles();
  const [snackState, setsnackState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const [snackMsg, setSnackMsg] = React.useState("")
  const { vertical, horizontal } = snackState;
  const [open, setOpen] = React.useState(false);
  const [, dispatch] = useContext(Context)
  const [snackbar, setSnackbar] = React.useState(false)
  const [image, setImage] = React.useState()

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
      logo: row?.logo || "",
      contact_email: row?.contact_email || "",
      contact_name: row?.contact_name || "",
      contact_address: row?.contact_address || "",
      contact_phone_number: row?.contact_phone_number || "",
    },
    onSubmit: (values) => {
      const newPcf = {
        ...values,
        logo: image,
      }
      let form_data = new FormData();
      for (let key in newPcf) {
        form_data.append(key, newPcf[key]);
      }
     if(name === Constants.ADD) {
         addTenantInfo(form_data).then(() => getTenantInfo()
         .then((res) => {
            const newDataSource = res.data.data.results.map((temp) =>{ 
              temp["logo"] = <img alt="img" src={temp.logo} />;
              return temp;
          });
          dispatch({ type: "MY_ORGANIZATIONS", payload: newDataSource })}))
         .catch(() => setSnackMsg("Cannot Create Organization"), setSnackbar(true))
         setSnackMsg("Organization Created Succesfully")
         setSnackbar(true)
         setOpen(false);
     }else {
         editTenantInfo(row.id, form_data)
         .then(() => getTenantInfo().then((res) => {
          const newDataSource = res.data.data.results.map((temp) =>{ 
            temp["logo"] = <img alt="img" src={temp.logo} />;
            return temp;
          });
          dispatch({ type: "MY_ORGANIZATIONS", payload: newDataSource })}))
         .catch(() => setSnackMsg("Cannot Edit Organizations"), setSnackbar(true))
         setSnackMsg("Organization Edited Succesfully")
         setSnackbar(true)
         setOpen(false);
     }
    },
  });

  const handleChangeimage = (event) => {
    setImage(event.target.files[0]);
  }

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
                <h2 id="transition-modal-title">Add Organization</h2>
              ) : (
                <h2 id="transition-modal-title">Edit Organization</h2>
              )}
            </div>
            <div className="pModal__body">
              <form onSubmit={formik.handleSubmit}>
                <div className="pRow">
                  <div className="pCol pCol--col12">
                  <label className="pBtn pBtn--upload" htmlFor="contained-button-file">
                    <input
                      accept="image/*"
                      className="uploadBtn"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="logo"
                      onChange={handleChangeimage}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      size="large"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Icon
                    </Button>
                  </label>
                  </div>
                </div>
                <div className="pRow">
                  <div className="pCol pCol--col12">
                    <TextField
                      id="outlined-basic"
                      name="contact_email"
                      type="text"
                      label="Contact Email"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.contact_email}
                      className="text"
                    />
                  </div>
                </div>
                <div className="pRow">
                  <div className="pCol pCol--col12">
                    <TextField
                      id="outlined-basic"
                      name="contact_name"
                      type="text"
                      label="Contact Name"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.contact_name}
                    />
                  </div>
                </div>
                <div className="pRow">
                  <div className="pCol pCol--col12">
                    <TextField
                      lid="outlined-basic"
                      name="contact_address"
                      type="text"
                      label="Contact Address"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.contact_address}
                    />
                  </div>
                </div>
                <div className="pRow">
                  <div className="pCol pCol--col12">
                    <TextField
                      lid="outlined-basic"
                      name="contact_phone_number"
                      type="text"
                      label="Contact Phone Number"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.contact_phone_number}
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

export default React.memo(AddOrganization);