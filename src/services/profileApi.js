import api from "./api";

export const getProfileItems = async () => {
  const response = await api.get("/patron_configuration_item/");
  return response;
};

export const getProfileItemsbyID = async (id) => {
  const response = await api.get(`/patron_configuration_item/?pcf_id=${id}`);
  return response;
};

export const getPaymentProfiles = async () => {
  const response = await api.get("/patron_configuration/");
  return response;
};

export const deletePaymentProfiles = async (id) => {
  const response = await api.delete(`/patron_configuration/${id}`);
  return response;
};

export const editPaymentProfiles = async (id, payload) => {
  const response = await api.put(`/patron_configuration/${id}`, payload);
  return response;
};

export const addPaymentProfles = async (payload) => {
  const response = await api.post("/patron_configuration/", payload);
  return response;
};

export const duplicatePaymentProfles = async (payload) => {
  const response = await api.post("/duplicate_profile/", payload);
  return response;
};

export const addProfileItems = async (payload) => {
  const response = await api.post("/patron_configuration_item/", payload);
  return response;
};

export const editProfileItems = async (id, payload) => {
  const response = await api.put(`/patron_configuration_item/${id}`, payload);
  return response;
};

export const deleteProfileItems = async (id) => {
  const response = await api.delete(`/patron_configuration_item/${id}`);
  return response;
};

// /duplicate_profile_item/
export const duplicatePaymentProfleItem = async (payload) => {
  const response = await api.post("/duplicate_profile_item/", payload);
  return response;
};
