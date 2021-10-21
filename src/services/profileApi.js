import Axios from "axios";

export const getProfileItems = async () => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration_item/`;
  const token = localStorage.getItem("token");
  const response = await Axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getPaymentProfiles = async () => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration/`;
  const token = localStorage.getItem("token");
  const response = await Axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletePaymentProfiles = async (id) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration/${id}`;
  const token = localStorage.getItem("token");
  const response = await Axios.delete(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};


export const addPaymentProfles = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response
}

export const addProfileItems = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration_item/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const editProfileItems = async (id, payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration_item/${id}`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteProfileItems = async (id) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/patron_configuration_item/${id}`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

