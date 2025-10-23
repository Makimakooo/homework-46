import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, addToCart } from '../features/cart/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  
  return (
    <div className="cart-item">
      <p>{item.title}</p>
      <p>${item.price}</p>
      <div>
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
        {item.quantity}
        <button onClick={() => dispatch(addToCart(item))}>+</button>
      </div>
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
}