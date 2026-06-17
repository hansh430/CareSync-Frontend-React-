import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function UserNavbar() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CareSync
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/medicines">
            Medicines
          </Link>

          <Link className="nav-link" to="/cart">
            Cart
          </Link>

          <Link className="nav-link" to="/orders">
            My Orders
          </Link>

          <button className="btn btn-danger ms-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
