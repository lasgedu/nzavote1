import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    voterID: "",
  });

  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0); 
  const navigate = useNavigate(); 

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://nzavote.onrender.com/api/v1/register", formData);
      
      // Show the message from backend as a toast notification
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset the form by changing the key
      setFormKey((prevKey) => prevKey + 1);

      // Navigate to the OTP verification page after a short delay
      setTimeout(() => {
        navigate("/VerifyOtp");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");

      // Show error message as a toast notification
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
      <form key={formKey} className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <label htmlFor="voterID">Voter ID</label>
        <input
          type="text"
          id="voterID"
          name="voterID"
          value={formData.voterID}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        {/* Link to Login page */}
        <div className="login-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
