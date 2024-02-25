import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { modalType, closeCheckout } = useContext(ModalContext);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const formattingTotalPrice = currencyFormatter.format(totalPrice);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    console.log(data);
  }

  return (
    <Modal
      title="Checkout"
      open={modalType === "checkout"}
      onClose={closeCheckout}
    >
      <form onSubmit={handleSubmit}>
        <p>Totale carrello: {formattingTotalPrice}</p>
        <Input type="text" id="fullName" label="Nome e Cognome" />
        <Input type="email" id="email" label="E-mail" />
        <Input type="text" id="address" label="Indirizzo" />
        <div className="control-row">
          <Input type="number" id="cap" label="CAP" />
          <Input type="text" id="city" label="Città" />
        </div>
        <div className="modal-actions">
          <Button onClick={closeCheckout} type="button" buttonType="text">
            Chiudi
          </Button>
          <Button buttonType="button">Invia ordine</Button>
        </div>
      </form>
    </Modal>
  );
}
