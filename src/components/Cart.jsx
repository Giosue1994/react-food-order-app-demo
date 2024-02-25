import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./Button";
import Modal from "./Modal";

export default function Cart() {
  const { items, removeItem, addItem } = useContext(CartContext);
  const { modalType, closeCart, openCheckout } = useContext(ModalContext);

  const totalQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const formattingTotalPrice = currencyFormatter.format(totalPrice);

  return (
    <Modal
      title="Il tuo carrello"
      open={modalType === "cart"}
      onClose={modalType === "cart" ? closeCart : null}
    >
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
        <p className="cart-total">Prezzo Totale: {formattingTotalPrice}</p>
      </div>

      <form method="dialog">
        <div className="modal-actions">
          <Button onClick={closeCart} buttonType="text">
            Chiudi
          </Button>
          {totalQuantity > 0 && (
            <Button onClick={openCheckout} buttonType="button">
              Checkout
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
