import React from "react";

const RegisterModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Вхід</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button>Увійти</button>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default LoginModal;