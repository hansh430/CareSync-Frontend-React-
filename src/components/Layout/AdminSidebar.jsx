import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/admin-login");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4 text-center">CareSync</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/admin/dashboard">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/admin/medicines">
            <i className="bi bi-capsule-pill me-2"></i>
            Medicines
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/admin/customers">
            <i className="bi bi-people me-2"></i>
            Customers
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-white" to="/admin/orders">
            <i className="bi bi-bag-check me-2"></i>
            Orders
          </NavLink>
        </li>

        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
