import React, {useState, useEffect, useContext} from "react";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";
import { getProfileItems } from "../../services/profileApi"
import { cols } from "./profileColumns"
import { Context } from "../../store/Context";

function ProfileItems() {
  const [id, setId] = useState([]);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    getProfileItems().then(response => {
      // setData(response.data.data.results);
      setId(response.data.data.results[0].pcf_id);
      const newdataSource = response.data.data.results.map((temp) => {
        temp["newIcon"] = <img alt="img" src={temp.icon} />
        return temp
      })
      dispatch({ type: "PROFILE_ITEMS", payload: newdataSource})
    }) 
    .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="profile">
      <EnhancedTable data={state.profileItems} columnData={cols} name="Profile Items" />
    </div>
  );
}

export default ProfileItems;
