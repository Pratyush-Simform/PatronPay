import React, { useEffect, useContext } from "react";
import EnhancedTable from "../DndTable/Table";
import { orgCols } from "./OrgCols";
import { getTenantInfo } from "../../services/myorganisationApis";
import { Context } from "../../store/Context"

function MyOrganisation() {
  // const [tenants, setTenents] = useState([]);
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    getTenantInfo().then((res) => 
      dispatch({ type: "MY_ORGANIZATIONS", payload: res.data.data.results })
    );
  }, [dispatch]);
  return (
    <div className="pMainContainer">
      <EnhancedTable
        data={state.myOrganizations}
        columnData={orgCols}
        name="My Organisation"
      />
    </div>
  );
}

export default MyOrganisation;
