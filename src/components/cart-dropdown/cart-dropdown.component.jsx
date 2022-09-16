import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  Dropdown,
  CartItems,
  EmptyMessage
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const gotToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <Dropdown>
      <CartItems>
        { cartItems.length > 0
          ? cartItems.map(item => (
              <CartItem cartItem={item} key={item.id} />
            ))
          : <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      </CartItems>
      <Button onClick={gotToCheckoutHandler}>
        go to checkout
      </Button>
    </Dropdown>
  );
}

export default CartDropdown;
