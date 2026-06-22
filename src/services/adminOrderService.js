import api from "../api/axios";

export const getOrders = () => {
  return api.get("/Admin/orders");
};

export const getOrderDetails = (orderId) => {
  return api.get(`/Admin/orders/${orderId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/Admin/orders/${orderId}/status`, {
    status,
  });
};