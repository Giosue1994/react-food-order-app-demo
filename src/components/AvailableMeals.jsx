import { useState, useEffect } from "react";
import Error from "./Error.jsx";

export default function AvailableMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        setAvailableMeals(resData);
      } catch (error) {
        setError({
          message: error.message || "Impossibile recuperare i prodotti.",
        });
      }

      setIsLoading(false);
    }

    fetchMeals();
  }, []);

  function handleAddToCart(id) {}

  if (error) {
    return <Error title="Si è verificato un errore!" message={error.message} />;
  }

  return (
    <>
      {isLoading && <p>Caricamento prodotti...</p>}
      {!isLoading && availableMeals.length === 0 && (
        <p>Nessun prodotto disponibile.</p>
      )}
      {!isLoading && availableMeals.length > 0 && (
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
                    Aggiungi al carrello
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
