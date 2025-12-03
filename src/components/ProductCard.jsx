import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  removeProduct,
  updateProduct,
} from "../features/products/productsSlice";
import "./ProductCard.css";

export default function ProductCard({ product, user }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  if (!product) return null;

  const handleDelete = () => {
    if (window.confirm(`Видалити "${product.title}"?`)) {
      dispatch(removeProduct(product._id)); // 👈 Mongo _id
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(editedProduct)); // 👈 відправляємо весь продукт
    setIsEditing(false);
  };

  return (
    <div className="product-card">

      {/* Видалення – тільки admin */}
      {user?.role === "admin" && (
        <button className="delete-button" onClick={handleDelete}>
          &times;
        </button>
      )}

      {/* Редагування – тільки admin */}
      {user?.role === "admin" && (
        <button className="edit-icon" onClick={() => setIsEditing(true)}>
          ✎
        </button>
      )}

      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>

        <button onClick={() => dispatch(addToCart(product))}>
          Додати в кошик
        </button>
      </div>

      {/* Модалка редагування */}
      {isEditing && user?.role === "admin" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Редагувати товар</h2>
            <form onSubmit={handleEditSubmit} className="edit-form">
              
              <label>
                Назва:
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, title: e.target.value })
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
                      price: Number(e.target.value),
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
                <button className="save-btn" type="submit">Зберегти</button>
                <button className="cancel-btn" type="button" onClick={() => setIsEditing(false)}>
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