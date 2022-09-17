import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, BagIcon, ItemCount } from './cart-icon.styles.jsx';
import './cart-icon.styles.jsx';


const CartIcon = () => {
  const {
    cartCount,
    isCartOpen,
    setIsCartOpen,
  } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen( !isCartOpen );

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <BagIcon className='shopping-icon'/>
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
