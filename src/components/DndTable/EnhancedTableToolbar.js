import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoreVert, Search } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import AddModal from "../modals/AddModal";
import EditUserModal from "../modals/EditUserModal";
import { toolbarStyles } from "./styles";
import "../../App.css";
import { Constants } from "./Constants";
import PaymentProfileModal from "../modals/PaymentProfileModal";
import TextField from '@mui/material/TextField';

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes, title, items, searchedData, updatedUsers } =
    props;
  console.log(props);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  let itemCopy = items;
  console.log(itemCopy);
  useEffect(() => {
    var input = document.getElementById("myInput");
    if (input) {
      input.onkeydown = function (event) {
        if (!(event.key === "Backspace")) {
          if (props.title === "Profile Items") {
            let filData = itemCopy.filter((j) =>
              j.description.includes(searchInput)
            );
            searchedData(filData);
          } else if (props.title === "Transaction") {
            let filData = itemCopy.filter((i) =>
              i.trs_type.includes(searchInput)
            );
            searchedData(filData);
          } else if (props.title === "Payment Profiles") {
            let filData = itemCopy.filter((k) => k.name.includes(searchInput));
            searchedData(filData);
          } else if (props.title === "Membership Payments") {
            let filData = itemCopy.filter((k) =>
              k.first_name.includes(searchInput)
            );
            searchedData(filData);
          } else if (props.title === "Users") {
            let filData = itemCopy.filter((k) =>
              k.first_name.includes(searchInput)
            );
            searchedData(filData);
          }
        } else {
          searchedData([]);
        }
      };
    }
  });
  console.log(updatedUsers, 59);
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="subtitle1" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
          <div className={classes.actionsInner}>
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
              <IconButton aria-label="Filter list">
                <Search onClick={() => setSearch(true)} />
                {title === "Profile Items" ? (
                  <AddModal name={Constants.ADD} />
                ) : null}
                {title === "Users" ? (
                  <EditUserModal name={Constants.ADD} />
                ) : null}
                {title === "Payment Profiles" && <PaymentProfileModal />}
                <MoreVert />
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
