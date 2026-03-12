import React from "react";
import "./PublicNavbar.css";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      {/* Center Links */}
      <div className="nav-links">
        <Link to="/#home">Home</Link>
        <Link to="/#explore">Explore</Link>
        <Link to="/#about">About</Link>

        
      </div>

      {/* Right Logo */}
      <div className="nav-logo">
        Physiq<span>You</span>
      </div>
    </nav>
  );
}

export default Navbar;
