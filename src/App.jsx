import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/auth/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";

import MedicineList from "./pages/user/MedicineList";
import Cart from "./pages/user/Cart";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Orders from "./pages/user/Orders";
import AdminMedicineList from "./pages/admin/AdminMedicineList";
import EditMedicine from "./pages/admin/EditMedicine";
import AddMedicine from "./pages/admin/AddMedicine";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Public/User Layout ================= */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/admin-login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* User Protected Pages */}

          <Route
            path="/medicines"
            element={
              <ProtectedRoute allowedRole="User">
                <MedicineList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRole="User">
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRole="User">
                <Orders />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= Admin Layout ================= */}

        <Route
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/medicines" element={<AdminMedicineList />} />
          <Route path="/admin/medicines/add" element={<AddMedicine />} />
          <Route path="/admin/medicines/edit/:id" element={<EditMedicine />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
