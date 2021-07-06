import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Input from "../input/input";
import Button from "../input/Button";
import "../../App.css"
import { useStyles } from "./styles"

function AddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <Input label="Dessert" placeholder="Add Dessert" />
              <Input label="Protien" placeholder="Add Protien value" />
              <Input label="Carbs" placeholder="Add Carbs value" />
              <Input label="Fat" placeholder="Add Fat value" />
              <Input label="Calories" placeholder="Add Calories value" />
              <Button name="Save" />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddModal;
