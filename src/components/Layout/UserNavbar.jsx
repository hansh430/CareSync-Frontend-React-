import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function UserNavbar() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CareSync
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
          aria-controls="userNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/medicines">
                Medicines
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-orders">
                My Orders
              </Link>
            </li>

            <li className="nav-item ms-lg-3">
              <span className="nav-link text-white fw-bold">
                Hello, {user?.firstName} {user?.lastName}
              </span>
            </li>

            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;