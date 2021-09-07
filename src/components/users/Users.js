import React, {useState, useEffect} from 'react'
import { getUsers } from "../../services/userApi"
import { cols } from "./userColumns"
import EnhancedTable from "../DndTable/Table"

function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
    getUsers().then(res => setData(res.data.data.results));
    }, [])

    return (
        <div>
          <EnhancedTable data={data} columnData={cols} name="Users" />
        </div>
    )
}

export default Users
