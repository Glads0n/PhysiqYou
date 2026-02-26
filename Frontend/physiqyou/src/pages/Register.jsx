import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";



function Register() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <div className="register-container">

        <h1>Create Account</h1>

        <form className="register-form">

          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Age" />
          <input type="number" placeholder="Height (cm)" />
          <input type="number" placeholder="Weight (kg)" />
          <input type="password" placeholder="Password" />

          <button className="register-btn">
            <Link to="/profile_setup">Register</Link>
          </button>

          <p className="login-link">
            Already have an account? <Link to="/#explore">Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;
