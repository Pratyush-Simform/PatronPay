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

  useEffect(() => {
    getProfileItemsbyID(pcf)
      .then((response) => {
        // setId(response.data.data.results[0].pcf_id);
        const newdataSource = response.data.data.results.map((temp) => {
          temp["newIcon"] = <img alt="img" src={temp.icon} />;
          temp["is_deleted"] = temp.is_deleted ? "No" : "Yes";
          temp["price_override_allowed"] = temp.price_override_allowed ? "Yes" : "No" ;
          temp["paymentProfile"] =
            temp.pcf_id === "a42a5b65-c91f-4bf0-8b5e-53ac9210dbc2" ? (
              "QuickPay Profile"
            ) : temp.pcf_id === "a03e7396-541d-4ae3-829b-91552da1ec0c" ? (
              "Shopping Cart Profile"
            ) : (
              "WGSM Baseball Profile"
            );
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
      />
    </div>
  );
}

export default ProfileItems;
