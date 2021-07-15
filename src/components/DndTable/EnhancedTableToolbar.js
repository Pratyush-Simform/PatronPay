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
import AddModal from "../modals/AddModal"
import { toolbarStyles } from "./styles"
import "../../App.css"

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes, title, items, searchedData } = props;
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  let itemCopy = items;
  useEffect(() => {
    var input = document.getElementById("myInput");
    if (input) {
      input.onkeydown = function (event) {
        // console.log(event.key);
        // var key = event.keyCode || event.charCode;
        if (!(event.key === "Backspace")) {
          if(props.title === "Profile Items"){
            let filData = itemCopy.filter(j => j.description.includes(searchInput))
            searchedData(filData)
          }else {
          let itemwa = itemCopy.filter((i) => i.trs_type.includes(searchInput));
          searchedData(itemwa);
          }
        } else {
          searchedData([]);
        }
      };
    }
  });

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            {title.toUpperCase()}
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
          <div>
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <Search onClick={() => setSearch(true)} />
                <AddModal />
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
