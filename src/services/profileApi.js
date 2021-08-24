import Axios from "axios"

export const getProfileItems = async () => {
    const api = `https://tenant3.mypatronpay.us/api/patron_configuration_item/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  }

  export const getPaymentProfiles = async () => {
    const api = `https://tenant3.mypatronpay.us/api/patron_configuration/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response
  }