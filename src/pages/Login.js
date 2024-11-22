import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://nzavote.onrender.com/api/v1/login", {
        email,
        password,
      });

      // Notify user of success
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      // Save token and user data in localStorage
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Redirect based on user role
      setTimeout(() => {
        if (user.role === "Admin") {
          window.location.href = "/Admin"; // Admin dashboard
        } else if (user.role === "Voter") {
          window.location.href = "/CandidateList"; // Voter candidate list
        } else {
          toast.error("Unknown user role. Please contact support.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      // Notify user of error
      toast.error(error.response?.data?.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
