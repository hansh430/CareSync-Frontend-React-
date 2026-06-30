import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteMedicine } from "../../services/adminMedicineService";
import { getMedicines } from "../../services/medicineService";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function AdminMedicineList() {
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 6;

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMedicines();
  }, [page]);

  const loadMedicines = async () => {
    try {
      setLoading(true);

      const response = await getMedicines(page, pageSize);

      setMedicines(response.data.items);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?"))
      return;

    try {
      await deleteMedicine(id);

      toast.success("Medicine deleted successfully.");

      loadMedicines();
    } catch (error) {
      console.log(error);

      toast.error("Unable to delete medicine.");
    }
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      (medicine.manufacturer ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Medicine Management</h2>

        <div className="d-flex gap-2 mt-2 mt-md-0">
          <input
            type="text"
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link to="/admin/medicines/add" className="btn btn-success">
            Add Medicine
          </Link>
        </div>
      </div>

      <div className="table-responsive">
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

              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
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

                  <td>
                    {medicine.quantity > 0 ? (
                      <span className="fw-bold text-success">
                        {medicine.quantity}
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">Out of Stock</span>
                    )}
                  </td>

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
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <h5>No medicines found.</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminMedicineList;
