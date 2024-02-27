import { useContext } from "react";
import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";
import { CartContext } from "../store/cart-context.jsx";
import useHttp from "../hooks/useHttp.jsx";

const requestConfig = {};

export default function AvailableMeals() {
  const { addItem } = useContext(CartContext);

  const {
    data: availableMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (error) {
    return <Error title="Si è verificato un errore!" message={error} />;
  }

  if (isLoading) {
    return <p className="center">Caricamento prodotti...</p>;
  }

  if (!isLoading && availableMeals.length === 0) {
    return <p className="center">Nessun prodotto disponibile.</p>;
  }

  if (!isLoading && availableMeals.length > 0) {
    return (
      <ul id="meals">
        {availableMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} addToCart={addItem} />
        ))}
      </ul>
    );
  }
}
