import api from "./api";

export const getDashboardData = async (payload) => {
  const response = await api.post("/dashboard/", payload);
  return response;
};
