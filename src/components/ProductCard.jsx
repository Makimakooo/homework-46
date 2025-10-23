import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { removeProduct } from '../features/products/productsSlice'; 

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  
  if (!product) return null; 

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить товар "${product.title}"?`)) {
      dispatch(removeProduct(product.id));
    }
  };

  return (
    <div className="product-card">
      
      {}
      <button 
        onClick={handleDelete}
        className="delete-button" 
        title={`Удалить ${product.title}`}
      >
        &times; {}
      </button>

      <img src={product.image} alt={product.title} className="product-image" />
      
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <button 
          onClick={() => dispatch(addToCart(product))}
        >
          Додати в кошик
        </button>
      </div>
    </div>
  );
}