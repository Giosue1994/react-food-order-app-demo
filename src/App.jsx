import AvailableMeals from "./components/AvailableMeals";
import Cart from "./components/Cart";
import Header from "./components/Header";
import CartContextProvider from "./store/cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <AvailableMeals />
      </main>
    </CartContextProvider>
  );
}

export default App;
