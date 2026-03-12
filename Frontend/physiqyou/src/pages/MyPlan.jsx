import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyPlan.css";

export default function Goal() {

  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get("my_plan/");
        setPlan(res.data.plan);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    fetchPlan();
  }, []);


  if (!plan) {
    return (
      <div className="goal-container">
        <h1>Loading your plan...</h1>
      </div>
    );
  }

  return (
    <div className="goal-container">

      <div className="goal-overlay">

        <div className="goal-wrapper">

          {/* Heading */}
          <h1 className="goal-title">My Plan</h1>

          {/* Description */}
          <p className="goal-description">
            Based on your body metrics, activity level and fitness goal,
            our system has calculated a personalized calorie plan for you.
            These recommendations are designed to help you reach your target
            weight in a sustainable and healthy way.
          </p>


          {/* Plan Cards */}
          <div className="plan-cards">

            <div className="plan-card">
              <h3>Daily Calorie Intake</h3>
              <p className="plan-value">{plan.daily_calories} kcal</p>
              <span className="plan-sub">
                Recommended calories to consume each day
              </span>
            </div>


            <div className="plan-card">
              <h3>Calories to Burn</h3>
              <p className="plan-value">{plan.daily_burn} kcal</p>
              <span className="plan-sub">
                Estimated calories to burn through activity
              </span>
            </div>


            <div className="plan-card">
              <h3>Estimated Timeline</h3>
              <p className="plan-value">{plan.expected_weeks} weeks</p>
              <span className="plan-sub">
                Approximate time to reach your goal
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}