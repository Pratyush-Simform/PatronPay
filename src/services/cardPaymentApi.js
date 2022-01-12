import api from "./api";

export const getCardPayments = async () => {
  const response = await api.get("/card-payment/");
  return response;
};

export const editCardPayments = async (id, payload) => {
  const response = await api.put(`/card-payment/${id}/`, payload);
  return response;
};

export const deleteCardPayments = async (id) => {
  const response = await api.delete(`/card-payment/${id}/`);
  return response;
};
