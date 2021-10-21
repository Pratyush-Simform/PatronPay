import React, { useState, useEffect } from "react";
import { getDebugLogs } from "../../services/debugLogsApis";
import { logCols } from "./logCols";
import EnhancedTable from "../DndTable/Table";

function DebugLogs() {
  const [logs, setLogs] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getDebugLogs()
      .then((res) => setLogs(res.data.data.results))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
      logs.forEach((temp) => {
          temp["logDates"] = `${temp.log_datetime.substring(0, 10)} ${temp.log_datetime.substring(11, 19)}`;
          temp["transDates"] = `${temp.transaction_datetime.substring(0, 10)} ${temp.transaction_datetime.substring(11, 19)}`;
      })
      setNewData(logs)
  }, [logs])
  console.log(logs);
  return (
    <div className="pMainContainer">
      <EnhancedTable data={newData} columnData={logCols} name="Debug Logs" />
    </div>
  )
}

export default DebugLogs;
