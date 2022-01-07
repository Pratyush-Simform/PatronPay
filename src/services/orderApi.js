import Axios from "axios";
import api from "./api";

export const subdomainUrl = async (email) => {
  const api = `https://www.devpatronpay.us/api/tenant_domain/`;
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
  const token = response.data.data.access;
  localStorage.setItem("token", token);
  localStorage.setItem("refresh", response.data.data.refresh);
};

export const passwordReset = async (email) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/forgot_password/`;
  const response = await Axios.post(api, {
    email: email,
  });
  return response;
};

export const getConfigApi = async () => {
  const response = await api.get("/patron_configuration/");
  return response;
};

export const getPastOrders = async (pcfId) => {
  const response = await api.get(
    `/transaction/?pcf_id=${pcfId}&previous_txns_by_time=30`
  );
  return response;
};
