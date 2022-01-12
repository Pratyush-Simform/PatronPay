import api from "./api";

export const getDebugLogs = async () => {
  const response = await api.get("/debug_log/");
  return response;
};
