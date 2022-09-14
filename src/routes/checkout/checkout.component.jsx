import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
  const {
    addItemToCart,
    cartItems,
    removeItemFromCart,
    removeAllItemsOfProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <h1>I am the checkout page</h1>
      <div>
        {
          cartItems.map((cartItem) => {
            const { id, name, quantity } = cartItem;
            return (
              <div key={id}>
                <h2>{name}</h2>
                <span onClick={() => removeItemFromCart(cartItem)}>decrement -</span>
                <span> {quantity} </span>
                <span onClick={() => addItemToCart(cartItem)}>increment +</span>
                <span onClick={() => removeAllItemsOfProductFromCart(cartItem)}>REMOVE</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Checkout;
