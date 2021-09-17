import Axios from "axios"

export const login = async (email, password) => {
  const api = `https://tenant3.mypatronpay.us/api/token/`
  const response = await Axios.post(api, {
      email: email,
      password: password
  })
    console.log(response);
    const token = response.data.data.access
    localStorage.setItem("token", token)
}

export const subdomainUrl = async (email) => {
  const api = `https://tenant3.mypatronpay.us/api/tenant_domain/`
  const response = await Axios.post(api, {
    email: email
  })
  console.log(response);
}

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

export const getPastOrders = async (pcfId) => {
  const api = `https://tenant3.mypatronpay.us/api/transaction/?pcf_id=${pcfId}&previous_txns_by_time=30`
  const token = localStorage.getItem("token");
  const response = await Axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response
}