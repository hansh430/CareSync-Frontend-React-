import api from "../api/axios";

export const getOrders = (page = 1, pageSize = 10) => {
    return api.get(`/Admin/orders?page=${page}&pageSize=${pageSize}`);
};

export const getOrderDetails = (orderId) => {
  return api.get(`/Admin/orders/${orderId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/Admin/orders/${orderId}/status`, {
    status,
  });
};