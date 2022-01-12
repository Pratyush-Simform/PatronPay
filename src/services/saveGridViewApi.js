import api from "./api";

export const addGridView = async (payload) => {
  const response = await api.post("/save_grid_view/", payload);
  return response;
};

export const getGridView = async () => {
  const response = await api.get("/save_grid_view/");
  return response;
};

export const deleteGridView = async (payload) => {
  const response = await api.post("/save_grid_view/", payload);
  return response;
};