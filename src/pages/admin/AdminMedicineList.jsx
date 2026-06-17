import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMedicines,
  deleteMedicine,
} from "../../services/adminMedicineService";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function AdminMedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );

    if (!confirmDelete) return;

    try {
      await deleteMedicine(id);

      loadMedicines();
    } catch (error) {
      console.log(error);
      alert("Unable to delete medicine.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Medicine Management</h2>

        <Link to="/admin/medicines/add" className="btn btn-success">
          Add Medicine
        </Link>
      </div>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>

            <th>Name</th>

            <th>Manufacturer</th>

            <th>Price</th>

            <th>Discount</th>

            <th>Stock</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>
                <img
                  src={`${SERVER_URL}${medicine.imageUrl}`}
                  alt={medicine.name}
                  width="70"
                  height="70"
                  style={{ objectFit: "cover" }}
                />
              </td>

              <td>{medicine.name}</td>

              <td>{medicine.manufacturer}</td>

              <td>₹ {medicine.unitPrice}</td>

              <td>{medicine.discount}%</td>

              <td>{medicine.quantity}</td>

              <td>
                {medicine.status === 1 ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>

              <td>
                <Link
                  to={`/admin/medicines/edit/${medicine.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                {medicine.status === 1 ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(medicine.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <span className="text-muted">Deleted</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMedicineList;
