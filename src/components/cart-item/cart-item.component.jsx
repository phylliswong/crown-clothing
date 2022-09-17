import {
  CartItemContainer,
  CartImage,
  CartItemDetails,
  CartItemName,
  CartItemPrice,
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartImage src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>{`${quantity} x $${quantity * price}`}</CartItemPrice>
      </CartItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;
