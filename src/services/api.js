import Axios from "axios"

let subDom = localStorage.getItem("subDomain");

const instance = Axios.create({
  baseURL: `https://${subDom}/api`
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
  },
  (error) => { return Promise.reject(error);}
)

instance.interceptors.response.use((res) => {
  return res;
  },
  async (error) => {
    const originalConfig = error.config;
    console.log("error res ",error.response.status);
    if(error.response) {
      if((error.response.status === 403 || error.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/token/refresh/", {
            refresh: localStorage.getItem("refresh")
          });
          console.log("response",rs)
          const token = rs.data.data.access
          localStorage.setItem("token",token);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  }
)

export default instance;