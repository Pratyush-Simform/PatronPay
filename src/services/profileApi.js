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

  export const addProfileItems = async (payload) => {
    const api = `https://tenant3.mypatronpay.us/api/patron_configuration/`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  }

  export const editProfileItems = async (id, payload) => {
    const api = `https://tenant3.mypatronpay.us/api/patron_configuration/${id}`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  }

  export const deleteProfileItems = async (id) => {
    const api = `https://tenant3.mypatronpay.us/api/patron_configuration/${id}`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  }
