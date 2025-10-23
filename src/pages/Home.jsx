import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from '../features/products/productsSlice'; 
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  
  const handleAddProduct = () => {
    dispatch(addProduct());
  };

  if (status === 'loading') return <p>Загрузка товаров...</p>;
  if (status === 'failed') return <p>Ошибка загрузки товаров!</p>;
  
  const productItems = Array.isArray(items) ? items : []; 

  return (
    <> {}
      
      {}
      <div className="home-controls"> 
        <button onClick={handleAddProduct} className="add-product-btn">
          Додати новий товар
        </button>
      </div>
      
      <div className="product-list">
        {productItems.map(product => (
          
          <ProductCard key={product.id} product={product} /> 
        ))}

        {(status === 'succeeded' && productItems.length === 0) && (
            <p>Товаров не найдено. Нажмите "Добавить Новый Товар", чтобы создать тестовый товар.</p>
        )}
      </div>
    </>
  );
}