import logo from "../assets/logo.jpg";
import Button from "./Button";
import { useContext, useRef } from "react";
import { CartContext } from "../store/cart-context";
import Modal from "./Modal.jsx";
import Cart from "./Cart.jsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef();

  const totalQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleOpenCart() {
    modal.current.open();
  }

  let modalActions = <Button buttonType="text">Chiudi</Button>;

  if (totalQuantity > 0) {
    modalActions = (
      <>
        <Button buttonType="text">Chiudi</Button>
        <Button buttonType="button">Ceckout</Button>
      </>
    );
  }

  return (
    <>
      <Modal title="Il tuo carrello" actions={modalActions} ref={modal}>
        <Cart />
      </Modal>

      <header id="main-header">
        <div id="title">
          <img src={logo} alt="burger" />
          <h1>reactfood</h1>
        </div>

        <nav>
          <Button buttonType={"text"} onClick={handleOpenCart}>
            Cart({totalQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
