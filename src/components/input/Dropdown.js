import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Select from '@mui/material/Select';
import Chip from '@material-ui/core/Chip';
import { useStyles } from './styles';
// import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from "@material-ui/core/Modal";

import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { addGridView, getGridView, deleteGridView } from "../../services/saveGridViewApi";
import DeleteIcon from "@material-ui/icons/Delete";
import { Context } from "../../store/Context"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      maxWidth: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Dropdown({data, selectedData, pageName, columnDataCopy}) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [gridname, setGridName] = React.useState();
  const [check, setcheck] = React.useState(false);
  const [gridview, setgridview] = React.useState()
  const [dropName, setDropName] = React.useState('');
  const [state, dispatch] = useContext(Context)

  // When drag any column
  const columnData = columnDataCopy.map(i => Object.values(i))
  const columnDatadrag = columnData.map(i => i[3])


  // By Column name
  const drpDwn = data?.map(i => Object.values(i))
  const drpDwnKey = drpDwn.map(i => i[3])

  // By Column ID
  // const drpDwn = data?.map(i => Object.keys(i))
  // const drpDwnKey = drpDwn[0]?.map(j => j)
  // const newdrpDwnKey = drpDwnKey?.filter(n => !objarray.includes(n))  //without object dropdown

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  React.useEffect(() => {
   selectedData(personName)   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeName = (event) => {
    setGridName(event.target.value)
  }

  const handleChangeDefault = () => {
    setcheck((check) => !check)
  }

  const SaveGrid = () => {
    if(gridname) {
      const pageNames = "pwa/" + pageName
      const payloaddata = {"page_name": pageNames, "name": gridname, "default_view": check, "pwa_columns_data": columnDatadrag}

      addGridView(payloaddata)
      .then(() =>
      getGridView().then((res) =>
          dispatch({
            type: "GRIDVIEW_LISTS",
            payload: res.data.data,
          })
        )
      )
      .catch((err) => console.error(err));
      setOpen(false)
    }
  }

  React.useEffect(() => {
    // get gridview list
    getGridView().then((res) => dispatch({ type: "GRIDVIEW_LISTS", payload: res.data.data}))

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  React.useEffect(() => {
    if(state.gridViewLists.length > 0){
      const gridViewbyPage = state.gridViewLists?.filter((temp) => temp.page_name.slice(4) === pageName)
      const defaultgrid = gridViewbyPage?.filter((temp) => temp.is_default)
      if(defaultgrid.length > 0){
        setPersonName(defaultgrid[0]?.pwa_columns_data)
      }
      setgridview(gridViewbyPage)
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])

   const handleChangedata = (event) => {
    setPersonName(event.target.value.pwa_columns_data);
    setDropName(event.target.value.name)
   }

   const handleDelete = (id) => {
     const payload = { "delete-saved-grid" : id }
     deleteGridView(payload)
     .then(() =>
     getGridView().then((res) =>
         dispatch({
           type: "GRIDVIEW_LISTS",
           payload: res.data.data,
         })
       )
     )
     .catch((err) => console.error(err));
   }

  return (
    <>
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
                <h2 id="transition-modal-title">Save Grid View</h2>
            </div>
            <div className="pModal__body">
              <form>
                <div className="pRow">
                <div className="pCol pCol--col6 pCol--col-md-12">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    name="name"
                    type="text"
                    variant="outlined"
                    onChange={(e) => handleChangeName(e)}
                    required
                    // value={formik.values.other_amt}
                  />
                  </div>

                </div>
                <div className="pRow">
                  <div className="pCol pCol--col6 pCol--col-md-12">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={check}
                        onChange={() => handleChangeDefault()}
                        name="exclude_from_tips"
                        color="primary"
                      />
                    }
                    label="Default"
                  />
                  </div>
                </div>
                <div className="profileSubmitBtn">
                  <Button variant="contained" color="primary" size="large" onClick={() => {SaveGrid()}}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>

      { gridview?.length > 0 && (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">GridView</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={dropName}
          MenuProps={MenuProps}
          onChange={(e) => handleChangedata(e)}
        >
          { gridview && gridview.map((name, index) => (
            <MenuItem key={index} value={name}>
              <div className="gridview-option">
                <div className="gridview-option-name">
                  {name.name}
                </div>
                <div className="gridview-option-delete">
                  <DeleteIcon onClick={() => handleDelete(name.id)} />
                </div>
              </div>
            </MenuItem>
          ))}
        </Select> 
      </FormControl>
      )}
      
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleOpen} color="primary">Save GridView</Button>
      </ButtonGroup>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Columns</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          // input={<OutlinedInput id="select-multiple-chip" label="Columns" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
            {drpDwnKey && drpDwnKey.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}

export default Dropdown;




