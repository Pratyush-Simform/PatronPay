import Axios from "axios";

export const getTenantInfo = async () => {
    let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/tenant/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };