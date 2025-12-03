import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ ДОДАНО!

  const { items, totalPrice } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Ваш кошик</h1>
        <p>Ваш кошик порожній. Додайте щось!</p>

        <button onClick={() => navigate("/")} className="back-btn">
          &larr; Повернутись на головну
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Ваш Кошик</h1>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>Ціна за шт.: ${item.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="item-controls">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          </div>

          <div className="item-subtotal">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-button">
          <button onClick={() => navigate("/")} className="back-btn">
            &larr; Головна
          </button>

          <button onClick={() => navigate("/checkout")} className="pay-btn">
            &rarr; Сплатити
          </button>
        </div>

        <div className="cart-total">
          Загальна сума: <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}