import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import "../../App.css";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

function AddModal() {
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
      profile: "",
      order: "",
      barcode: "",
      shortName: "",
      description: "",
      icon: {},
      full: {},
      price: "",
      tax: "",
      otherAmount: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <span type="button" onClick={handleOpen}>
        <AddIcon />
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
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
            <h2 id="transition-modal-title">Add Modal</h2>
            <div className="addMod">
              <form onSubmit={formik.handleSubmit}>
                <div className="frstCol">
                  <TextField
                    id="outlined-basic"
                    name="profile"
                    type="text"
                    label="Profile"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.profile}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Order"
                    name="order"
                    type="text"
                    multiline
                    variant="outlined"
                    placeholder="0"
                    onChange={formik.handleChange}
                    value={formik.values.order}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Barcode"
                    name="barcode"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.barcode}
                  />
                </div>
                <div className="scndCol">
                {/* <ButtonGroup variant="contained" color="primary" fullWidth={true}> */}
                  <TextField
                    id="outlined-basic"
                    name="shortName"
                    type="text"
                    label="Short Name"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.shortName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    name="description"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {/* </ButtonGroup> */}
                </div>
                <div className="frstCol">
                  <label htmlFor="contained-button-file">
                    <input
                      accept="image/*"
                      className="uploadBtn"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="icon"
                      onChange={formik.handleChange}
                    />
                    <Button
                      variant="contained"
                      color="default"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Icon
                    </Button>
                  </label>
                  <label htmlFor="contained-button-file">
                  <input
                      accept="image/*"
                      className="uploadBtn"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="full"
                      onChange={formik.handleChange}
                    />
                    <Button
                      variant="contained"
                      color="default"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Full Image
                    </Button>
                  </label>
                </div>
                <div className="scndCol">
                  <TextField
                    id="outlined-basic"
                    name="price"
                    type="text"
                    label="Price $"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    placeholder="0.00"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tax %"
                    name="tax"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.tax}
                    placeholder="0.00"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Other Amount"
                    name="otherAmount"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    placeholder="0.00"
                    value={formik.values.otherAmount}
                  />
                </div>
                <div className="profileSubmitBtn">
                <Button variant="contained" color="default" type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddModal;
