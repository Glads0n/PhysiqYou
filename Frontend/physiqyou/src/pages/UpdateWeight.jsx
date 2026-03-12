import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./UpdateWeight.css";

export default function UpdateWeight() {

  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const updateWeight = async (e) => {

    e.preventDefault();

    try {

      await api.post("update-weight/", {
        weight: weight
      });

      alert("Weight updated successfully");
      setWeight("");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="weight-page">

      <div className="weight-container">

        <h1>Update Your Weight</h1>

        <p>
          Keep track of your progress by updating your current weight.
        </p>

        <div className="glass-card">
            <h3>Enter your current weight</h3>

          <form onSubmit={updateWeight}>

            <input
              type="number"
              placeholder="Enter weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <button type="submit">
              Update Weight
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}