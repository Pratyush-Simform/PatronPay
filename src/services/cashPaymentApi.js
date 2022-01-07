import api from "./api";

export const getCashPayments = async () => {
  const response = await api.get("/cash-payment/");
  return response;
};

export const editCashPayments = async (id, payload) => {
  const response = await api.put(`/cash-payment/${id}/`, payload);
  return response;
};

export const deleteCashPayments = async (id) => {
  const response = await api.delete(`/cash-payment/${id}/`);
  return response;
};
