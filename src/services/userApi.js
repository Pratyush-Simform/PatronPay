import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/user/");
  return response;
};

export const addUsers = async (payload) => {
  const response = await api.post("/user/", payload);
  return response;
};

export const editUsers = async (id, payload) => {
  const response = await api.put(`/user/${id}/`, payload);
  return response;
};

export const deleteUsers = async (id) => {
  const response = await api.delete(`/user/${id}/`);
  return response;
};
