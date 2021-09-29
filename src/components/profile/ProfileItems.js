import React, { useState, useEffect, useContext } from "react";
import "../../App.css";
import EnhancedTable from "../DndTable/Table";
import { getProfileItems } from "../../services/profileApi";
import { cols } from "./profileColumns";
import { Context } from "../../store/Context";

function ProfileItems() {
  const [id, setId] = useState([]);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    getProfileItems()
      .then((response) => {
        setId(response.data.data.results[0].pcf_id);
        const newdataSource = response.data.data.results.map((temp) => {
          temp["newIcon"] = <img alt="img" src={temp.icon} />;
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
  }, [id]);

  return (
    <div className="profile">
      <EnhancedTable
        data={state.profileItems}
        columnData={cols}
        name="Profile Items"
      />
    </div>
  );
}

export default ProfileItems;
