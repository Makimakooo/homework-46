import React from "react";
import "./AuthModal.css";

const AuthModal = ({ type = "login", onClose }) => {
  const isLogin = type === "login";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>

        <form className="auth-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Пароль" required />

          {!isLogin && <input type="text" placeholder="Логін" required />}

          <button type="submit" className="submit-btn">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;