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

  useEffect(() => {
    getUsers().then((res) => {
        const newDataSource = res.data.data.results.map((temp) =>{
          temp["first_name"] = temp.first_name + " " + temp.last_name;
          temp["can_use_portal"] = temp.can_use_portal ? "Yes" : "No";
          temp["can_use_terminal"] = temp.can_use_terminal ? "Yes" : "No" ;
          temp["manual_card_entry"] = temp.manual_card_entry ? "Yes" : "No" ;
          return temp;
          });
        dispatch({ type: "USER_DATA", payload: newDataSource })
      }
    );
  }, [dispatch]);

  return (
      <div className="pMainContainer">
        <EnhancedTable data={state.userData} columnData={cols} name="Users" />
      </div>
    )
  }

export default Users;
