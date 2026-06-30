import api from "../api/axios";

// Get medicine by id
export const getMedicineById = (id) => {
  return api.get(`/Medicine/${id}`);
};

// Add medicine
export const addMedicine = (formData) => {
  return api.post("/Medicine", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update medicine
export const updateMedicine = (id, formData) => {
  return api.put(`/Medicine/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete medicine
export const deleteMedicine = (id) => {
  return api.delete(`/Medicine/${id}`);
};