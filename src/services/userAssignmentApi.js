import Axios from "axios"

export const getUserAssignment = async () => {
   let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user_patron_configuration_assignment/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

export const addUserAssignment = async (payload) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user_patron_configuration_assignment/`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const editUserAssignment = async (id, payload) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user_patron_configuration_assignment/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.put(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const deleteUserAssignment = async (id) => {
  let subDom = localStorage.getItem("subDomain");
    const api = `https://${subDom}/api/user_patron_configuration_assignment/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.delete(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}