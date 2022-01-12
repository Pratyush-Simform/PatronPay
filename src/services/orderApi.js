import api from "./api";

export const getConfigApi = async () => {
  const response = await api.get("/patron_configuration/");
  return response;
};

export const getPastOrders = async (pcfId) => {
  const response = await api.get(
    `/transaction/?pcf_id=${pcfId}&previous_txns_by_time=30`
  );
  return response;
};