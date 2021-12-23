import Axios from "axios";

export const getDashboardData = async () => {
    let subDom = localStorage.getItem("subDomain");
     const api = `https://${subDom}/api/dashboard/`;
     const token = localStorage.getItem("token");
     const response = await Axios.get(api, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     return response
}