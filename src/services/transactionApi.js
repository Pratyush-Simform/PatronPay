import api from "./api";

export const getTransactions = async () => {
  const response = await api.get("/transaction/");
  return response;
};

export const addTransactions = async (payload) => {
  const response = await api.post("/transaction/", payload, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response;
};

export const generateTransactionReceipt = async (payload) => {
  const response = await api.post("/generate_receipt/", payload);
  return response;
};

// /transaction-item/
export const getTransactionItems = async () => {
  const response = await api.get("/transaction-item/");
  return response;
};
