import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import PublicNavbar from "./PublicNavbar";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";

function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100">
      {user ? <UserNavbar /> : <PublicNavbar />}

      <main className="container flex-grow-1" style={{ marginTop: "30px" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
