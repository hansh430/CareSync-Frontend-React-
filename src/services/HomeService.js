import api from "../api/axios";

export const getHomeData = () => {
  return api.get("/Users/home");
};