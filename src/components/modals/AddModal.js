import React, { useState, useEffect, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import "../../App.css";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { addProfileItems, editProfileItems, getProfileItems } from "../../services/profileApi";
import { Constants } from "../DndTable/Constants";
import { getConfigApi } from "../../services/orderApi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import { Context } from "../../store/Context"

function AddModal({ row, name }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState([]);
  const [pcfId, setPcfId] = useState("");
  const [openMode, setOpenMode] = useState(false);
  const [snackState, setsnackState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const [snackMsg, setSnackMsg] = useState("")
  const [snackbar, setSnackbar] = useState(false)
  const [state, dispatch] = useContext(Context)
  const { vertical, horizontal } = snackState;


  const handleOpen = () => {
    setOpen(true);
    console.log(state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      pcf_id: row?.pcf_id || "",
      order: row?.order || "",
      barcode: row?.barcode || "",
      short_name: row?.short_name || "",
      description: row?.description || "",
      category: row?.category || "",
      icon: row?.icon || "",
      full_image: row?.full_image || "",
      price: row?.price || 0.0,
      tax: row?.tax || 0.0,
      other_amt: row?.other_amt || 0.0,                                   
      price_override_allowed: row?.price_override_allowed || true,
      is_deleted: row?.is_deleted || false,
      exclude_from_tips: row?.exclude_from_tips || false,
    },
    onSubmit: (values) => {
      const newpcf = { ...values, pcf_id: pcfId };
      if (name === Constants.ADD) {
        addProfileItems(newpcf).then(() => getProfileItems()
        .then((res) => dispatch({type: "PROFILE_ITEMS", payload: res.data.data.results})))
        .catch(() => setSnackMsg("Cannot create Profile Items"), setSnackbar(true))
        setSnackMsg("Profile Item Created Succesfully")
        setSnackbar(true)
        setOpen(false);
      } else {
        editProfileItems(row.id, newpcf)
        .then(() => getProfileItems().then((res) => dispatch({type: "PROFILE_ITEMS", payload: res.data.data.results})))
        .catch(() => setSnackMsg("Cannot Edit Profile Items"), setSnackbar(true))
         setSnackMsg("Profile Items Edited Succesfully")
         setSnackbar(true)
         setOpen(false);
      }
    },
  });

  const handleChange = (event) => {
    alert(event.target.value);
    setPcfId(event.target.value);
  };

  useEffect(() => {
    getConfigApi().then((res) => setConfig(res.data.data.results));
    // pastOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSnackClose = () => {
    setsnackState({ ...snackState, open: false });
  };

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
              <form onSubmit={formik.handleSubmit}>
                <div className="frstCol">
                  <div style={{width: "55%", marginLeft: "4%", marginTop: "4%"}}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                      {" "}
                      Profile{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openMode}
                      onClose={() => setOpenMode(false)}
                      onOpen={() => setOpenMode(true)}
                      onChange={handleChange}
                      value={pcfId}
                      variant="outlined"
                      required={true}
                    >
                      {config?.map((con) => (
                        <MenuItem onChange={formik.handleChange} value={con.id}>
                          {con.name}
                        </MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                  </div>
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
                    name="short_name"
                    type="text"
                    label="Short Name"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.short_name}
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
                      name="full_image"
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
                    name="other_amt"
                    type="text"
                    multiline
                    variant="outlined"
                    onChange={formik.handleChange}
                    placeholder="0.00"
                    value={formik.values.other_amt}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.price_override_allowed}
                        onChange={formik.handleChange}
                        name="price_override_allowed"
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
                        checked={formik.values.exclude_from_tips}
                        onChange={formik.handleChange}
                        name="exclude_from_tips"
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
    </>
  );
}

export default AddModal;
