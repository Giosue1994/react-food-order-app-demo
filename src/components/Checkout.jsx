import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { modalType, closeCheckout } = useContext(ModalContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const formattingTotalPrice = currencyFormatter.format(totalPrice);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: data,
        },
      })
    );
  }

  function handleFinish() {
    closeCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button onClick={closeCheckout} type="button" buttonType="text">
        Chiudi
      </Button>
      <Button buttonType="button">Invia ordine</Button>
    </>
  );
  if (isSending) {
    actions = <p>Invio in corso...</p>;
  }

  if (data && !error) {
    return (
      <Modal
        title="Il tuo ordine è stato ricevuto"
        open={modalType === "checkout"}
        onClose={handleFinish}
      >
        <p>Ti abbiamo inviato una mail di recap</p>
        <div className="modal-actions">
          <Button onClick={handleFinish} type="button" buttonType="button">
            Okay
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Checkout"
      open={modalType === "checkout"}
      onClose={closeCheckout}
    >
      <form onSubmit={handleSubmit}>
        <p>Totale carrello: {formattingTotalPrice}</p>
        <Input type="text" id="name" label="Nome e Cognome" />
        <Input type="email" id="email" label="E-mail" />
        <Input type="text" id="street" label="Indirizzo" />
        <div className="control-row">
          <Input type="number" id="postal-code" label="CAP" />
          <Input type="text" id="city" label="Città" />
        </div>

        {error && <Error title="Invio fallito." message={error} />}

        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
