import React, { useState, useEffect } from "react";
import EnhancedTable from "../DndTable/Table";
import { orgCols } from "./OrgCols";
import { getTenantInfo } from "../../services/myorganisationApis";

function MyOrganisation() {
  const [tenants, setTenents] = useState([]);
  useEffect(() => {
    getTenantInfo().then((res) => setTenents(res.data.data.results));
  }, []);
  return (
    <div className="pMainContainer">
      <EnhancedTable
        data={tenants}
        columnData={orgCols}
        name="My Organisation"
      />
    </div>
  );
}

export default MyOrganisation;
