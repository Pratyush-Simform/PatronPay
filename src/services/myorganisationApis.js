import Axios from "axios";

export const getTenantInfo = async () => {
    let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/tenant/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

export const addTenantInfo = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/tenant/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editTenantInfo = async (id, payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/tenant/${id}/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteTenantInfo = async (id) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/tenant/${id}/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};