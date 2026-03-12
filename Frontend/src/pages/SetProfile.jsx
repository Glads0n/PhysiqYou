import React, { useState } from "react";
import api from "../api/axios";
import "./SetProfile.css";

function ProfileSetup() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    current_weight: "",
    activity_level: "sedentary",
    goal_type: "lose",
    target_weight: "",
    weight_change_pace: 0.5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("setup_profile/", formData);
      alert("Profile setup complete!");
      window.location.href = "/myplan";
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className="setup-container">
      <form onSubmit={handleSubmit} className="setup-wrapper">
        
        <h1> Setup Your Profile !</h1>
        <br />

        <div className="cards-container">
          
          {/* LEFT CARD */}
          <div className="glass-card">
            <h2>Basic Information</h2>
             Age

            <input
              type="number"
              name="age"
              placeholder="Age in years"
              value={formData.age}
              onChange={handleChange}
              required
            />

            Gender
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            Height
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />

            Weight
            <input
              type="number"
              name="current_weight"
              placeholder="Current Weight (kg)"
              value={formData.current_weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* RIGHT CARD */}
          <div className="glass-card">
            <h2>Goals & Activity</h2>
            

            Activity Level
            <select
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
              <option value="extreme">Extremely Active</option>
            </select>

            Goal 
            <select
              name="goal_type"
              value={formData.goal_type}
              onChange={handleChange}
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>

            Target Weight
            <input
              type="number"
              name="target_weight"
              placeholder="Target Weight (kg)"
              value={formData.target_weight}
              onChange={handleChange}
              required
            />

            Weight Change Pace
            <input
              type="number"
              step="0.1"
              name="weight_change_pace"
              placeholder="Weight Change Pace (kg/week)"
              value={formData.weight_change_pace}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* SUBMIT BUTTON OUTSIDE */}
        <div className="submit-container">
          <button type="submit" className="submit-btn">
            Complete Setup
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProfileSetup;