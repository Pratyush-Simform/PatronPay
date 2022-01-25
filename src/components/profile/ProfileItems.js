import React, { useEffect, useContext } from "react";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";
import { getProfileItemsbyID } from "../../services/profileApi";
import { cols } from "./profileColumns";
import { Context } from "../../store/Context";

function ProfileItems() {
  // const [id, setId] = useState([]);
  const [state, dispatch] = useContext(Context);

  const pcf = localStorage.getItem("pcf")

  if(state.paymentProfileName) {
    window.location.reload();
  }
  
  useEffect(() => {
    getProfileItemsbyID(pcf)
      .then((response) => {
        // setId(response.data.data.results[0].pcf_id);
        const newdataSource = response.data.data.results.map((temp) => {
          temp["newIcon"] = <img alt="img" src={temp.icon} />;
          temp["is_deleted"] = temp.is_deleted ? "No" : "Yes";
          temp["price_override_allowed"] = temp.price_override_allowed ? "Yes" : "No" ;
          return temp;
        });
        dispatch({ type: "PROFILE_ITEMS", payload: newdataSource });
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="profile pMainContainer">
      <EnhancedTable
        data={state.profileItems}
        columnData={cols}
        name="Profile Items"
        profile={state?.profileItems[0]?.pcf_name ? `${" / "}${state?.profileItems[0]?.pcf_name}` : ""}
      />
    </div>
  );
}

export default ProfileItems;
