import Axios from "axios"

export const getTransactions = async () => {
    const api = `https://tenant3.mypatronpay.us/api/transaction/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}