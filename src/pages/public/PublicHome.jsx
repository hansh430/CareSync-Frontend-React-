import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedicines } from "../../services/medicineService";

function PublicHome() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const response = await getMedicines(1, 3);

    setMedicines(response.data.items);
  };

  return (
    <div className="container mt-5">
      <div className="bg-success text-white rounded shadow-lg p-5 text-center">
        <h1 className="display-4 fw-bold">Welcome To CareSync</h1>

        <p className="lead mt-3">
          Buy genuine medicines online with secure wallet payments, easy
          ordering and real-time order tracking.
        </p>

        <div className="mt-4">
          <Link to="/medicines" className="btn btn-light btn-lg me-3">
            Browse Medicines
          </Link>

          <Link to="/register" className="btn btn-outline-light btn-lg">
            Create Account
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <i className="bi bi-capsule-pill display-4 text-success"></i>

              <h5 className="mt-3">Genuine Medicines</h5>

              <p>100% authentic medicines from trusted manufacturers.</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <i className="bi bi-truck display-4 text-primary"></i>

              <h5 className="mt-3">Fast Delivery</h5>

              <p>Quick order processing and doorstep delivery.</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <i className="bi bi-wallet2 display-4 text-warning"></i>

              <h5 className="mt-3">Secure Wallet</h5>

              <p>Fast and secure wallet based payments.</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <i className="bi bi-box-seam display-4 text-danger"></i>

              <h5 className="mt-3">Track Orders</h5>

              <p>Monitor every order from placement to delivery.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 mb-4">Featured Medicines</h2>
      <div className="row">
        {medicines.map((medicine)=>(
          <div className="col-md-4 mb-4" key={medicine.id}>
            <div className="card shadow h-100">
                <img 
                src={`${SERVER_URL}${medicine.imageUrl}`}
                className="card-mg-top"
                style={{
                    height:"220px",
                    objectFit:"cover"
                }}
                />
                <div className="card-body">
                    <h5>{medicine.name}</h5>
                    <p>{medicine.manufacturer}</p>
                    <h5 className="text-success">
                        ₹{medicine.unitPrice}
                    </h5>
                      <Link
                        to="/medicines"
                        className="btn btn-success w-100"
                    >
                        View Medicines
                    </Link>
                </div>
            </div>
          </div>
       ) )}
      </div>
    </div>
  );
}

export default PublicHome;
