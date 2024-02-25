import logo from "../assets/logo.jpg";
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";

export default function Header() {
  const { items } = useContext(CartContext);
  const { openCart, openCheckout } = useContext(ModalContext);

  const totalQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="burger" />
          <h1>reactfood</h1>
        </div>

        <nav>
          <Button onClick={openCart} buttonType={"text"}>
            Cart({totalQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
