import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getDashboard } from "../../services/adminService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="container mt-4">
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Customers</h6>
              <h2>{dashboard.totalCustomers}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Medicines</h6>
              <h2>{dashboard.totalMedicines}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Orders</h6>
              <h2>{dashboard.totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Pending Orders</h6>
              <h2>{dashboard.pendingOrders}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Revenue</h5>

              <h1 className="text-success">₹ {dashboard.totalRevenue}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
