import api from "./api";

export const getMembershipPayments = async () => {
  const response = await api.get("/membership-payment/");
  return response;
};

export const editMembershipPayments = async (id, payload) => {
  const response = await api.put(`/membership-payment/${id}/`, payload);
  return response;
};

export const deleteMembershipPayments = async (id) => {
  const response = await api.delete(`/membership-payment/${id}/`);
  return response;
};
