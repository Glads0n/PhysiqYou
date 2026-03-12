import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo(0,0);

    const fetchDashboard = async () => {

      try {

        const res = await api.get("dashboard/");

        if (res.data.setup_required) {
          navigate("/setprofile");
          return;
        }

        setData(res.data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchDashboard();

  }, [navigate]);

  if (!data) return <div>Loading...</div>;

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* HERO */}

        <section className="dashboard-hero">

          <h1>Hello {data.name}</h1>
          <p>Welcome to your dashboard 👋</p>

        </section>


        {/* CARDS */}

        <section className="dashboard-cards">

          <div className="glass-card">

            <h3>Calorie Intake Today</h3>

            <h2>
              {data.calories_consumed} / {data.calorie_target} kcal
            </h2>

            <Link to="/foodlog">
              <button className="card-btn">Add Meal</button>
            </Link>

          </div>


          <div className="glass-card">

            <h3>Calories Burned Today</h3>

            <h2>
              {data.calories_burned} / {data.burn_target} kcal
            </h2>

            <Link to="/workoutlog">
              <button className="card-btn">Add Workout</button>
            </Link>

          </div>


          <div className="glass-card">

            <h3>Current Weight</h3>

            <h2>{data.weight} kg</h2>

            <Link to="/update_weight">
              <button className="card-btn">Update</button>
            </Link>

          </div>

        </section>


        {/* PROGRESS */}

        <section className="dashboard-progress">

          <h2>Your Daily Calorie Progress</h2>

          <div className="progress-bar-container">

            <div
              className="progress-bar-fill"
              style={{ width: `${data.progress}%` }}
            ></div>

          </div>

          <p>{data.progress}% of your calorie goal reached</p>

        </section>
        <div className="dash-links">
            <Link to={"/faqs"}>FAQs</Link>
            <Link to={"/feedback"}>Give feedback</Link>
        </div>

      </div>

    </div>

  );
}