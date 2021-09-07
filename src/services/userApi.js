import Axios from "axios"

export const getUsers = async () => {
    const api = `https://tenant3.mypatronpay.us/api/user/`;
    const token = localStorage.getItem("token");
    const response = await Axios.get(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const addUsers = async (payload) => {
    const api = `https://tenant3.mypatronpay.us/api/user/`;
    const token = localStorage.getItem("token");
    const response = await Axios.post(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const editUsers = async (id, payload) => {
    const api = `https://tenant3.mypatronpay.us/api/user/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.put(api, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const deleteUsers = async (id) => {
    const api = `https://tenant3.mypatronpay.us/api/user/${id}/`;
    const token = localStorage.getItem("token");
    const response = await Axios.delete(api, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response
}
