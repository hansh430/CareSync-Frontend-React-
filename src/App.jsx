import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/auth/AdminLogin";

import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import MainLayout from "./components/Layout/MainLayout";
import AdminLayout from "./components/Layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
