import React, { useEffect, useContext } from "react";
import EnhancedTable from "../DndTable/Table";
import { orgCols } from "./OrgCols";
import { getTenantInfo } from "../../services/myorganisationApis";
import { Context } from "../../store/Context"

function MyOrganisation() {
  // const [tenants, setTenents] = useState([]);
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    getTenantInfo().then((res) => {
        const newDataSource = res.data.data.results.map((temp) =>{ 
          temp["logo"] = <img alt="img" src={temp.logo} />;
          return temp;
          });
        dispatch({ type: "MY_ORGANIZATIONS", payload: newDataSource })
      }
    );
  }, [dispatch]);
  return (
    <div className="pMainContainer">
      <EnhancedTable
        data={state.myOrganizations}
        columnData={orgCols}
        name="My Organization"
      />
    </div>
  );
}

export default MyOrganisation;