import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

export default function Header() {
  const [modalType, setModalType] = useState(null); // "login" або "register"

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">
        РеактМагаз
      </Link>

      <div className="auth-links">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setModalType("login");
          }}
        >
          Вхід
        </Link>

        <span> | </span>

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setModalType("register");
          }}
        >
          Реєстрація
        </Link>
      </div>

      <Link to="/cart" className="cart-link">
        Кошик ({totalQuantity})
      </Link>

      {/* Модалка входу/реєстрації */}
      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </header>
  );
}