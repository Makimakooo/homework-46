import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

export default function Header({ user, setUser }) {
  const [modalType, setModalType] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // если где-то ещё сохраняешь user в localStorage – тоже чистим:
    // localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="header">
      {/* ЛОГО */}
      <Link to="/" className="logo">
        РеактМагаз
      </Link>

      {/* АВТОРИЗАЦИЯ */}
      <div className="auth-links">
        {!user ? (
          <>
            <Link to="#" onClick={() => setModalType("login")}>
              Вхід
            </Link>
            <span>|</span>
            <Link to="#" onClick={() => setModalType("register")}>
              Реєстрація
            </Link>
          </>
        ) : (
          <>
            <span>
              Ви увійшли як: <strong>{user.role}</strong>
            </span>
            <span>|</span>
            <Link to="#" onClick={handleLogout} className="logout-link">
              Вийти
            </Link>
          </>
        )}
      </div>

      {/* КОРЗИНА */}
      <Link to="/cart" className="cart-link">
        Кошик ({totalQuantity})
      </Link>

      {/* МОДАЛКА ЛОГИН/РЕГИСТР */}
      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
          setUser={setUser}
        />
      )}
    </header>
  );
}