import React, { useEffect, useState } from "react";
import "./Progress.css";
import api from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Progress() {

  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("progress/", { withCredentials: true })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  // Chart options (fix invisible axis + labels)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      },
      y: {
        ticks: {
          color: "white"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    }
  };

  const dailyChart = {
    labels: ["Consumed", "Burned"],
    datasets: [
      {
        label: "Calories",
        data: [
          data.daily.calories_consumed,
          data.daily.calories_burned
        ],
        backgroundColor: ["#ff6384", "#36a2eb"],
        borderRadius: 8
      }
    ]
  };

  const weeklyChart = {
    labels: data.weekly.labels,
    datasets: [
      {
        label: "Calories Consumed",
        data: data.weekly.food,
        backgroundColor: "#ff9f40"
      },
      {
        label: "Calories Burned",
        data: data.weekly.workout,
        backgroundColor: "#4bc0c0"
      }
    ]
  };

  const weightChart = {
    labels: data.weight.dates,
    datasets: [
      {
        label: "Weight",
        data: data.weight.values,
        borderColor: "#00c3ff",
        backgroundColor: "rgba(0,195,255,0.2)",
        tension: 0.4,
        pointBackgroundColor: "#00c3ff",
        pointBorderColor: "#ffffff",
        pointRadius: 5
      }
    ]
  };

  return (
    <div className="progress-page">

      <h1>Your Progress</h1>
      <p>Track your daily activity, weekly performance and weight changes.</p>

      <div className="progress-grid">

        <div className="glass-card">
          <h2>Daily Progress</h2>
          <p>Calories consumed vs burned today</p>
          <Bar data={dailyChart} options={options} />
        </div>

        <div className="glass-card">
          <h2>Weekly Progress</h2>
          <p>Your calorie activity over the past 7 days</p>
          <Bar data={weeklyChart} options={options} />
        </div>

        <div className="glass-card">
          <h2>Weight Progress</h2>
          <p>Track your weight changes over time</p>
          <Line data={weightChart} options={options} />
        </div>

      </div>

    </div>
  );
}

export default Progress;