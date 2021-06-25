import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CtTable from "./CtTable"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    maxHeight: "70vh",
    overflow: "scroll",
    width: "55%"
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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
let tub = []
let ijk = []
let abc = []
  if(props){

   abc = props.data?.map(ct => ct.cash_payment)
   ijk = Object.keys(abc).map(obj => {
      return abc[obj]
  })
  // console.log(tub);
  }
  tub = ijk.filter(i => Object.keys(i).length !== 0)
  const body = (
    <div style={modalStyle} className={classes.paper}>
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
      <button type="button" onClick={handleOpen}>
        {props.name}
      </button>
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