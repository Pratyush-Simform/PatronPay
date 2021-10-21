import React, { useEffect, useContext } from "react";
import { getUsers } from "../../services/userApi";
import { cols } from "./userColumns";
import EnhancedTable from "../DndTable/Table";
import { Context } from "../../store/Context";

function Users() {
  const [state, dispatch] = useContext(Context)

  const getUserList = () => {
    getUsers()
    .then((res) => dispatch({type: "USER_DATA", payload:res.data.data.results}))
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div className="pMainContainer">
        <EnhancedTable data={state.userData} columnData={cols} name="Users" />
      </div>
    )
  }

export default Users;
