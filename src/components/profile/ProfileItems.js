import React from "react";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";
import { getProfileItems } from "../../services/profileApi"
import { cols } from "./profileColumns"

function ProfileItems() {
  const [id, setId] = React.useState([]);
  const [newData, setNewData] = React.useState([]);

  React.useEffect(() => {
    getProfileItems().then(response => {
      // setData(response.data.data.results);
      setId(response.data.data.results[0].pcf_id);
      const newdataSource = response.data.data.results.map((temp) => {
        temp["newIcon"] = <img src={temp.icon} />
        return temp
      })
      setNewData(newdataSource)
    }) 
    .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="profile">
      <EnhancedTable data={newData} columnData={cols} name="Profile Items" />
    </div>
  );
}

export default ProfileItems;
