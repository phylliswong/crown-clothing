import { useContext } from 'react';
import CategoryItem from '../../components/category-item/category-item.component';
import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);

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
                <span>{quantity}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Checkout;
