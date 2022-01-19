import React, { useState, useEffect } from "react";
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
import {
  addProfileItems,
  editProfileItems,
  // getProfileItems,
} from "../../services/profileApi";
import { Constants } from "../DndTable/Constants";
import { getConfigApi } from "../../services/orderApi";
import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
import MenuItem from "@mui/material/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
// import { Context } from "../../store/Context";

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: 250,
    },
  },
};

function AddModal({ row, name }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState();
  const [pcfId, setPcfId] = useState(row ? row?.pcf_id : localStorage.getItem('pcf'));
  const [openMode, setOpenMode] = useState(false);
  const [snackState, setsnackState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const [snackMsg, setSnackMsg] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  // const [, dispatch] = useContext(Context);
  const { vertical, horizontal } = snackState;
  const [images, setImages] = useState();
  const [icons, setIcons] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      pcf_id: row?.paymentProfile || "",
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
      price_override_allowed: (row?.price_override_allowed === "Yes" ? true : false) || false, // Yes
      is_deleted: (row && (row?.is_deleted === "Yes" ? false : true)) || false, //Yes
      exclude_from_tips: row?.exclude_from_tips || false,
    },
    onSubmit: (values) => {
      const newpcf = { ...values, pcf_id: pcfId, icon: icons, full_image: images};

      let form_data = new FormData();
      for (let key in newpcf) {
        form_data.append(key, newpcf[key]);
      }

      if (name === Constants.ADD) {
        addProfileItems(form_data)
          .then(() =>
          {window.location.reload();
          setSnackMsg("Profile Item Created Succesfully");
          setSnackbar(true);
        }
          )
          .catch(
            () => setSnackMsg("Cannot create Profile Items"),
            setSnackbar(true)
          );
        setOpen(false);
      } else {
        editProfileItems(row.id, form_data)
          .then(() =>
          {window.location.reload();
            setSnackMsg("Profile Items Edited Succesfully");
            setSnackbar(true);
          }
          )
          .catch(
            () => setSnackMsg("Cannot Edit Profile Items"),
            setSnackbar(true)
          );
        setOpen(false);
      }
    },
  });

  const handleChange = (event) => {
    setPcfId(event.target.value);
  };

  useEffect(() => {
    if(open) {
      getConfigApi()
        .then((res) => setConfig(res.data.data.results))
        .catch(() => setSnackMsg("Cannot load profile configurations"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);


  const handleSnackClose = () => {
    setsnackState({ ...snackState, open: false });
  };

  const handleChangeimage = (event) => {
    setImages(event.target.files[0]);
  }

  const handleChangeicon = (event) => {
    setIcons(event.target.files[0]);
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
          <div className="paper pModal">
            <div className="pModal__header">
              {name === Constants.ADD ? (
                <h2 id="transition-modal-title">Add Modal</h2>
              ) : (
                <h2 id="transition-modal-title">Edit Modal</h2>
              )}
            </div>
            <div className="pModal__body">
              <form onSubmit={formik.handleSubmit}>
                <div className="pRow">
                  <div className="pCol pCol--col6 pCol--col-md-12">
                    <FormControl
                      className="pFormControlCustom"
                      variant="standard"
                      sx={{ m: 1, minWidth: 250 }}
                    >
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
                        placeholder={row?.paymentProfile}
                        required={true}
                        label="Profile"
                        MenuProps={MenuProps}
                      >
                        {config?.map((con) => (
                          <MenuItem
                            onChange={formik.handleChange}
                            value={con.id}
                            key={con.id}
                          >
                            {con.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="pCol pCol--col6 pCol--col-md-12">
                    <TextField
                      required={true}
                      id="outlined-basic"
                      label="Order"
                      name="order"
                      type="number"
                      multiline
                      variant="outlined"
                      placeholder="0"
                      onChange={formik.handleChange}
                      value={formik.values.order}
                    />
                  </div>
                </div>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
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
                  </div>
                  <div className="pCol pCol--col6 pCol--col-md-12">
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
                </div>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
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
                </div>
                <div className="pCol pCol--col6 pCol--col-md-12">
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
                </div>
                {/* </ButtonGroup> */}
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
                  <label className="pBtn pBtn--upload" htmlFor="contained-button-file">
                    <input
                      accept="image/*"
                      className="uploadBtn"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="icon"
                      onChange={handleChangeicon}
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
                  <div className="pCol pCol--col6 pCol--col-md-12">
                  <label className="pBtn pBtn--upload" htmlFor="contained-button-file">
                    <input
                      accept="image/*"
                      className="uploadBtn"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="full_image"
                      onChange={handleChangeimage}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      size="large"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Full Image
                    </Button>
                  </label>
                  </div>
                </div>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
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
                  </div>
                  <div className="pCol pCol--col6 pCol--col-md-12">
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
                </div>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
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
                  </div>
                  <div className="pCol pCol--col6 pCol--col-md-12">
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
                </div>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.is_deleted}
                        onChange={formik.handleChange}
                        name="is_deleted"
                        color="primary"
                      />
                    }
                    label="Inactive"
                  />
                  </div>
                  <div className="pCol pCol--col6 pCol--col-md-12">
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
    </>
  );
}

export default AddModal;
