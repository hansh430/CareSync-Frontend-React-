import api from "../api/axios";

export const addToCart = (data) => {
    return api.post("/Cart/addToCart", data);
};

export const getCart = () => {
    return api.get("/Cart");
};

export const updateCart = (cartId, quantity) => {
    return api.put(`/Cart/${cartId}`, {
        quantity
    });
};

export const removeCartItem = (cartId) => {
    return api.delete(`/Cart/${cartId}`);
};