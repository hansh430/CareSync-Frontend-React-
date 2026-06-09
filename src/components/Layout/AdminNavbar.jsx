import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/admin/dashboard">
          CareSync Admin
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/admin/medicines">
            Medicines
          </Link>

          <Link className="nav-link" to="/admin/customers">
            Customers
          </Link>

          <Link className="nav-link" to="/admin/orders">
            Orders
          </Link>

          <button className="btn btn-danger ms-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
