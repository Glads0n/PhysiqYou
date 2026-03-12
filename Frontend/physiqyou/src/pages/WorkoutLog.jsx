import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./WorkoutLog.css";

function WorkoutLog() {

  const [workoutList, setWorkoutList] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [duration, setDuration] = useState("");

  const [workouts, setWorkouts] = useState([]);

  // fetch workout list for dropdown
  useEffect(() => {

    const fetchWorkoutList = async () => {
      try {

        const res = await api.get("workouts/");
        setWorkoutList(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkoutList();

  }, []);


  // fetch today's workouts
  useEffect(() => {

    const fetchWorkouts = async () => {

      try {

        const res = await api.get("today-workouts/");
        setWorkouts(res.data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchWorkouts();

  }, []);



  // add workout
  const addWorkout = async (e) => {

    e.preventDefault();

    if (!selectedWorkout || !duration) return;

    try {

      const res = await api.post("add-workout/", {
        workout_id: selectedWorkout,
        duration: duration
      });

      setWorkouts([...workouts, res.data]);

      setSelectedWorkout("");
      setDuration("");

    } catch (err) {
      console.error(err);
    }
  };



  // delete workout
  const deleteWorkout = async (id) => {

    try {

      await api.delete(`delete-workout/${id}/`);

      setWorkouts(workouts.filter((w) => w.id !== id));

    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="workout-page">

      <h1>Workout Log</h1>

      {/* ADD WORKOUT CARD */}

      <div className="glass-card">

        <form onSubmit={addWorkout}>

          <h3>Add Workout</h3>

          <select
            value={selectedWorkout}
            onChange={(e) => setSelectedWorkout(e.target.value)}
          >
            <option value="">Select Workout</option>

            {workoutList.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button type="submit">
            Add Workout
          </button>

        </form>

      </div>



      {/* TODAY WORKOUTS */}

      <div className="glass-card">

        <h2>Today's Workouts</h2>

        {workouts.length === 0 ? (
          <p>No workouts logged today</p>
        ) : (

          workouts.map((w) => (

            <div className="workout-item" key={w.id}>

              <div>
                <h3>{w.workout_name}</h3>
                <p>{w.duration} min</p>
                <p>{Math.round(w.calories_burned)} kcal burned</p>
              </div>

              <span
                className="delete-btn"
                onClick={() => deleteWorkout(w.id)}
              >
                🗑
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default WorkoutLog;