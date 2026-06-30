import { useEffect, useState } from "react";
import { getHomeData } from "../../services/HomeService";
import { Link } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getHomeData();
      setHomeData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!homeData) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Welcome Section */}

      <div className="bg-primary text-white rounded p-4 mb-4">
        <h2>Welcome To CareSync</h2>

        <p className="mb-0">Your trusted online medicine platform.</p>
      </div>

      {/* Statistics */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{homeData.totalMedicines}</h3>
              <p>Medicines</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{homeData.cartItems}</h3>
              <p>Cart Items</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{homeData.totalOrders}</h3>
              <p>Orders</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>₹{homeData.walletBalance}</h3>
              <p>Wallet Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mb-5">
        <h3>Quick Actions</h3>

        <div className="d-flex gap-3 mt-3">
          <Link to="/medicines" className="btn btn-success">
            Browse Medicines
          </Link>

          <Link to="/cart" className="btn btn-primary">
            My Cart
          </Link>

          <Link to="/my-orders" className="btn btn-dark">
            My Orders
          </Link>
        </div>
      </div>

      {/* Featured Medicines */}

      <h3 className="mb-3">Featured Medicines</h3>

      <div className="row">
        {homeData.featuredMedicines.map((medicine) => (
          <div className="col-md-3 mb-4" key={medicine.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`${SERVER_URL}${medicine.imageUrl}`}
                alt={medicine.name}
                className="card-img-top"
                style={{
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body text-center">
                <h5>{medicine.name}</h5>

                <p className="fw-bold">₹{medicine.unitPrice}</p>

                <Link
                  to="/medicines"
                  className="btn btn-outline-success btn-sm"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
