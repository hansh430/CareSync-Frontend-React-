import api from "../api/axios";

export const getMedicines = async (page=1, pageSize=6) => {
    const response = await api.get(`/Medicine?page=${page}&pageSize=${pageSize}`);
    return response.data;
};