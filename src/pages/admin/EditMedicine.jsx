import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMedicineById,
  updateMedicine,
} from "../../services/adminMedicineService";

import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    unitPrice: "",
    discount: "",
    quantity: "",
    expDate: "",
    status: 1,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadMedicine();
  }, []);

  const loadMedicine = async () => {
    try {
      const response = await getMedicineById(id);
      const medicine = response.data.data;

      setFormData({
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        unitPrice: medicine.unitPrice,
        discount: medicine.discount,
        quantity: medicine.quantity,
        expDate: medicine.expDate.substring(0, 10),
        status: medicine.status,
      });
      if (medicine.imageUrl) {
        setPreview(`${SERVER_URL}${medicine.imageUrl}`);
      }
    } catch {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("manufacturer", formData.manufacturer);
      data.append("unitPrice", formData.unitPrice);
      data.append("discount", formData.discount);
      data.append("quantity", formData.quantity);
      data.append("expDate", formData.expDate);
      data.append("status", formData.status);

      if (imageFile) {
        data.append("imageFile", imageFile);
      }

      await updateMedicine(id, data);

      toast.success("Medicine updated successfully.");

      navigate("/admin/medicines");
    } catch (error) {
      console.log(error);
      toast.error("Unable to update medicine.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Medicine</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>

          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Manufacturer</label>

          <input
            className="form-control"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <label>Price</label>

            <input
              className="form-control"
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Discount</label>

            <input
              className="form-control"
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Quantity</label>

            <input
              className="form-control"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label>Expiry Date</label>

          <input
            className="form-control"
            type="date"
            name="expDate"
            value={formData.expDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>

          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Replace Image (optional)</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="Medicine"
              width="180"
              className="img-thumbnail"
            />
          </div>
        )}

        <button className="btn btn-primary">Update Medicine</button>
      </form>
    </div>
  );
}
export default EditMedicine;
