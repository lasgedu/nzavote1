import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [email, setEmail] = useState(""); 
  const [otp, setOtp] = useState(""); 

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 6) setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }

      const response = await axios.post("https://nzavote.onrender.com/api/v1/verify-otp", {
        email,
        otp, // Send the OTP as entered
      });

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      console.error("OTP Verification error:", err);
      toast.error(err.response?.data?.message || "Invalid OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="verify-otp-container">
      <ToastContainer />
      <form className="verify-otp-form" onSubmit={handleSubmit}>
        <h2>Verification Code</h2>
        <p>We have sent the verification code to your email address</p>

        <div className="email-input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="email-input"
            required
          />
        </div>

        <div className="otp-input-container">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            placeholder="••••••"
            className="single-otp-input"
            required
          />
        </div>

        <button type="submit" className="confirm-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
