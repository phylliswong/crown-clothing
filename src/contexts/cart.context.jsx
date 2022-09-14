import {
  createContext,
  useEffect,
  useState,
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
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) =>
    cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    )
}

const removeProductFromCart = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) =>
    cartItem.id === productToRemove.id
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeCartItem: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (subTotal, cartItem) => subTotal + cartItem.quantity, 0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (cartItemToAdd) => {
    setCartItems(addCartItem(cartItems, cartItemToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const removeAllItemsOfProductFromCart = (productToRemove) => {
    setCartItems(removeProductFromCart(cartItems, productToRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    removeAllItemsOfProductFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
