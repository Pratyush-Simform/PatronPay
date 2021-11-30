import Axios from "axios";

export const addGridView = async (payload) => {
    let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/save_grid_view/`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
};

export const getGridView = async () => {
    let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/save_grid_view/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
};

export const deleteGridView = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
  const api = `https://${subDom}/api/save_grid_view/`;
  const token = localStorage.getItem("token");
  const response = await Axios.post(api, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};