import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { MoreVert } from "@material-ui/icons";
import ReactDraggable from "react-draggable";

const grid = 4;
const getListStyle = isDraggingOver => ({
  display: "flex",
  padding: grid,
  overflow: "none"
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  paddingBottom: grid * 2,
  margin: `0 ${grid}px 0 0`,
  display: "inline-block",
  ...draggableStyle
});

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      columnData,
      numSelected,
      rowCount,
      onSelectAllClick,
      orderBy,
      order,
      handleResizeColumn,
      handleReorderColumnData,
    } = this.props;

    return (
      <DragDropContext onDragEnd={handleReorderColumnData}>
        <TableHead>
          <TableRow
            component={Droppable}
            droppableId="droppable"
            direction="horizontal"
            style={{ padding: 0 }}
          >
            {(provided, snapshot) => (
              <TableRow
                key={snapshot.toString()}
                ref={provided.innerRef}
                style={{
                  ...getListStyle(snapshot.isDraggingOver),
                  padding: 0
                }}
                {...provided.droppableProps}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={onSelectAllClick}
                  />
                </TableCell>
                {columnData?.map((item, index) => (
                  <TableCell
                    key={item.id}
                    style={{
                      overflow: "none",
                      width: `${item.width}px`,
                      paddingLeft: 0,
                      paddingRight: 0
                    }}
                  >
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, {
                            ...provided.draggableProps.style,
                            display: "inline-block",
                            width: `${item.width}px` || "100px",
                            paddingTop: ".25rem"
                          })}
                        >
                          <TableSortLabel
                            active={orderBy === item.id}
                            direction={order}
                            onClick={this.createSortHandler(item.id)}
                            style={{
                              width: `${item.width - 25}px`,
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }}
                          >
                            {item.label.toUpperCase()}
                          </TableSortLabel>
                          {!snapshot.isDragging && (
                            <ReactDraggable
                              axis="x"
                              defaultClassName="ReactDragHandle"
                              defaultClassNameDragging="ReactDragHandleActive"
                              onStop={(event, data) => {
                                const newWidth = item.width + data.x;
                                return handleResizeColumn(item.id, newWidth);
                              }}
                              position={{
                                x: 0,
                                y: 0
                              }}
                              zIndex={999}
                            >
                              <MoreVert
                                suppressContentEditableWarning={true}
                                contentEditable={true}
                                style={{
                                  fontSize: "1rem",
                                  verticalAlign: "bottom",
                                  paddingTop: "8px"
                                }}
                              />
                            </ReactDraggable>
                          )}
                        </div>
                      )}
                    </Draggable>
                  </TableCell>
                ))}
                {provided.placeholder}
              </TableRow>
            )}
          </TableRow>
        </TableHead>
      </DragDropContext>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
