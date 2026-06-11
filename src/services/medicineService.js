import api from "../api/axios";

export const getMedicines = async () => {
    const response = await api.get("/Medicine");
    return response.data;
};