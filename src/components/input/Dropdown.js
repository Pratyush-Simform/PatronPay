import React from 'react';
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

function Dropdown({data, selectedData}) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  // const [buttonOpen, setButtonOpen] = React.useState(false)
  const drpDwn = data?.map(i => Object.keys(i))
  const drpDwnKey = drpDwn[0]?.map(j => j)

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  React.useEffect(() => {
   selectedData(personName)   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName])

  // const buttonClick = () => {
  //   setButtonOpen(false)
  // };

  return (
    <>
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
        {/* <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={buttonClick}>Select colums</Button>
        </ButtonGroup> */}
      </FormControl>
    </>
  );
}

export default Dropdown;




