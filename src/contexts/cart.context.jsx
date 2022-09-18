import {
  createContext,
  useEffect,
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
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload
      }
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartProvider = ({ children }) => {
  const [{
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal
  }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: !isCartOpen });
  }

  const setCartCount = (cartCount) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: cartCount });
  }

  const setCartTotal = (cartTotal) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: cartTotal});
  }

  const setCartItems = (cartItems) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems});
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (subTotal, cartItem) => subTotal + cartItem.quantity, 0
    );
    setCartCount(newCartCount);

  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (subtotal, cartItem) => subtotal + cartItem.quantity * cartItem.price, 0
    );
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (cartItemToAdd) => {
    setCartItems(addCartItem(cartItems, cartItemToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove))
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
