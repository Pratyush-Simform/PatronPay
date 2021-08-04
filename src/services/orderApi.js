import Axios from "axios"

export const getConfigApi = async () => {
    const api = "https://tenant3.mypatronpay.us/api/patron_configuration/";
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response
}