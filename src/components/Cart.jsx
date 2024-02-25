import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { currencyFormatter } from "../util/formatting";

export default function Cart() {
  const { items, removeItem, addItem } = useContext(CartContext);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      {items.length === 0 && <p>Il tuo carrello è vuoto.</p>}
      {items.length > 0 && (
        <ul>
          {items.map((meal) => (
            <li key={meal.id} className="cart-item">
              <p>
                {meal.name} x {meal.quantity} - {meal.price}
              </p>

              <div className="cart-item-actions">
                <button onClick={() => removeItem(meal)}>-</button>
                <p>{meal.quantity}</p>
                <button onClick={() => addItem(meal)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">
        Prezzo Totale: {currencyFormatter.format(totalPrice)}
      </p>
    </div>
  );
}
