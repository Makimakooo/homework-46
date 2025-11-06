import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  removeProduct,
  updateProduct,
} from "../features/products/productsSlice";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  if (!product) return null;

  const handleDelete = () => {
    if (window.confirm(`Ви впевнені, що хочете видалити "${product.title}"?`)) {
      dispatch(removeProduct(product.id));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(editedProduct));
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {/* кнопка удаления */}
      <button
        onClick={handleDelete}
        className="delete-button"
        title={`Видалити ${product.title}`}
      >
        &times;
      </button>

      {/* кнопка редактирования */}
      <button
        onClick={() => setIsEditing(true)}
        className="edit-icon"
        title={`Редагувати ${product.title}`}
      >
        ✎
      </button>

      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <button onClick={() => dispatch(addToCart(product))}>
          Додати в кошик
        </button>
      </div>

      {/* модалка редактирования */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Редагування товару</h2>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <label>
                Назва:
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Ціна:
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                Фото (URL):
                <input
                  type="text"
                  value={editedProduct.image}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </label>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Зберегти
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
