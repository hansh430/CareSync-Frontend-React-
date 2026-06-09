import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import PublicNavbar from "./PublicNavbar";

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PublicNavbar />

      <main className="flex-grow-1 container mt-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
