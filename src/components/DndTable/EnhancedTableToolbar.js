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
import { lighten } from "@material-ui/core/styles/colorManipulator";
import CancelIcon from "@material-ui/icons/Cancel";
import AddModal from "../modals/AddModal"

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes, title, items, searchedData } = props;
  console.log(items);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false)

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  let itemCopy = items;
  useEffect(() => {
    var input = document.getElementById("myInput");
    if (input) {
      input.onkeydown = function (event) {
        var key = event.keyCode || event.charCode;
        if (!(key == 8 || key == 46)) {
          let itemwa = itemCopy.filter((i) => i.trs_type.includes(searchInput));
          console.log(itemwa);
          searchedData(itemwa);
        } else {
          console.log(items);
          searchedData([]);
        }
      };
    }
  }, [searchInput]);

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
          <div style={{ display: "flex" }}>
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
const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
