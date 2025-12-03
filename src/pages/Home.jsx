import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from '../features/products/productsSlice'; 
import ProductCard from '../components/ProductCard';

export default function Home({ user }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // додавання товару в базу
  const handleAddProduct = () => {
    const newProduct = {
      title: "Новий товар",
      price: 99,
      image: "https://placehold.co/150x150"
    };

    dispatch(addProduct(newProduct));
  };

  if (status === 'loading') return <p>Загрузка товарів...</p>;
  if (status === 'failed') return <p>Помилка загрузки!</p>;

  return (
    <>
      {/* Кнопка тільки для адміна */}
      {user?.role === "admin" && (
        <div className="home-controls">
          <button onClick={handleAddProduct} className="add-product-btn">
            Додати новий товар
          </button>
        </div>
      )}

      <div className="product-list">
        {items.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
            user={user}
          />
        ))}

        {status === 'succeeded' && items.length === 0 && (
          <p>Товарів немає</p>
        )}
      </div>
    </>
  );
}