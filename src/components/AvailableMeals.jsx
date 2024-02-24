import { useState, useEffect, useContext } from "react";
import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";
import { CartContext } from "../store/cart-context.jsx";
import { fetchAvailableMeals } from "../http.js";

export default function AvailableMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState();

  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);

      try {
        const meals = await fetchAvailableMeals();

        setAvailableMeals(meals);
      } catch (error) {
        setError({
          message: error.message || "Impossibile recuperare i prodotti.",
        });
      }

      setIsLoading(false);
    }

    fetchMeals();
  }, []);

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
        <ul id="meals">
          {availableMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal} addToCart={addItemToCart} />
          ))}
        </ul>
      )}
    </>
  );
}
