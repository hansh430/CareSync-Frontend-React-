import api from "../api/axios";

export const placeOrder = () => {
  return api.post("/Orders/place-order");
};

export const getMyOrders = () => {
  return api.get("/Orders/my-orders");
};

export const getUserOrderDetails = (orderId) => {
  return api.get(`/Orders/${orderId}`);
};