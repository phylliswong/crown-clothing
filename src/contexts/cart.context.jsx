import {
  createContext,
  useReducer,
} from "react";


const addCartItem = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find((cartItem) =>
    cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === cartItemToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )
  };

  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) =>
    cartItem.id === cartItemToRemove.id 
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  };

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => 
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeCartItem: () => {},
});

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [{
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
  }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  }

  const updateCartItems = (newCartItems) => {
    const newCartCount = cartItems.reduce(
      (subTotal, cartItem) => subTotal + cartItem.quantity, 0
    );

    const newCartTotal = cartItems.reduce(
      (subtotal, cartItem) => subtotal + cartItem.quantity * cartItem.price, 0
    );

    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    })
  }


  const addItemToCart = (cartItemToAdd) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    updateCartItems(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItems(newCartItems);
  }

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItems(newCartItems);
  }

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
