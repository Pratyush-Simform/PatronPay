import React, { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { getConfigApi } from "../../services/orderApi";
import { useStyles } from "./styles";
import FileCopy from '@material-ui/icons/FileCopy';
import { duplicatePaymentProfleItem } from "../../services/profileApi";

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: 250,
    },
  },
};

function PaymentProfileModal({ row }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState([]);
  const [configType, setConfigType] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
    },
    onSubmit: () => {
      const newPcf = {
        pcf_item_pk: row.id,
        pcf_id: configType,
      };
      duplicatePaymentProfleItem(newPcf)
      setOpen(false)
    },
  });

  const handleChange = (event, identifier) => {
    if (identifier === "config_type") setConfigType(event.target.value);
  };

  useEffect(() => {
    if(open) {
      getConfigApi()
        .then((res) => setConfig(res.data.data.results))
        .catch(() => alert("Cannot load profile configurations"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <span type="button" onClick={handleOpen}>
        <FileCopy />
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
              <h2 id="transition-modal-title">Duplicate Item</h2>
          </div>
          <div className="pModal__body">
          <form onSubmit={formik.handleSubmit}>
            <div className="pRow">
                <div className="pCol pCol--col12">
                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                    Profile Mode
                    </InputLabel>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={configType}
                    label="Profile Mode"
                    onChange={(event) => handleChange(event, "config_type")}
                    MenuProps={MenuProps}
                    >
                    {config?.map((con) => (
                        <MenuItem value={con.id} onChange={formik.handleChange}>
                        {con.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
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

export default PaymentProfileModal;
