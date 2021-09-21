import Axios from "axios"

export const getUsers = async () => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const addUsers = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user/`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const editUsers = async (id, payload) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.put(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const deleteUsers = async (id) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.delete(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}
