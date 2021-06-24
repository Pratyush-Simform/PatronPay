import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import Input from "../input/input";
import Button from "../input/Button";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EditModal({ row }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("")

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(row);
  const changeFunc = (value) => {
    console.log(value);
    setInput(value);
  };
  return (
    <div>
      <span type="button" onClick={handleOpen}>
        <EditIcon />
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
            <h2 id="transition-modal-title">Edit transactions</h2>
            <div style={{ display: "grid" }}>
              <div style={{ display: "flex" }}>
                <Input
                  label="Created Date"
                  placeholder="Edit Created Date"
                  value={input ? input : new Date(row.date_created).getUTCDate()}
                  onChange={changeFunc}
                />
                <Input
                  label="Modified Date"
                  placeholder="Edit Modified Date"
                  value={new Date(row.date_modified).getDate()}
                />
                <Input
                  label="DVC Serial"
                  placeholder="Edit DVC"
                  value={row.dvc_serial}
                />
                <Input
                  label="Receipt"
                  placeholder="Edit recipt"
                  value={row.receipt}
                />
              </div>
              <div style={{ display: "flex" }}>
                <Input label="Id" placeholder="Edit id" value={row.id} />
                <Input label="MId" placeholder="Edit id" value={row.mid} />
                <Input label="PcfId" placeholder="Edit id" value={row.pcf_id} />
                <Input label="TId" placeholder="Edit id" value={row.tid} />
              </div>
              <div style={{ display: "flex" }}>
                <Input
                  label="Settled"
                  placeholder="Edit id"
                  value={row.settled}
                />
                <Input
                  label="Settled On"
                  placeholder="Edit id"
                  value={row.settled_on}
                />
                <Input
                  label="Settlement Status"
                  placeholder="Edit id"
                  value={row.settlement_status}
                />
                <Input
                  label="Settlement Swipe Fee"
                  placeholder="Edit id"
                  value={row.settlement_swipe_fee}
                />
              </div>
              <div style={{ display: "flex" }}>
                <Input
                  label="Settlement txn rate"
                  placeholder="Edit id"
                  value={row.settlement_txn_rate}
                />
                <Input
                  label="Trs date time"
                  placeholder="Edit id"
                  value={row.trs_date_time}
                />
                <Input
                  label="Trs type"
                  placeholder="Edit id"
                  value={row.trs_type}
                />
                <Input label="Tru id" placeholder="Edit id" value={row.tid} />
              </div>
              <Button name="Save" />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModal;
