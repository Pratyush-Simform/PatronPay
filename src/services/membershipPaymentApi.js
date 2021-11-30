import Axios from "axios"

export const getMembershipPayments = async () => {
   let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/membership-payment/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

export const editMembershipPayments = async (id, payload) => {
    let subDom = localStorage.getItem("subDomain");
      const api = `https://${subDom}/api/membership-payment/${id}/`;
      const token = localStorage.getItem("token");
      const response = await Axios.put(api, payload, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      });
      return response
}
  
  export const deleteMembershipPayments = async (id) => {
    let subDom = localStorage.getItem("subDomain");
      const api = `https://${subDom}/api/membership-payment/${id}/`;
      const token = localStorage.getItem("token");
      const response = await Axios.delete(api, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      });
      return response
}