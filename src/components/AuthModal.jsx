import React, { useState } from "react";
import "./AuthModal.css";

const AuthModal = ({ type = "login", onClose, setUser }) => {
  const isLogin = type === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginName, setLoginName] = useState(""); // тільки для реєстрації
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const body = {
      email,
      password,
    };

    // Якщо це реєстрація — додаємо роль user
    if (!isLogin) {
      body.role = "user";
    }

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // 💡 Красиво мапимо помилки з бекенда
        if (data.error === "User not found") {
          setError("Користувача з таким email не знайдено. Зареєструйтесь.");
        } else if (data.error === "Wrong password") {
          setError("Невірний пароль. Спробуйте ще раз.");
        } else {
          setError(data.error || "Помилка авторизації");
        }
        return;
      }

      // Якщо це реєстрація — просто показуємо повідомлення і закриваємо модалку
      if (!isLogin) {
        alert("Реєстрація успішна! Тепер увійдіть.");
        onClose();
        return;
      }

      // Якщо логін — витягуємо token + role
      const { token, role } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setUser({ token, role });

      onClose();
    } catch (err) {
      setError("Помилка зʼєднання з сервером. Перевірте, чи запущений backend.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <input
              type="text"
              placeholder="Логін"
              required
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          )}

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="submit-btn">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;