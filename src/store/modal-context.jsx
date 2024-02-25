import { createContext, useState } from "react";

export const ModalContext = createContext({
  modalType: "",
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export default function ModalContextProvider({ children }) {
  const [modal, setModal] = useState("");

  function openCart() {
    setModal("cart");
  }
  function closeCart() {
    setModal("");
  }
  function openCheckout() {
    setModal("checkout");
  }
  function closeCheckout() {
    setModal("");
  }

  const ctxModal = {
    modalType: modal,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
  };

  return (
    <ModalContext.Provider value={ctxModal}>{children}</ModalContext.Provider>
  );
}
