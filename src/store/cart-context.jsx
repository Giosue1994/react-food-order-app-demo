import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    // verifico se è presente almeno un elemento nell'array
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
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.item.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    // per eliminare un elemento riduco la quantità finche non raggiunge 1
    // quindi verifico che se è ugale a 1 e lo rimuovo con splice

    if (existingCartItem.quantity === 1) {
      // splice(indice dell'elemento da eliminare, numero elemento)
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

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

  function handleRemoveItem(item) {
    cartDispatch({
      type: "REMOVE_ITEM",
      payload: {
        item: item,
      },
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItem: handleAddToCart,
    removeItem: handleRemoveItem,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
