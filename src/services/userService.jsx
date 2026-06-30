import api from "../api/axios";

export const registerUser = async (data) => {
  const response = await api.post("/Users/register", data);

  return response.data;
};
