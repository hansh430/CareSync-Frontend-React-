import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getMedicines } from "../../services/medicineService";

function Medicines() {
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();

      setMedicines(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading medicines...</h3>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Medicines</h2>

      <div className="row">
        {medicines.map((medicine) => (
          <div className="col-md-4 mb-4" key={medicine.id}>
            <div className="card h-100 shadow">
              <img
                src={`https://localhost:7067${medicine.imageUrl}`}
                className="card-img-top"
                style={{
                  height: "220px",

                  objectFit: "cover",
                }}
                alt={medicine.name}
              />

              <div className="card-body">
                <h5>{medicine.name}</h5>

                <p>{medicine.manufacturer}</p>

                <p>₹ {medicine.unitPrice}</p>

                <p>
                  Discount:
                  {medicine.discount}
                </p>

                <p>
                  Stock:
                  {medicine.quantity}
                </p>

                <button className="btn btn-primary w-100">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Medicines;
