import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../../services/adminMedicineService";
import { toast } from "react-toastify";
function AddMedicine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    unitPrice: "",
    discount: "",
    quantity: "",
    expDate: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

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

      if (imageFile) {
        data.append("imageFile", imageFile);
      }
      await addMedicine(data);
      toast.success("Medicine added successfully.");

      navigate("/admin/medicines");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add medicine.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Medicine</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Medicine Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Manufacturer</label>

          <input
            type="text"
            className="form-control"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Price</label>

            <input
              type="number"
              className="form-control"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Discount (%)</label>

            <input
              type="number"
              className="form-control"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Quantity</label>

            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Expiry Date</label>

          <input
            type="date"
            className="form-control"
            name="expDate"
            value={formData.expDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Medicine Image</label>

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
              alt="Preview"
              width="180"
              className="img-thumbnail"
            />
          </div>
        )}

        <button className="btn btn-success">Add Medicine</button>
      </form>
    </div>
  );
}
export default AddMedicine;
