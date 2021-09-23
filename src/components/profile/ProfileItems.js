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

  const configutaions = [
    {id: "4f00afc4-3a40-4e6e-bfcb-9225e203b320", name: "WGSM Baseball Profile"},
    {id: "a03e7396-541d-4ae3-829b-91552da1ec0c", name: "shoppingcart profile"},
    {id: "a42a5b65-c91f-4bf0-8b5e-53ac9210dbc2", name: "quickpay profile"},
  ]

  let fil = configutaions.filter(f => f.id.includes("a03e7396-541d-4ae3-829b-91552da1ec0c"))
  console.log(fil, 33);

  return (
    <div className="profile">
      <EnhancedTable data={state.profileItems} columnData={cols} name="Profile Items" />
    </div>
  );
}

export default ProfileItems;
