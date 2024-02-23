import { useState, useEffect } from "react";

export default function AvailableMeals() {
  const [availableMeals, setAvailableMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const fetchedMeals = await fetch("http://localhost:3000/meals");
      const meals = await fetchedMeals.json();

      setAvailableMeals(meals);
    }

    fetchMeals();
  }, []);

  function handleAddToCart(id) {}

  return (
    <div id="meals">
      {availableMeals.map((meal) => (
        <div key={meal.id} className="meal-item">
          <img src={`http://localhost:3000/${meal.image}`} />
          <h3>{meal.name}</h3>

          <p className="meal-item-price">€{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>

          <article>
            <div className="meal-item-actions">
              <button onClick={handleAddToCart} className="button">
                Add to cart
              </button>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
