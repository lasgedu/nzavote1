import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Vote from "./pages/Vote";
import HomePage from "./pages/HomePage"; 
import VerifyOtp from "./pages/VerifyOtp"; 
import CandidateList from "./pages/CandidateList";
import Admin from "./pages/Admin"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
        <Route path="/Admin"element={<Admin/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/CandidateList" element={<CandidateList />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} /> {/* Route for VerifyOtp */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
