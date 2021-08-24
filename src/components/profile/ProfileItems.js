import React from "react";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";
import { getProfileItems } from "../../services/profileApi"
import { cols } from "./profileColumns"

function ProfileItems() {
    
  const [id, setId] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getProfileItems().then(response => {
      setData(response.data.data.results);
      setId(response.data.data.results[0].pcf_id);
    }) 
  }, [id]);
  return (
    <div className="profile">
      <EnhancedTable data={data} columnData={cols} name="Profile Items" />
    </div>
  );
}

export default ProfileItems;
