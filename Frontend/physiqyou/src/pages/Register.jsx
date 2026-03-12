import "./Register.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";



function Register() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("register/", formData);
      console.log(response.data);

      alert("Registration successful!");
      navigate("/#explore"); // redirect to login or landing

    } catch (err) {
      console.log(err.response?.data);
      setError("Registration failed. Check details.");
    }
  };

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <div className="register-container">

        <h1>Create Account</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="register-form" onSubmit={handleSubmit}>

          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          {/* <input type="number" placeholder="Age" />
          <input type="number" placeholder="Height (cm)" />
          <input type="number" placeholder="Weight (kg)" /> */}
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />

          <button className="register-btn" type="submit">
            Register
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
