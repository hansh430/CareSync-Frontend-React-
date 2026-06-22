import api from "../api/axios";

export const getUsers = () => {
  return api.get("/Admin/getUsers");
};

export const addFund = (userId, amount) => {
  return api.put(`/Admin/users/${userId}/fund`, {
    amount,
  });
};