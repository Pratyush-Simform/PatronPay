import Axios from "axios"

export const getTransactions = async () => {
   let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/transaction/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

// export const generateTransactionReceipt = async (payload) => {
//   let subDom = localStorage.getItem("subDomain");
//    const api = `https://${subDom}/api/send_receipt/`;
//    const token = localStorage.getItem("token");
//    const response = await Axios.post(api, payload, {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    });
//    return response
// }

// export const generateTransactionReceipt = async (payload) => {
//   let subDom = localStorage.getItem("subDomain");
//    const api = `https://${subDom}/api/transactions/`;
//    const token = localStorage.getItem("token");
//    const response = await Axios.post(api, payload, {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    });
//    return response
// }