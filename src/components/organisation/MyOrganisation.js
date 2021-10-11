import React from 'react'
import EnhancedTable from "../DndTable/Table"
import { orgCols } from "./OrgCols"

function MyOrganisation() {
    return (
        <div>
             <EnhancedTable data={[]} columnData={orgCols} name="My Organisation" />
        </div>
    )
}

export default MyOrganisation
