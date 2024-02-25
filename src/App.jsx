import AvailableMeals from "./components/AvailableMeals";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CartContextProvider from "./store/cart-context";
import ModalContextProvider from "./store/modal-context";

function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Cart />
        <Checkout />
        <AvailableMeals />
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
