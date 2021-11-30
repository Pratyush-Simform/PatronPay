import Axios from "axios"

export const getCashPayments = async () => {
   let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/cash-payment/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

export const editCashPayments = async (id, payload) => {
    let subDom = localStorage.getItem("subDomain");
      const api = `https://${subDom}/api/cash-payment/${id}/`;
      const token = localStorage.getItem("token");
      const response = await Axios.put(api, payload, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      });
      return response
  }
  
  export const deleteCashPayments = async (id) => {
    let subDom = localStorage.getItem("subDomain");
      const api = `https://${subDom}/api/cash-payment/${id}/`;
      const token = localStorage.getItem("token");
      const response = await Axios.delete(api, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      });
      return response
  }