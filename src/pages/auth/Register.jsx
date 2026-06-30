import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/userService";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill all fields.");
      return;
    }
    // if (!form.password.length < 6) {
    //   toast.error("Password must be at least 6 characters.");
    //   return;
    // }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      toast.success(response.message || "Registration successful.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: 500, width: "100%" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input
              className="form-control"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
