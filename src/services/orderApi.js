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