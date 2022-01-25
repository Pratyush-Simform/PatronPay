import Axios from "axios";

export const subdomainUrl = async (email) => {
  const api = `https://mypatronpay.us/api/tenant_domain/`;
  const response = await Axios.post(api, {
    email: email,
  });
  return response;
};

export const login = async (email, password) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/token/`;
  const response = await Axios.post(api, {
    email: email,
    password: password,
  });
  if((response.data.data.can_use_portal)) {
    const token = response.data.data.access;
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", response.data.data.refresh);
    } else {
      localStorage.setItem("subDomain","Deny");
    }
};

export const passwordReset = async (email, subDom) => {
  // let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/forgot_password/`;
  const response = await Axios.post(api, {
    email: email,
  });
  return response;
};