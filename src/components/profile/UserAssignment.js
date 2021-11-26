import React, {useEffect,useState, useContext} from 'react';
import EnhancedTable from "../DndTable/Table";
import { cols } from "./UserAssignmentCols";
import { getUserAssignment } from "../../services/userAssignmentApi";
import {Context} from "../../store/Context";

function UserAssignment() {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [, dispatch] = useContext(Context);

    useEffect(() => {
    getUserAssignment().then(response => {
        setData(response.data.data.results);
        dispatch({ type: "USER_ASSIGNMENT", payload: response.data.data.results });
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      data.forEach((temp) => {
        temp["f_name"] = temp.tur_id.first_name
        temp["email"] = temp.tur_id.email
        temp["name"] = temp.pcf_id.name;
        temp["is_deleted"] = temp.pcf_id.is_deleted ? "Yes" : "No";
        temp["default_for_user"] = temp.default_for_user ? "Yes" : "No" ; 
        temp["price_override_allowed"] = temp.price_override_allowed ? "Yes" : "No";
        temp["password_required_after_timeout"] = temp.password_required_after_timeout ? "Yes" : "No" ;
        temp["login_persistence"] = temp.login_persistence === "none" ? "No Login Required" : (temp.login_persistence === "full" ? "Require Username and Password" : ( temp.login_persistence === "password_only" ? "Remember Username But Require Password" : "") )
      });
      setNewData(data);
    }, [data]);

    return (
        <div className="pMainContainer">
            <EnhancedTable data={newData} columnData={cols} name="User Assignment" />
        </div>
    )
}

export default UserAssignment
