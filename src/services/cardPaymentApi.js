import Axios from "axios"

export const getCardPayments = async () => {
   let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/card-payment/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

export const editCardPayments = async (id, payload) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/card-payment/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.put(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const deleteCardPayments = async (id) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/card-payment/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.delete(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}