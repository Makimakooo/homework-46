import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice'; 

export default function Cart() {
  const dispatch = useDispatch();
  
  // Получаем товары и общую сумму
  const { items, totalPrice } = useSelector(state => state.cart); 

  // Если корзина пуста
  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Ваш кошик</h1>
        <p>Ваш кошик порожній. Додайте щось!</p>
      </div>
    );
  }

  return (
    // 💡 Главный контейнер
    <div className="cart-container">
      <h1>Ваш Кошик</h1>
      
      {items.map(item => (
        // 💡 Контейнер для одной позиции
        <div key={item.id} className="cart-item">
          
          {/* 💡 Блок с информацией: изображение и текст */}
          <div className="cart-item-info">
            {/* Предполагая, что у вас есть item.image */}
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>Ціна за шт.: ${item.price.toFixed(2)}</p>
            </div>
          </div>
          
          {}
          <div className="item-controls">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button> 
          </div>
          
          {}
          <div className="item-subtotal">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          
        </div>
      ))}

      {/* 💡 Итоговая сумма */}
      <div className="cart-total">
        Загальна сума: <strong>${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
}