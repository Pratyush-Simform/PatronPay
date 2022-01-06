import Axios from "axios";

export const manualCardPayment = async (payload) => {
//   let subDom = localStorage.getItem("subDomain");
  const api = `https://www.devpatronpay.us/manual-card-payment/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response
}