import { useContext } from "react";
import { CartContext } from "../store/cart-context";

export default function Cart() {
  const { items, removeItem, addItemToCart } = useContext(CartContext);

  return (
    <div className="cart">
      <ul>
        {items.map((meal) => (
          <li key={meal.id} className="cart-item">
            <p>
              {meal.name} x {meal.quantity} - {meal.price}
            </p>

            <div className="cart-item-actions">
              <button onClick={() => removeItem(meal)}>-</button>
              <p>{meal.quantity}</p>
              <button onClick={() => addItemToCart(meal)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">22</p>
    </div>
  );
}
