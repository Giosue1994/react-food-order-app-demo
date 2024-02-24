import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    // verifico se è presente uno stesso elemento nell'array
    // findIndex ritorna -1 se non sono presenti elementi nell'array
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.item.id
    );

    // verifico se ci sono elementi nell'array
    if (existingCartItemIndex > -1) {
      const existingCartItem = updatedItems[existingCartItemIndex];

      // aggiorno l'elemento con una nuova voce
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };

      // sovrascivo l'elemento con l'aggiunta di quantity
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // se non ci sono ancora elementi pusho nell'array il vecchio oggetto + quantity
      updatedItems.push({ ...action.payload.item, quantity: 1 });
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        item: item,
      },
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddToCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
