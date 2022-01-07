import api from "./api";

export const getUserAssignment = async () => {
  const response = await api.get("/user_patron_configuration_assignment/");
  return response;
};

export const addUserAssignment = async (payload) => {
  const response = await api.post(
    "/user_patron_configuration_assignment/",
    payload
  );
  return response;
};

export const editUserAssignment = async (id, payload) => {
  const response = await api.put(
    `/user_patron_configuration_assignment/${id}/`,
    payload
  );
  return response;
};

export const deleteUserAssignment = async (id) => {
  const response = await api.delete(
    `/user_patron_configuration_assignment/${id}/`
  );
  return response;
};
