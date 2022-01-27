import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
// import { MoreVert, Search } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import AddModal from "../modals/AddModal";
import EditUserModal from "../modals/EditUserModal";
import { toolbarStyles } from "./styles";
import "../../App.css";
import { Constants } from "./Constants";
import PaymentProfileModal from "../modals/PaymentProfileModal";
import TextField from '@mui/material/TextField';
import UserAssignmentModal from "../modals/UserAssignmentModal";
import AddOrgModal from "../modals/AddOrgModal";
import { useHistory } from "react-router-dom";

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes, title, items, searchedData, profile } =
    props;
  const [search, setSearch] = useState(false);
  // const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    if(e.target.value) {
      const filteredData = items.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(e.target.value.toLowerCase())
    })
    searchedData(filteredData);
  }
    // setSearchInput(e.target.value);
  };
  // let itemCopy = items;
  // useEffect(() => {
  //   var input = document.getElementById("myInput");
  //   if (input) {
  //     input.onkeydown = function (event) {
  //       if (!(event.key === "Backspace")) {
  //         if (props.title === "Profile Items") {
  //           // let fildata = itemCopy.filter((item) => {
  //           //   const temp = Object.values(item)
  //           //   let temp1
  //           //   for(let i = 0; i < temp.length; i++) {
  //           //     if(typeof(temp[i]) != "object" && temp[i].toString().includes(searchInput)){
  //           //       temp1 = item;
  //           //       break
  //           //     }
  //           //   }
  //           //   return temp1
  //           // })
  //           let filData = itemCopy.filter((j) =>
  //             j.description.includes(searchInput)
  //           );
  //           searchedData(filData);
  //         } else if (props.title === "Transaction") {
  //           let filData = itemCopy.filter((i) =>
  //             i.trs_type.includes(searchInput)
  //           );
  //           searchedData(filData);
  //         } else if (props.title === "Payment Profiles") {
  //           let filData = itemCopy.filter((k) => k.name.includes(searchInput));
  //           searchedData(filData);
  //         } else if (props.title === "Membership Payments") {
  //           let filData = itemCopy.filter((k) =>
  //             k.first_name.includes(searchInput)
  //           );
  //           searchedData(filData);
  //         } else if (props.title === "Users") {
  //           let filData = itemCopy.filter((k) =>
  //             k.first_name.includes(searchInput)
  //           );
  //           searchedData(filData);
  //         }
  //       } else {
  //         searchedData([]);
  //       }
  //     };
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[searchInput]);

  return (
    <Toolbar
      className={`${classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })} pMainToolbar`}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="subtitle1" id="tableTitle" onClick={() => history.goBack(-1)}>
            {title}{profile}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div className="pBtn pBtn--deleteRow">
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </div>
        ) : search ? (
          <div className="toolHead">
            <input
              id="myInput"
              placeholder="search here..."
              onChange={(e) => handleSearch(e)}
            />

            <CancelIcon onClick={() => setSearch(false)} />
          </div>
        ) : (
          <div className={classes.actionsInner + " searchButtonBar"}>
            <div className="pSearchbar">
              <TextField
              id="myInput"
                margin="normal"
                label={'Search'}
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => handleSearch(e)}
               />
            </div>
            {props.children}
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" className="pBtn pBtn--addNewItem">
                {/* <Search onClick={() => setSearch(true)} /> */}
                {title === "Profile Items" ? (
                  <AddModal name={Constants.ADD} />
                ) : null}
                {title === "Users" ? (
                  <EditUserModal name={Constants.ADD} />
                ) : null}
                {(title === "My Organization" && props.items.length < 1) && <AddOrgModal name={Constants.ADD} />}
                {title === "Payment Profiles" && <PaymentProfileModal names={Constants.ADD}/>}
                {title === "User Assignment" && <UserAssignmentModal names={Constants.ADD} />}
                {/* <MoreVert /> */}
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
