import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getMedicines } from "../../services/medicineService";
import { addToCart } from "../../services/cartService";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleAddToCart = async (medicine) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {

        alert("Please login first.");
        return;
    }
    try {
      await addToCart({
        medicineId: medicine.id,
        quantity: 1,
      });
       alert("Added successfully.");
    } catch (error) {
      console.log(error);

      alert("Unable to add item.");
    }
  };

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
                src={`${SERVER_URL}${medicine.imageUrl}`}
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

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToCart(medicine)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineList;
