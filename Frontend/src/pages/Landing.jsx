import "./Landing.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation,} from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
// import axios from "axios";



function Landing() {
  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);


const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async () => {
  try {

    await api.get ("csrf/")

    const response = await api.post("login/", {
      username,
      password,
    });
    navigate("/dashboard");

    console.log("Success:", response.data);
    alert("Login successful");

  } catch (error) {
    console.error("Error:", error.response?.data);
    alert("Login failed");
    console.log("LOGIN CLICKED");
  }
};
  return (
    <div>

      {/* HOME */}
      <section id="home" className="section home">

  <div className="home-content">
    <h1 className="hero-title">Precision Fitness, Powered by Your Data</h1>

    <p className="hero-text">
      Stop guessing. Track your daily macros, monitor your caloric burn, and watch your progress unfold with our advanced full-stack tracking engine
    </p>

    <button
  className="hero-btn"
  onClick={() => {
    document.getElementById("explore").scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Try Now
</button>
  </div>

</section>

{/* EXPLORE */}
      <section id="explore" className="section explore">

        <div className="explore-content">

          {/* LEFT TEXT */}
          <div className="explore-text">
            <h1>Start Your Fitness Journey</h1>
            <p>
              Login to access personalized workouts, track your fitness progress,
              and transform your lifestyle with AI-powered insights.
            </p>
          </div>

          {/* RIGHT LOGIN */}
          <div className="login-box">
            <h2>Login</h2>

            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />

            <button className="login-btn" onClick={handleLogin} >Login</button>

            <p>
              New user? <Link to="/register">Create Account</Link>

            </p>
          </div>

        </div>

      </section>


      {/* ABOUT */}
      {/* ABOUT */}
<section id="about" className="section about">

  <div className="about-container">

    {/* LEFT — Feature Visualization */}
    <div className="about-features">

  <div className="feature-card">
    <h3>🔥 Calorie Tracking</h3>
    <p>Track daily calorie intake and monitor your nutrition progress.</p>
  </div>

  <div className="feature-card">
    <h3>🎯 Goal Setting</h3>
    <p>Set personalized fitness goals and stay motivated throughout your journey.</p>
  </div>

  <div className="feature-card">
    <h3>📈 Progress Monitoring</h3>
    <p>Visualize your fitness improvements with clear progress insights.</p>
  </div>

</div>


    {/* RIGHT — Text Content */}
    <div className="about-text">

  <h1>About PhysiqYou</h1>
  <br />

  <p>
    PhysiqYou is a modern fitness platform designed to help users
    take control of their health through smart tracking and
    personalized fitness tools. From monitoring calories to setting achievable goals,
    our platform empowers users to build consistent habits
    and achieve long-term fitness success.
  </p>
  

  <p>
    Our Mission: Simplifying the Science of Fitness.
We believe that reaching your fitness goals shouldn’t feel like a math exam. PhysiqYou was born out of a simple need: a unified platform where nutrition meets performance. By combining real-time caloric tracking with data-backed workout programming, we eliminate the guesswork, allowing you to focus on what truly matters - showing up.
  </p>

</div>


  </div>

</section>



      

    </div>
  );
}

export default Landing;
