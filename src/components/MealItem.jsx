import { currencyFormatter } from "../util/formatting.js";
import Button from "./Button.jsx";

export default function MealItem({ meal, addToCart }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button buttonType={"button"} onClick={() => addToCart(meal)}>
            Aggiungi al carrello
          </Button>
        </div>
      </article>
    </li>
  );
}
