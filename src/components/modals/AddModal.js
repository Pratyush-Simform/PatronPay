import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import "../../App.css";
import { useStyles } from "./styles";
import { useFormik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { addProfileItems } from "../../services/profileApi";
import { Constants } from "../DndTable/Constants";
import { getConfigApi } from "../../services/orderApi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function AddModal({ name }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState([]);
  const [pcfId, setPcfId] = useState("Select");
  const [openMode, setOpenMode] = useState(false);

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
      category: "",
      icon: {},
      full: {},
      price: "",
      tax: "",
      otherAmount: "",
      checkedpriceOverride: true,
      is_deleted: false,
      checkedTips: false,
    },
    onSubmit: (values) => {
      addProfileItems(values);
    },
  });

  const handleChange = (event) => {
    setPcfId(event.target.value);
  };

  useEffect(() => {
    getConfigApi().then((res) => setConfig(res.data.data.results));
    // pastOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <span type="button" onClick={handleOpen}>
        {name === Constants.ADD ? <AddIcon /> : <EditIcon />}
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
            {name === Constants.ADD ? (
              <h2 id="transition-modal-title">Add Modal</h2>
            ) : (
              <h2 id="transition-modal-title">Edit Modal</h2>
            )}
            <div className="addMod">
              <form onSubmit={formik.handleSubmit} noValidate>
                {name === Constants.ADD ? null : (
                  <div>
                    <InputLabel id="demo-controlled-open-select-label">
                      {" "}
                      Mode{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openMode}
                      onClose={() => setOpenMode(false)}
                      onOpen={() => setOpenMode(true)}
                      onChange={handleChange}
                      value={pcfId}
                    >
                      {config?.map((con) => (
                        <MenuItem value={con.id}>{con.name}</MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
                <div className="frstCol">
                  <TextField
                    required={true}
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
                    required={true}
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
                </div>
                <div className="scndCol">
                  <TextField
                    id="outlined-basic"
                    label="Category"
                    name="category"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.category}
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
                  <TextField
                    required={true}
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
                </div>
                {/* </ButtonGroup> */}
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
                    required={true}
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
                </div>
                <div className="frstCol">
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.checkedpriceOverride}
                        onChange={formik.handleChange}
                        name="checkedpriceOverride"
                        color="primary"
                      />
                    }
                    label="Allow Price/Amount Override"
                  />
                </div>
                <div className="frstCol">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.is_deleted}
                        onChange={formik.handleChange}
                        name="is_deleted"
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.checkedTips}
                        onChange={formik.handleChange}
                        name="checkedTips"
                        color="primary"
                      />
                    }
                    label="Exclude from tips"
                  />
                </div>
                <div className="profileSubmitBtn">
                  <Button variant="contained" color="default" type="submit">
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

export default AddModal;
