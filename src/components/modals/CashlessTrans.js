import React from 'react';
import Modal from '@material-ui/core/Modal';
import CtTable from "./CtTable"
import { Button } from '@material-ui/core';
import { useStyles } from "./styles"
import { getModalStyle } from "./styles"

function CashlessTrans(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const abc = props.data.map(ct => ct.cash_payment)
  const ijk = Object.keys(abc).map(obj => {
      return abc[obj]
  })
  const tub = ijk.filter(i => Object.keys(i).length !== 0)

  const body = (
    <div style={modalStyle} className={classes.cashlessPaper}>
      <h2 id="simple-modal-title">List of cashless transactions.</h2>
      {/* <ul>
        {tub.map(p => {
          return(
            <ul style={{display: "flex"}}>
            <li>{p.id}</li>
            <li>{p.card_number}</li>
            <li>{p.currency}</li>
            </ul>
          ) 
        })}
      </ul> */}
      <CtTable data={tub}/>
    </div>
  );

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {props.name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default CashlessTrans;