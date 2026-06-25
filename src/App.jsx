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
import AdminMedicineList from "./pages/admin/AdminMedicineList";
import EditMedicine from "./pages/admin/EditMedicine";
import AddMedicine from "./pages/admin/AddMedicine";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import UserOrders from "./pages/user/UserOrders";
import OrderDetails from "./pages/admin/OrderDetails";
import UserOrderDetails from "./pages/user/UserOrderDetails";
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
            path="/my-orders"
            element={
              <ProtectedRoute allowedRole="User">
                <UserOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders/:id"
            element={
              <ProtectedRoute allowedRole="User">
                <UserOrderDetails />
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
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
