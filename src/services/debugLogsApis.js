import Axios from "axios";

export const getDebugLogs = async () => {
    let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/debug_log/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };