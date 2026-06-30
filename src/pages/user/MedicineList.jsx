import { useEffect, useState } from "react";
import { getMedicines } from "../../services/medicineService";
import { addToCart } from "../../services/cartService";
import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 6;

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMedicines();
  }, [page]);

 const fetchMedicines = async () => {
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

  const handleAddToCart = async (medicine) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first.");

      return;
    }

    try {
      await addToCart({
        medicineId: medicine.id,
        quantity: 1,
      });

      toast.success("Medicine added to cart.");
    } catch (error) {
      console.log(error);

      toast.error("Unable to add item.");
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Medicines</h2>

        <div className="col-lg-4 col-md-6 mt-2 mt-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <div className="col-lg-4 col-md-6 mb-4" key={medicine.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${SERVER_URL}${medicine.imageUrl}`}
                  className="card-img-top"
                  alt={medicine.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{medicine.name}</h5>

                  <p className="text-muted">{medicine.manufacturer}</p>

                  <p>
                    <strong>Price:</strong> ₹{medicine.unitPrice}
                  </p>

                  <p>
                    <strong>Discount:</strong> {medicine.discount}%
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {medicine.quantity > 0 ? (
                      <span className="text-success fw-bold">
                        {medicine.quantity}
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">Out of Stock</span>
                    )}
                  </p>

                  <button
                    className="btn btn-primary mt-auto"
                    disabled={medicine.quantity === 0}
                    onClick={() => handleAddToCart(medicine)}
                  >
                    {medicine.quantity === 0 ? "Out of Stock" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No medicines found.</h4>
          </div>
        )}
      </div>

      {/* Pagination */}

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

export default MedicineList;
