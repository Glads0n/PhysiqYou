import React from "react";
import "./DashNavbar.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from "../axios"; // if you're using custom axios
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout/"); // your backend logout endpoint
      navigate("/"); // go back to landing
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">

      {/* Left Logo */}
      <div className="nav-logo">
        Physiq<span>You</span>
      </div>

      {/* Center Links */}
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/myplan">My Plan</Link>
        <Link to="/progress">Progress</Link>
        {/* <Link to="/setprofile">Set Profile</Link> */}
        
        
      </div>

      {/* Right Logout */}
      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;