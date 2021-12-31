import Axios from "axios"

export const subdomainUrl = async (email) => {
  const api = `https://mypatronpay.us/api/tenant_domain/`
  const response = await Axios.post(api, {
    email: email
  })
  return response;
}


export const login = async (email, password) => {
let subDom = localStorage.getItem("subDomain")
  const api = `https://${subDom}/api/token/`
  const response = await Axios.post(api, {
      email: email,
      password: password
  })
    const token = response.data.data.access
    localStorage.setItem("token", token)
}


export const passwordReset = async (email) => {
let subDom = localStorage.getItem("subDomain")
  const api = `https://${subDom}/api/forgot_password/`
  const response = await Axios.post(api, {
    email: email
  })
  return response;
}

export const getConfigApi = async () => {
let subDom = localStorage.getItem("subDomain")
    const api = `https://${subDom}/api/patron_configuration/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response
}

export const getPastOrders = async (pcfId) => {
let subDom = localStorage.getItem("subDomain")
  const api = `https://${subDom}/api/transaction/?pcf_id=${pcfId}&previous_txns_by_time=30`
  const token = localStorage.getItem("token");
  const response = await Axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response
}