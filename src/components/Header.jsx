import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <Link to="/">РеактМагаз</Link>
      <Link to="/cart">Кошик ({totalQuantity})</Link>
    </header>
  );
}