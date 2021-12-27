import Axios from "axios";

export const getDashboardData = async (payload) => {
    let subDom = localStorage.getItem("subDomain");
     const api = `https://${subDom}/api/dashboard/`;
     const token = localStorage.getItem("token");
     const response = await Axios.post(api, payload, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     return response
}