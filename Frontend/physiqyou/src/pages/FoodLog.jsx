import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./FoodLog.css";

function FoodLog() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("");

  const [foods, setFoods] = useState([]);

  /* ---------------- FETCH TODAY FOODS ---------------- */

  useEffect(() => {

    const fetchFoods = async () => {

      try {

        const res = await api.get("today-food/");
        setFoods(res.data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchFoods();

  }, []);


  /* ---------------- SEARCH FOOD ---------------- */

  const searchFood = async (value) => {

    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {

      const res = await api.get(`search-food/?query=${value}`);

      setResults(res.data);

    } catch (err) {
      console.error(err);
    }
  };


  /* ---------------- SELECT FOOD ---------------- */

  const selectFood = (food) => {

    setSelectedFood(food);

    setQuery(food.name);

    setResults([]);
  };


  /* ---------------- ADD FOOD ---------------- */

  const addFood = async (e) => {

    e.preventDefault();

    if (!selectedFood || !quantity) return;

    const totalCalories =
      (selectedFood.calories * quantity) / 100;

    try {

      const res = await api.post("add-food/", {
        food_name: selectedFood.name,
        calories: totalCalories,
        quantity: quantity
      });

      setFoods([...foods, res.data]);

      setQuery("");
      setQuantity("");
      setSelectedFood(null);

    } catch (err) {
      console.error(err);
    }
  };


  /* ---------------- DELETE FOOD ---------------- */

  const deleteFood = async (id) => {

    try {

      await api.delete(`delete-food/${id}/`);

      setFoods(foods.filter((food) => food.id !== id));

    } catch (err) {
      console.error(err);
    }

  };


  return (
    <div className="foodlog-page">

      <h1>Food Log</h1>

      <p className="food-desc">
        Track your daily meals and stay aligned with your nutrition goals.
      </p>


      {/* ADD FOOD CARD */}

      <div className="glass-card">

        <h3>Add Your Meal</h3>

        <form className="food-form" onSubmit={addFood}>

          {/* search input */}

          <input
            type="text"
            placeholder="Search food..."
            value={query}
            onChange={(e) => searchFood(e.target.value)}
          />


          {/* search results */}

          {results.length > 0 && (

            <div className="results">

              {results.map((food, index) => (

                <div
                  key={index}
                  className="result-item"
                  onClick={() => selectFood(food)}
                >
                  {food.name} ({food.calories} kcal / 100g)
                </div>

              ))}

            </div>

          )}


          {/* quantity */}

          <input
            type="number"
            placeholder="Quantity (grams)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />


          <button type="submit">
            Add Food
          </button>

        </form>

      </div>



      {/* TODAY'S FOOD CARD */}

      <div className="glass-card">

        <h2>Today's Meals</h2>

        {foods.length === 0 ? (
          <p className="empty-text">No food logged today</p>
        ) : (

          <div className="food-list">

            {foods.map((food) => (

              <div className="food-item" key={food.id}>

                <div>

                  <h3>{food.food_name}</h3>

                  <p>{food.calories} kcal</p>

                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteFood(food.id)}
                >
                  🗑
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default FoodLog;