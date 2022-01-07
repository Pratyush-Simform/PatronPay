import api from "./api";

export const getTenantInfo = async () => {
  const response = await api.get("/tenant-info/");
  return response;
};

export const addTenantInfo = async (payload) => {
  const response = await api.post("/tenant-info/", payload);
  return response;
};

export const editTenantInfo = async (id, payload) => {
  const response = await api.put(`/tenant-info/${id}/`, payload);
  return response;
};

export const deleteTenantInfo = async (id) => {
  const response = await api.post(`/tenant-info/${id}/`);
  return response;
};
