import api from "../api/axios";

export const placeOrder = () => {
  return api.post("/Orders/place-order");
};

export const getMyOrders = (page = 1, pageSize = 10) => {
    return api.get(
        `/Orders/my-orders?page=${page}&pageSize=${pageSize}`
    );
};

export const getUserOrderDetails = (orderId) => {
  return api.get(`/Orders/${orderId}`);
};